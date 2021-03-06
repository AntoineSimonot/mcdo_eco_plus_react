import React, { createContext, useEffect, useState } from 'react';
import { getIngredients } from '../Services/API';
export const IngredientContext = createContext()
export const IngredientProvider = (props) => {

    const [excludedIngredients, setExcludedIngredients] = useState([]);
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        getIngredients().then((ingredients) => {
            setIngredients(ingredients.data)
        })
    }, [])

    return (
        <IngredientContext.Provider value={{setIngredients, excludedIngredients, setExcludedIngredients, ingredients}} >
            {props.children}
        </IngredientContext.Provider>
    )

}