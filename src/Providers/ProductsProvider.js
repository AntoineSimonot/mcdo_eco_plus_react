import React, { createContext, useEffect, useState } from 'react';
import { getProducts } from '../Services/API';
export const ProductContext = createContext()
export const ProductsProvider = (props) => {

    const [products, setProducts] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    useEffect(() => {     
        
        getProducts().then((products) => {
            setProducts(products.data)
        })

    }, [])
    
    return (
        <ProductContext.Provider value={{products, getProducts, shoppingCart, setShoppingCart}} >
            {props.children}
        </ProductContext.Provider>
    )

}