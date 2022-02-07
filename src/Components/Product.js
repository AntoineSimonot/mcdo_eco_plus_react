import { motion } from "framer-motion";
import { useState } from "react";
import ProductInfo from "./ProductInfo";


function Product({ product }) {

  const [ showProductInfo, setShowProductInfo ] = useState(false)
  const [ productInfo, setProductInfo ] = useState([])

  //if one ingredient is 0 then the product is not available
  if (product.pti.some(data => data.ingredient.quantity <= 0)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='product'
      >
        <div className="product">
          <div className="product-image">
            <img src={product.file.location} alt="product"></img>
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <h2>{product.price}</h2>
          </div>
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='productContainer'
        onClick={() => {
          setShowProductInfo(true)
          setProductInfo(product)
        }}
      >
        <div className="product">
          <div className="product-image">
            <img src={product.file.location} alt="product"></img>
          </div>
          <div className="product-info">
            <h2>{product.name} - <small>{product.price}€</small></h2>
           
            <p>Nam ligula dui, varius at lectus ut, luctus dictum Curabitur finibus fringilla ultrices. Nulla et egestas nunc, luctus tincidunt arc</p>
          </div>
        </div>

        <ProductInfo showProductInfo={showProductInfo} productInfo={productInfo} setShowProductInfo={setShowProductInfo}></ProductInfo>

      </motion.div>
    );
  }

}

export default Product;
  