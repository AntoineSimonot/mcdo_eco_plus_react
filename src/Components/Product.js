import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { ProductContext } from "../Providers/ProductsProvider";


function Product({ product }) {

    let navigate = useNavigate();
    const { shoppingCart, setShoppingCart } = useContext(ProductContext)

    return (
        <motion.div animate={{ x: 0 }} 
        key={product.id} id={product.id} onClick={() => {
          setShoppingCart([...shoppingCart, product])
        }}>
          <p>{product.name} - {product.price}</p>
        </motion.div>
    )

}

export default Product;
  