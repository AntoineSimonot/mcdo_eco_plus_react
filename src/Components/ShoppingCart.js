import { useContext } from "react";
import { ProductContext } from "../Providers/ProductsProvider";
import '../Style/ShoppingCartStyle.css';

function ShoppingCart({ product }) {

    const { shoppingCart, setShoppingCart } = useContext(ProductContext)

    return (
        <div key={product.id} id={"shop-"+product.id} className="shoppingItem">
            <p>{product.name} - {product.price}</p>
            <button onClick={()=>{
            setShoppingCart(shoppingCart.filter(p => p.id !== product.id))
            }}> Remove </button>
        </div>

    )

}

export default ShoppingCart;
  