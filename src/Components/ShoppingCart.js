import Modal from 'react-modal';
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Providers/ProductsProvider";
import '../Style/ShoppingCartStyle.css';
import ShoppingIngredients from './ShoppingIngredients';

Modal.setAppElement('body');


function ShoppingCart() {
    const { shoppingCart, setShoppingCart  } = useContext(ProductContext)
    const [ ProductsAlreadyInCart, setAlreadyInCart ] = useState([]);
    
    useEffect (() => {
                // pour chaques produits dans le panier 
            shoppingCart.forEach(product => {
                let isAlreadyDisplayed = false;
                // on verifie si le produit est deja existant
                ProductsAlreadyInCart.forEach(productAlreadyInCart => { 
                    // si le produit est déjà existant
                    if (JSON.stringify(product) === JSON.stringify(productAlreadyInCart)) {
                        // isAlreadyDisplayed est true
                        isAlreadyDisplayed = true;
                    }
                })  
                // si isAlreadyDisplayed est true on le mets dans l'array ProductsAlreadyInCart qui sera affiché dans la vue
                if (isAlreadyDisplayed === false) {
                    setAlreadyInCart([...ProductsAlreadyInCart, product])
                }
                
            })      

    }, [shoppingCart, ProductsAlreadyInCart])
    

    return (
        <div className="shoppingCart">
            {
                ProductsAlreadyInCart.map((product, index)=> {
                return (
                    <div className="productInfoContainer" key={index}>
                        <p>{product.data.name}</p>
                        <p>{product.data.price}</p>
                        
                        <ShoppingIngredients product={product} pti={product.data.pti}></ShoppingIngredients>

                        <button onClick={()=>{

                            let newShoppingCart = []

                            shoppingCart.map(data => {
                                if (JSON.stringify(data) != JSON.stringify(product)) {
                                    return newShoppingCart = [...newShoppingCart, data]
                                }
                            })
                            
                            setShoppingCart(newShoppingCart)
                            setAlreadyInCart(ProductsAlreadyInCart.filter(data => JSON.stringify(data) != JSON.stringify(product)))
                        }}>delete</button>
                    </div>
                    )
                })
            }
        </div>
    )

}

export default ShoppingCart;
  