import { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import { IngredientContext } from "../Providers/IngredientProvider";
import '../Style/ProductInfoStyle.css';

function ProductInfo({showProductInfo, productInfo, setShowProductInfo}) {

    const [ product, setProduct ] = useState(productInfo)
    const [showProduct, setShowProduct] = useState(showProductInfo)
    const { excludedIngredients, setExcludedIngredients } = useContext(IngredientContext)
    
    useEffect(() => {
        setShowProduct(showProductInfo)
        setProduct(productInfo)
    }, [showProductInfo, productInfo])
    
    if (showProduct === true) {
        return (
            <div className="productInfoContainer" onClick={()=>{ setShowProductInfo(false) }}>
                <div className="productInfo" key={product.id}>
                    <div className="productInfoTitle">
                        <h1>{product.name}</h1>
                        <h2>{product.price}</h2>
                        {product.pti.map((data, index) => {
                            return (
                                <div className="ingredient" key={index}>
                                    <h3>{data.ingredient.name}</h3>
                                    <button onClick={()=>{
                                        setExcludedIngredients([...excludedIngredients, data.ingredient.id])}
                                    }>
                                        excludedIngredients
                                    </button>
                                </div>
                            )
                        })}
                       
                    </div>
                </div>
            </div>
        )
    }

    return (null)
   
}

export default ProductInfo;
  