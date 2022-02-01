import { useContext } from "react/cjs/react.development";
import { IngredientContext } from "../Providers/IngredientProvider";
import { postOrder } from "../Services/API";

function ValidateOrderButton({ shoppingCart }) {

  const { excludedIngredients } = useContext(IngredientContext)

  console.log(excludedIngredients)
    return (
        <button onClick={() => {
              
            let products = shoppingCart.map(product => ({
              id: product.id,
              excluded_ingredients : excludedIngredients
            }))
            postOrder(products, shoppingCart.reduce((acc, curr) => acc + curr.price, 0))
          }}>Send</button>

    )

}

export default ValidateOrderButton;
  