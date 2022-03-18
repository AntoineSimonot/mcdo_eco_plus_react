import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../Services/API";
export const ProductContext = createContext();
export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartTotal, setShoppingCartTotal] = useState([]);
  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products.data);
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getProducts,
        shoppingCart,
        setShoppingCart,
        shoppingCartTotal,
        setShoppingCartTotal,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
