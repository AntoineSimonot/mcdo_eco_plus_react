import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IngredientContext } from "../../Providers/IngredientProvider";
import { ProductContext } from "../../Providers/ProductsProvider";

import { postImage, postIngredient, postProduct, putIngredient, putProduct } from "../../Services/API";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { ingredients } = useContext(IngredientContext)
  const { products, setProducts } = useContext(ProductContext)
  const [productIngredient, setProductIngredient] = useState([]);
  return (
    <form
      onSubmit={handleSubmit(async (form) => {
        let image = await postImage(form.image[0]);

        let product = {
            name: form.name,
            price: productIngredient.reduce((acc, curr) => acc + curr.price, 0),
            pti: productIngredient.map(data => data.id),
            custom:0
          };

        let created_product = await postProduct(product);
      
        let productWithImage = await putProduct(
            created_product.data.id,
            {
                image: image.data.id,
            }
        )
        console.log(productWithImage)
        setProducts([...products, productWithImage.data])
      })}
    >
        <label htmlFor="name">Name</label>
      <input
        type="text"
        {...register("name", {
          required: true,
        })}
      />
        {errors.name && <span>This field is required</span>} <br />
        <label htmlFor="quantity">Quantity</label>
        
        <input
        type="number"
        {...register("quantity", {
            required: true,
        })}
        />

        {errors.quantity && <span>This field is required</span>} <br />
        <input 
        type="file"  
        {...register("image" ,{
            required: true,
        })} />
        {errors.image && <span>This field is required</span>} <br />

        <label htmlFor="ingredients">Ingredients</label>
        {ingredients.map(ingredient => (
            <div key={ingredient.id}>
                <input
                    type="checkbox"        
                    onChange={() => {
                        if (productIngredient.find(data => data.id === ingredient.id)) {} else {
                            setProductIngredient([...productIngredient, ingredient])
                        }
                    }}
                />
                <label htmlFor={ingredient.id}>{ingredient.name}</label>
            </div>
        ))}
        
      <input type="submit" /> <br />
    </form>
  );
}
