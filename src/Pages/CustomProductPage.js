import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import SelectedIngredients from "../Components/SelectedIngredients";
import Ingredient from "../Components/Ingredient";
import Nav from "../Components/Nav";
import { IngredientContext } from "../Providers/IngredientProvider";
import { ProductContext } from "../Providers/ProductsProvider";
import { postProduct } from "../Services/API";
import '../Style/CustomProductPage.css';
import ShoppingCart from "../Components/ShoppingCart";
import ValidateOrderButton from "../Components/ValidateOrderButton";

export default function CustomProductPage() {
  const { ingredients } = useContext(IngredientContext)
  const [ productIngredient, setProductIngredient ] = useState([]);
  const { shoppingCart, setShoppingCart } = useContext(ProductContext)

  return (
    <div className="customProductPage">
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
          if (productIngredient.length > 0) {
            let product = {
              name: "Custom product",
              price: productIngredient.reduce((acc, curr) => acc + curr.price, 0),
              file: {
                location: require("../Img/Burger.png")
              },
              pti: productIngredient.map(data => data.id)
            }
            
            let created_product = await postProduct(product)
            
            setShoppingCart([...shoppingCart, {
              data: created_product.data,
              excludedIngredients: [],
            }])
          }     
       }}>Create Product</button>

      <div className="shoppingCart">
            <ShoppingCart></ShoppingCart>
          
            <ValidateOrderButton shoppingCart={shoppingCart}></ValidateOrderButton>
      </div>
    </div>
  )
}