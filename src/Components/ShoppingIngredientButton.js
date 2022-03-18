import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Providers/ProductsProvider";

function ShoppingIngredientButton({ product_data, product }) {
  const { shoppingCart, setShoppingCart } = useContext(ProductContext);
  const [btnText, setBtnText] = useState("");

  useEffect(() => {
    console.log(shoppingCart)
    setBtnText(
      product.excludedIngredients.some(
        (data) => data.ingredient.id === product_data.ingredient.id
      )
        ? "Add"
        : "Remove"
    );
  }, [shoppingCart]);

  const shoppingCartUpdated = (newExcludedIngredients) => {
    const shoppingCartUpdated = shoppingCart.map((data) => {
      if (data.data.id === product.data.id) {
        data.excludedIngredients = newExcludedIngredients;
      }
      return data;
    });

    setShoppingCart(shoppingCartUpdated);
  };

  const newExcludedIngredients = (newExcludedIngredients) => {
    shoppingCartUpdated(newExcludedIngredients);
  };

  const updateExcludedIngredient = (product_data) => {
    if (
      product.excludedIngredients.some(
        (data) => data.ingredient.id === product_data.ingredient.id
      )
    ) {
      newExcludedIngredients(
        product.excludedIngredients.filter(
          (data) => data.ingredient.id !== product_data.ingredient.id
        )
      );
    } else {
      newExcludedIngredients([...product.excludedIngredients, product_data]);
    }
  };

  return (
    <div>
      <p>{product_data.ingredient.name}</p> 
      <button onClick={() => updateExcludedIngredient(product_data)}>
        {btnText}
      </button>
    </div>
  );
}

export default ShoppingIngredientButton;
