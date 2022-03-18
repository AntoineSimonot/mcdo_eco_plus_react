import { useEffect } from "react";

export default function OrderDetailsIngredients({ingredient, product}) {
    function isExcluded(ingredientID) {
        let bool = false;

        product.excluded_ingredients.forEach(ingredient => {
            if (ingredient.id=== ingredientID) {
                bool = true;
            }
        })
      
        return bool
    }

    if (isExcluded(ingredient.ingredient.id)) {
        return (
            null
        )
    }
    else{
        return (
            <div className="ingredient" key={ingredient.ingredient.id}>
                <h5>{ingredient.ingredient.name}</h5>
            </div>
        )
    }
   
  
  }
  