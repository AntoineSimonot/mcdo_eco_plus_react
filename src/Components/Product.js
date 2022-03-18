import { useContext } from "react/cjs/react.development";
import { ProductContext } from "../Providers/ProductsProvider";
import { IngredientContext } from "../Providers/IngredientProvider";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";
import { io } from "socket.io-client";

Modal.setAppElement("body");

function Product({ product }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setIngredients, ingredients } = useContext(IngredientContext);
  const { setProducts, products } = useContext(ProductContext);
  const { shoppingCart, setShoppingCart } = useContext(ProductContext);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [outOfStock, setOutOfStock] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const socket = io("http://127.0.0.1:3000");
    socket.connect();

    socket.on("ingredients", (otp) => {
      otp.ingredients.forEach((ingredient) => {
        ingredient.product.pti.map((pti) => {
          product.pti.map((pti2) => {
            if (pti2.ingredient.id === pti.ingredient.id) {
              if (pti.ingredient.quantity <= 0) {
                setOutOfStock(true);
              }

              setIngredients(
                ingredients.map((ingredient) => {
                  if (ingredient.id === pti.ingredient.id) {
                    ingredient.quantity = pti.ingredient.quantity;
                  }

                  return ingredient;
                })
              );

              setProducts(
                products.map((product2) => {
                  product2.pti.map((pti3) => {
                    if (pti3.ingredient.id === pti2.ingredient.id) {
                      pti3.ingredient.quantity = pti2.ingredient.quantity;
                    }
                  });
                  return product2;
                })
              );
            }
          });
        });
      });
    });

    if (product.pti.some((data) => data.ingredient.quantity <= 0)) {
      setOutOfStock(true);
    }
  }, []);

  return (
    <div
      className={
        outOfStock === true ? "out productContainer" : "stock productContainer"
      }
    >
      <div
        className="product"
        onClick={() => {
          if (!outOfStock) openModal();
        }}
      >
        <div className="product-image">
          <img src={product.file.location} alt="product"></img>
        </div>
        
        <div className="product-info">
          <p>{product.name}</p>
          <p>{product.price}€</p>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button
          onClick={() => {
            setExcludedIngredients([]);
            closeModal();
          }}
        >
          X
        </button>
        <ProductInfo
          product={product}
          excludedIngredients={excludedIngredients}
          setExcludedIngredients={setExcludedIngredients}
        ></ProductInfo>
        <button
          onClick={() => {
            closeModal();

            setShoppingCart([
              ...shoppingCart,
              {
                data: product,
                excludedIngredients: excludedIngredients,
              },
            ]);

            setExcludedIngredients([]);
          }}
        >
          Valider
        </button>
      </Modal>
    </div>
  );
}

export default Product;
