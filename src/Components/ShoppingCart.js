import Modal from "react-modal";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Providers/ProductsProvider";
import "../Style/ShoppingCartStyle.css";
import ShoppingIngredients from "./ShoppingIngredients";

Modal.setAppElement("body");

function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useContext(ProductContext);
  const [ProductsAlreadyInCart, setAlreadyInCart] = useState([]);

  useEffect(() => {
    let ephemeralCart = [];
    // pour chaques produits dans le panier
    shoppingCart.forEach((product) => {
      let isAlreadyDisplayed = 0;
      // on verifie si le produit est deja existant
      ephemeralCart.forEach((productAlreadyInCart) => {
        // si le produit est déjà existant
        if (
          JSON.stringify(product) ===
          JSON.stringify(productAlreadyInCart.product)
        ) {
          isAlreadyDisplayed++;
        }
      });
      // si isAlreadyDisplayed est true on le mets dans l'array ProductsAlreadyInCart qui sera affiché dans la vue
      if (isAlreadyDisplayed === 0) {
        ephemeralCart = [...ephemeralCart, { product: product, quantity: 1 }];
      } else {
        // find the product in the array and add one to quantity
        ephemeralCart.find((ephemeralCartProduct) => {
          if (
            JSON.stringify(product) ===
            JSON.stringify(ephemeralCartProduct.product)
          ) {
            ephemeralCartProduct.quantity++;
          }
     
        });

        
      }
    });

    setAlreadyInCart(ephemeralCart);
  }, [shoppingCart]);

  return (
    <div className="shoppingCart">
      {ProductsAlreadyInCart.map((product, index) => {
        return (
          <div className="productInfoContainer" key={index}>
            <p>
              {product.quantity} {product.product.data.name} -{" "}
              {product.product.data.price}€
            </p>

            <ShoppingIngredients
              product={product.product}
              pti={product.product.data.pti}
            ></ShoppingIngredients>

            <button
              onClick={() => {
                setShoppingCart([...shoppingCart, product.product]);
              }}
            >
              +
            </button>

            <button
              onClick={() => {
                if (product.quantity > 1) {
                  // remove one product from the shopping cart

                  setShoppingCart(
                    // shoppingcart filter with index
                    shoppingCart.filter((product, index2) => {
                      if (index !== index2) {
                        return product;
                      }
                    })
                  );
                } else {
                  setShoppingCart(
                    shoppingCart.filter(
                      (productCart) =>
                        productCart.data.id !== product.product.data.id
                    )
                  );
                }
              }}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ShoppingCart;
