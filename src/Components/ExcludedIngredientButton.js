import { useContext, useEffect, useState } from "react";
import { IngredientContext } from "../Providers/IngredientProvider";

function ExcludedIngredientButton({ingredient, product}) {
    const { excludedIngredients, setExcludedIngredients } = useContext(IngredientContext)
    
    const [remove, setRemove] = useState("remove")
    const product_excluded_ingredient = excludedIngredients.filter(excludedIngredient => excludedIngredient.product_id === product.id)

    useEffect(() => {
        if (product_excluded_ingredient.some(data => data.ingredient_id === ingredient.id)) setRemove("add")
    }, [excludedIngredients, product])

    const excluded_ingredients_action = () => { 
        if (product_excluded_ingredient.some(data => data.ingredient_id === ingredient.id)) {
            setExcludedIngredients(excludedIngredients.filter(excludedIngredient => excludedIngredient.product_id !== product.id || excludedIngredient.ingredient_id !== ingredient.id))
        } else {
        setExcludedIngredients([...excludedIngredients, { "ingredient_id": ingredient.id, "product_id": product.id}]) 
        }
    }

    return(
        <button onClick={()=>{
            excluded_ingredients_action()
        }}>{remove}</button>
    )
}

export default ExcludedIngredientButton;
  