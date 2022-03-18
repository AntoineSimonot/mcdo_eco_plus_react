import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import SelectedIngredients from "../../Components/SelectedIngredients";
import Ingredient from "../../Components/Ingredient";
import Nav from "../../Components/Nav";
import { IngredientContext } from "../../Providers/IngredientProvider";
import { ProductContext } from "../../Providers/ProductsProvider";
import { getProduct, getProducts, postProduct } from "../../Services/API";
import "../../Style/CustomProductPage.css";
import ShoppingCart from "../../Components/ShoppingCart";
import ValidateOrderButton from "../../Components/ValidateOrderButton";

export default function CustomProductPage() {
  const { ingredients } = useContext(IngredientContext);
  const [productIngredient, setProductIngredient] = useState([]);
  const { shoppingCart, setShoppingCart } = useContext(ProductContext);

  return (
    <div className="customProductPage">
      <Nav></Nav>
      <div className="container">
        <div className="topPart">
          <h1>Custom Product</h1>
        </div>
        <div className="bottomPart">
          <div className="productList">
            {ingredients.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.id}
                  ingredient={ingredient}
                  productIngredient={productIngredient}
                  setProductIngredient={setProductIngredient}
                ></Ingredient>
              );
            })}
          </div>
        </div>

        <SelectedIngredients
          productIngredient={productIngredient}
          setProductIngredient={setProductIngredient}
        />

        <button
        className="createProductButton"
          onClick={async () => {
            console.log(productIngredient);
            if (productIngredient.length > 0) {
              let product = {
                name: "Custom product",
                price: productIngredient.reduce(
                  (acc, curr) => acc + curr.price,
                  0
                ),
                pti: productIngredient.map((data) => data.id),
                custom: true,
              };

              let created_product = await postProduct(product);
              let test = await getProduct(created_product.data.id);
              console.log(test);  

              setShoppingCart([
                ...shoppingCart,
                {
                  data: test.data,
                  excludedIngredients: [],
                },
              ]);
            }
          }}
        >
          Create Product
        </button>
      </div>

      <div className="shoppingCartContainer">
        <ShoppingCart></ShoppingCart>

        <ValidateOrderButton shoppingCart={shoppingCart}></ValidateOrderButton>
      </div>
    </div>
  );
}
