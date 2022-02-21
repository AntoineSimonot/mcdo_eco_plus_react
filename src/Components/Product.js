import { useContext } from "react/cjs/react.development";
import { ProductContext } from "../Providers/ProductsProvider";
import { IngredientContext } from "../Providers/IngredientProvider";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";
import { io } from "socket.io-client";
import { getIngredients } from "../Services/API";
import { getProducts } from "../Services/API";

Modal.setAppElement('body');

function Product({ product }) {
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const { setIngredients, ingredients } = useContext(IngredientContext)
  const { setProducts, products } = useContext(ProductContext)

  const { shoppingCart, setShoppingCart } = useContext(ProductContext)
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [outOfStock, setOutOfStock] = useState(false);
  function openModal() { setIsOpen(true) }
  function closeModal() { setIsOpen(false) }

  useEffect(() => {
    const socket = io("http://127.0.0.1:3000");

    socket.connect();

    socket.on("ingredients", (otp) => {
      otp.ingredients.forEach(ingredient => {
        ingredient.product.pti.map(pti => {
          product.pti.map(pti2 => {
            if (pti2.ingredient.id === pti.ingredient.id) {
              if (pti.ingredient.quantity <= 0) {
                setOutOfStock(true);
                getIngredients().then((ingredients) => {
                  setIngredients(ingredients.data)
                })

                getProducts().then((products) => {
                  setProducts(products.data)
              })
              }
            }
          })
        })
      })
    })

    if (product.pti.some(data => data.ingredient.quantity <= 0)) {
      setOutOfStock(true);
    }
  }, [ingredients, products])

  return (
    <div className={ outOfStock === true ? "out productContainer" : "stock productContainer" }>
      <div className="product"
        onClick={() => {
        if(!outOfStock) openModal();
      }}>
        <div className="product-image">
          <img src={product.file.location} alt="product"></img>
        </div>
        <div className="product-info">
          <h2>{product.name} - <small>{product.price}€</small></h2>
          
          <p>Nam ligula dui, varius at lectus ut, luctus dictum Curabitur finibus fringilla ultrices. Nulla et egestas nunc, luctus tincidunt arc</p>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button onClick={() => {
          setExcludedIngredients([])
          closeModal()
        }
          }>X</button>
        <ProductInfo product={product} excludedIngredients={excludedIngredients} setExcludedIngredients={setExcludedIngredients}></ProductInfo>
        <button onClick={() => {
          closeModal()

          setShoppingCart([...shoppingCart, {
            data: product,
            excludedIngredients: excludedIngredients,
          }])

          setExcludedIngredients([])
         
          
        }}>Valider</button>
      </Modal>

    </div>
  );
  
}

export default Product;
  