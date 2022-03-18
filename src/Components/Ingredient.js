import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { deleteIngredient, getIngredient } from "../Services/API";
import { IngredientContext } from "../Providers/IngredientProvider";
import { getProducts } from "../Services/API";
import { ProductContext } from "../Providers/ProductsProvider";
import { UserContext } from "../Providers/UserProvider";
import { OrderContext } from "../Providers/OrderProvider";
import Modal from "react-modal";
import IngredientForm from "./Forms/IngredientFormJs";
import PutIngredientForm from "./Forms/PutIngredientForm";

Modal.setAppElement("body");

export default function Ingredient({
  ingredient,
  setProductIngredient,
  productIngredient,
}) {
  const [outOfStock, setOutOfStock] = useState(false);
  const { setIngredients, ingredients } = useContext(IngredientContext);
  const { setProducts, products } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false);

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
      otp.ingredients.forEach((ingredient2) => {
        ingredient2.product.pti.map((pti) => {
          if (pti.ingredient.id === ingredient.id) {
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
                  if (pti3.ingredient.id === pti.ingredient.id) {
                    pti3.ingredient.quantity = pti.ingredient.quantity;
                  }
                });
                return product2;
              })
            );
          }
        });
      });
    });

    if (ingredient.quantity <= 0) {
      setOutOfStock(true);
    }
  }, [ingredients]);

  return (
    <div
      key={ingredient.id}
      className={
        outOfStock === true ? "out productContainer" : "stock productContainer"
      }
    >
      <div
        className="product"
        onClick={() => {
          setProductIngredient([...productIngredient, ingredient]);
        }}
      >
        <div className="product-image">
          <img src={ingredient.file.location} alt="ingredient"></img>
        </div>

        <div className="product-info">
          <p>{ingredient.name}</p>
          <p>{ingredient.price}€</p>
        </div>

        {user.role === "admin" ? (
          <div className="ingredient-quantity">
            <h3>{ingredient.quantity}</h3>
            <button
              onClick={() => {
                deleteIngredient(ingredient.id).then(() => {
                  setIngredients(
                    ingredients.filter(
                      (ingredientToDelete) =>
                        ingredientToDelete.id !== ingredient.id
                    )
                  );
                });
              }}
            >
              Supprimer
            </button>
            <button
              onClick={() => {
                openModal();
              }}
            >
              Modifier
            </button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
              <button
                onClick={() => {
                  closeModal();
                }}
              >
                X
              </button>
              <h1>Put</h1>
              <PutIngredientForm ingredient={ingredient}></PutIngredientForm>
            </Modal>
          </div>
        ) : null}
      </div>
    </div>
  );
}
