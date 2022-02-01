import React, { createContext, useState } from 'react';
export const IngredientContext = createContext()
export const IngredientProvider = (props) => {

    const [excludedIngredients, setExcludedIngredients] = useState([]);

    return (
        <IngredientContext.Provider value={{excludedIngredients, setExcludedIngredients}} >
            {props.children}
        </IngredientContext.Provider>
    )

}