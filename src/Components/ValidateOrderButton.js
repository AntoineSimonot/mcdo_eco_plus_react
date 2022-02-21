import { useContext } from "react/cjs/react.development";
import { postOrder, putIngredient } from "../Services/API";
import { ProductContext } from "../Providers/ProductsProvider";
import { useNavigate } from "react-router-dom";

function ValidateOrderButton( ) {
  const { shoppingCart } = useContext(ProductContext)
  let navigate = useNavigate();

    return (
        <button onClick={async () => {
            let products = shoppingCart.map(product => ({
              id: product.data.id,
              excluded_ingredients : product.excludedIngredients.map(excludedIngredient => excludedIngredient.ingredient.id)
            }))
            
            let ingredients = shoppingCart.reduce((acc, product) => {
              return acc.concat(product.data.pti.map(data => data.ingredient))
            }, [])
            
            
            ingredients.forEach(ingredient => {
              putIngredient(parseInt(ingredient.quantity) -1, ingredient.id)
            });

            let order = await postOrder(products, shoppingCart.reduce((acc, curr) => acc + curr.data.price, 0))
            navigate("/order", { state: { order: order.data} })
          }}>Send</button>
    )

}

export default ValidateOrderButton;