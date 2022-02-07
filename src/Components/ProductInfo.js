import { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import { ProductContext } from "../Providers/ProductsProvider";
import '../Style/ProductInfoStyle.css';
import ExcludedIngredientButton from "./ExcludedIngredientButton";

function ProductInfo({showProductInfo, productInfo, setShowProductInfo}) {

    const [ product, setProduct ] = useState(productInfo)
    const [showProduct, setShowProduct] = useState(showProductInfo)
    const { shoppingCart, setShoppingCart } = useContext(ProductContext)

    useEffect(() => {
        setShowProduct(showProductInfo)
        setProduct(productInfo)
    }, [showProductInfo, productInfo])
    
    if (showProduct === true) {
        return (
            <div className="productInfoContainer" onClick={()=>{  }}>
                <div className="productInfo" key={product.id}>
                    <div className="productInfoTitle">
                        <button className="productInfoCloseButton" onClick={()=>{
                            setShowProduct(false)
                            setShowProductInfo(false)
                        }}>
                        X
                        </button>
                        <h1>{product.name}</h1>
                        <h2>{product.price}</h2>
                        {product.pti.map((product_data, index) => {
                            return (
                                <div className="ingredient" key={index}>
                                    <img src={product_data.ingredient.file.location} alt="img"/>

                                    <h3>{product_data.ingredient.name}</h3>

                                  {<ExcludedIngredientButton key={product_data.ingredient.id} product={product} ingredient={product_data.ingredient} />}
                                </div>
                            )
                        })}
                       
                    </div>
                </div>

                <button onClick={()=>{
                    console.log("terst")
                    setShowProduct(false)
                    setShowProductInfo(false)
                    setShoppingCart([...shoppingCart, product])
                }}>Valider</button>
            </div>
        )

    
    }

    return (null)
   
}

export default ProductInfo;
  