import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Providers/ProductsProvider";
import ShoppingIngredientButton from "./ShoppingIngredientButton";

function ShoppingIngredients({pti, product} ) {
  const { shoppingCart, setShoppingCart  } = useContext(ProductContext)

  const [showIngredient, setShowIngredient] = useState(false);

  
 
    return (
      <div>
        <button onClick={()=>{ setShowIngredient(!showIngredient)}}>
            show
        </button>

         { showIngredient === true && 
            <div>
                {pti.map((product_data, index) => {
                  return(
                    <ShoppingIngredientButton key={index} product_data={product_data} product={product} />
                  )}
                )}
            </div>
        }
    </div>
    )
}

export default ShoppingIngredients;