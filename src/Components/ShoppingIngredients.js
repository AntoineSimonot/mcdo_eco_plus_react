import { useState } from "react";
import ShoppingIngredientButton from "./ShoppingIngredientButton";

function ShoppingIngredients({pti, product} ) {

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
                    <ShoppingIngredientButton key={index} product_data={product_data} product={product} shoppingIndex={index}/>
                  )}
                )}
            </div>
        }
    </div>
    )
}

export default ShoppingIngredients;