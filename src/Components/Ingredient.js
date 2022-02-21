import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getIngredient } from "../Services/API";
import { IngredientContext } from "../Providers/IngredientProvider";
import { getProducts } from "../Services/API";
import { ProductContext } from "../Providers/ProductsProvider";

export default function Ingredient({ingredient, product, setProduct}) {

    const [outOfStock, setOutOfStock] = useState(false);
    const { setIngredients, ingredients } = useContext(IngredientContext)
    const { setProducts, products } = useContext(ProductContext)

    useEffect   (() => {
        const socket = io("http://127.0.0.1:3000");
    
        socket.connect();
    
        socket.on("ingredients", (otp) => {
            console.log(otp)
          otp.ingredients.forEach(ingredient2 => {
            ingredient2.product.pti.map(pti => {
                if (pti.ingredient.id === ingredient.id) {
                  if (pti.ingredient.quantity <= 0) {
                    setOutOfStock(true);
                    getIngredient().then((ingredients) => {
                      setIngredients(ingredients.data)
                    })
                    getProducts().then((products) => {
                      setProducts(products.data)
                  })

                  }
                }
            })
          })
        })
    
      
    if (ingredient.quantity <= 0) {
        setOutOfStock(true);
      }
    }, [ingredients, products])

    if(outOfStock) {
        return (null)
        }
    else{
        return (
            <div key={ingredient.id}>
                <div onClick={()=>{
                    setProduct([...product, ingredient])
                }}>
                    <img src={ingredient.file.location} alt="ingredient"></img>
                    <h1>{ingredient.name}</h1>
                    <h2>{ingredient.price}</h2> 
                </div>
            </div>
        )
    }
}