import '../Style/ProductInfoStyle.css';

function ProductInfo({product, excludedIngredients, setExcludedIngredients}) {

    const button_action_txt = (ingredient) => {
        if (product_excluded_ingredient.some(data => data.ingredient.id === ingredient.id)) return "add"
        return "remove"
    }
    
    const product_excluded_ingredient = excludedIngredients.filter(excludedIngredient => excludedIngredient.product_id === product.id)
    
    const exclude_ingredients_action = (ingredient) => { 
        if (product_excluded_ingredient.some(data => data.ingredient.id === ingredient.id)) {
            setExcludedIngredients(excludedIngredients.filter(excludedIngredient => excludedIngredient.product_id !== product.id || excludedIngredient.ingredient.id !== ingredient.id))
        } else {
            setExcludedIngredients([...excludedIngredients, { "ingredient": ingredient, "product_id": product.id}]) 
        }
    }
    return (
        <div className="productInfoModal">
            <div className="productInfo" key={product.id}>

                <div className="productInfoTitle">
                    <h1>{product.name}</h1>
                    <h2>{product.price}</h2>
                    
                    {product.pti.map((product_data, index) => {
                        return (
                            <div className="ingredient" key={index}>
                                
                                <img src={product_data.ingredient.file.location} alt={product_data.name}></img>   
                                <h3>{product_data.ingredient.name}</h3>

                                <button onClick={()=>{ exclude_ingredients_action(product_data.ingredient) }}>
                                    { button_action_txt(product_data.ingredient)}
                                </button>
                            </div>
                        )
                    })}                  
                </div>
            </div>
        </div>
    )

}

export default ProductInfo;
  