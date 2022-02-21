import React, { useContext } from "react";
import Nav from "../Components/Nav";
import { ProductContext } from "../Providers/ProductsProvider";
import Product from "../Components/Product";
import ShoppingCart from "../Components/ShoppingCart";
import ValidateOrderButton from "../Components/ValidateOrderButton";
import '../Style/ProductsPageStyle.css';

export default function Products() {
  
  const { products ,shoppingCart } = useContext(ProductContext)

  return (
    <div className="productsPage">
      <Nav></Nav>

      <div className="container">
        <div className="topPart">
          <h1>Hello</h1>
        </div>
        <div className="bottomPart">
          <div className="productList">
            {products.map((product) => (
              <Product key={product.id} product={product} ></Product>
            ))}
          </div>
        </div>
      </div>
      

  <div className="shoppingCart">
      <ShoppingCart></ShoppingCart>
     
      <ValidateOrderButton shoppingCart={shoppingCart}></ValidateOrderButton>
  </div>
      
    </div>
  )
}