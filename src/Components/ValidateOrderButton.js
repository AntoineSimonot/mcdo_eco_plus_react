import { useContext } from "react/cjs/react.development";
import { changeIngredientQuantity, postOrder } from "../Services/API";
import { ProductContext } from "../Providers/ProductsProvider";
import { useNavigate } from "react-router-dom";
import { IngredientContext } from "../Providers/IngredientProvider";
import emailjs from "@emailjs/browser";

function ValidateOrderButton() {
  const { shoppingCart } = useContext(ProductContext);
  const { ingredients } = useContext(IngredientContext);

  let navigate = useNavigate();

  return (
    <button
      onClick={async () => {

        let shoppingCartIngredients = []
        let orderNotValid = false;
        
        function getIngredientsOfShoppingCart(shoppingCart) {
          shoppingCart.map(product => {
            product.data.pti.forEach(ingredient => {
              let excluded = false
              if (product.excludedIngredients.length === 0) {
                shoppingCartIngredients.push(ingredient.ingredient)
                excluded = true
              }
              product.excludedIngredients.forEach(excludedIngredient => {
                if (ingredient.ingredient.id === excludedIngredient.ingredient.id) {
                  excluded = true
                }
              })
              if (excluded === false) {
                shoppingCartIngredients.push(ingredient.ingredient)
              }
            });
          })
        }

        function checkQuantityOfIngredients(ingredients) {
          shoppingCartIngredients.forEach((ingredient) => {
            console.log(shoppingCartIngredients)
            ingredients.forEach((ingredient2) => {
              if (ingredient.id === ingredient2.id) {
                ingredient.quantity = ingredient2.quantity;
              }
            });
          });
        }

        if (shoppingCart.length === 0) {
          alert("Please add products to your cart!");
          orderNotValid = true;
        }

        getIngredientsOfShoppingCart(shoppingCart)
        checkQuantityOfIngredients(shoppingCartIngredients)

        let ingredientsQuantity = ingredients.map((ingredient) => {
          return { id: ingredient.id, quantity: ingredient.quantity };
        });

        shoppingCart.forEach((product) => {
          product.data.pti.forEach((pti) => {
            ingredientsQuantity.map((ingredient) => {
              if (ingredient.id === pti.ingredient.id) {
                return ingredient.quantity--;
              }
            });
          });
        });

        ingredientsQuantity.forEach((ingredient) => {
          if (ingredient.quantity < 0) {
            orderNotValid = true;
            alert("Not enough ingredients in stock!");
          }
          else if (ingredient.quantity === 0) {
          //   emailjs.send('gmail', process.env.REACT_APP_TEMPLATE, {
          //     "from_name": "Mcdo Eco Plus",
          //     "ingredient_name": ingredient.name,
          //   }, process.env.REACT_APP_USER_ID)
          //     .then((result) => {
          //         console.log(result.text);
          //     }, (error) => {
          //         console.log(error.text);
          //   });
          }
        });

        if (orderNotValid === false) {
          let products = shoppingCart.map((product) => ({
            id: product.data.id,
            excluded_ingredients: product.excludedIngredients.map(
              (excludedIngredient) => excludedIngredient.ingredient.id
            ),
          }));

          shoppingCartIngredients.forEach((ingredient) => {
            ingredient.quantity--;
            shoppingCartIngredients.forEach((ingredient2) => {
              if (ingredient.id === ingredient2.id) {
                ingredient2.quantity = ingredient.quantity;
              }
            })
            changeIngredientQuantity(parseInt(ingredient.quantity), ingredient.id);
          });

          let order = await postOrder(
            products,
            shoppingCart.reduce((acc, curr) => acc + curr.data.price, 0)
          );
          navigate("/order", { state: { order: order.data } });
        }
      }}
    >
      Order
    </button>
  );
}

export default ValidateOrderButton;
