import React, { useContext, useState } from "react";
import Nav from "../Components/Nav";
import { ProductContext } from "../Providers/ProductsProvider";
import Product from "../Components/Product";
import ShoppingCart from "../Components/ShoppingCart";
import ProductInfo from "../Components/ProductInfo";
import ValidateOrderButton from "../Components/ValidateOrderButton";

export default function Products() {
  const { products, shoppingCart } = useContext(ProductContext)
  const [ showProductInfo, setShowProductInfo ] = useState(false)
  const [ productInfo, setProductInfo ] = useState([])

  return (
    <div>
      <Nav></Nav>

      <div className="productList">
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>

      <div className="shoppingCart">
          {shoppingCart.map((product) => (
            <div className="shoppingCartContainer" onClick={()=>{
              setShowProductInfo(true)
              setProductInfo(product)
              }}>
              <ShoppingCart key={product.id} product={product}></ShoppingCart>
            </div>
          ))}
      </div>

      <ValidateOrderButton shoppingCart={shoppingCart}></ValidateOrderButton>

     <ProductInfo showProductInfo={showProductInfo} productInfo={productInfo} setShowProductInfo={setShowProductInfo}></ProductInfo>
      
    </div>
  )
}