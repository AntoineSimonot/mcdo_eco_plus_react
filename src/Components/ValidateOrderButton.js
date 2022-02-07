import { useContext } from "react/cjs/react.development";
import { IngredientContext } from "../Providers/IngredientProvider";
import { postOrder, putIngredient } from "../Services/API";

function ValidateOrderButton({ shoppingCart }) {

  const { excludedIngredients } = useContext(IngredientContext)

    return (
        <button onClick={() => {
            let products = shoppingCart.map(product => ({
              id: product.id,
              excluded_ingredients : excludedIngredients.filter(excludedIngredient => excludedIngredient.product_id === product.id).map(excludedIngredient => excludedIngredient.ingredient_id)
            }))
            
           // get ingredients
            let ingredients = shoppingCart.reduce((acc, data) => {
              return acc.concat(data.pti.map(data => data.ingredient))
            }, [])
            
            ingredients.forEach(ingredient => {
              putIngredient(ingredient.quantity - 1, ingredient.id)
            });

            postOrder(products, shoppingCart.reduce((acc, curr) => acc + curr.price, 0))
          }}>Send</button>
    )

}

export default ValidateOrderButton;
  