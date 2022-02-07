import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import SelectedIngredients from "../Components/SelectedIngredients";
import Ingredient from "../Components/Ingredient";
import Nav from "../Components/Nav";
import { IngredientContext } from "../Providers/IngredientProvider";
import { ProductContext } from "../Providers/ProductsProvider";
import { postProduct } from "../Services/API";

export default function CustomProductPage() {
  const { ingredients } = useContext(IngredientContext)
  const [ productIngredient, setProductIngredient ] = useState([]);
  const { shoppingCart, setShoppingCart } = useContext(ProductContext)

  return (
    <div>
      <Nav></Nav>
      <div>
        <p>Custom product</p>
        {ingredients.map(ingredient => {
          return (
            <Ingredient key={ingredient.id} ingredient={ingredient} product={productIngredient} setProduct={setProductIngredient}></Ingredient>
          )
        })}
       </div>

     <SelectedIngredients productIngredient={productIngredient} setProductIngredient={setProductIngredient}/>

       <button onClick={async ()=> {
      
          const ingredients_ids = productIngredient.map(data => data.id)
          
          const totalPrice = productIngredient.reduce((acc, data) => {
            return acc + data.price
          }, 0)

          let product = await postProduct("custom", ingredients_ids, totalPrice)
          setShoppingCart([...shoppingCart, product.data])
       }}>Create Product</button>
    </div>
  )
}