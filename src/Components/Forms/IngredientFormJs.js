import { useForm } from "react-hook-form";
import { postImage, postIngredient, putIngredient } from "../../Services/API";

export default function IngredientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (form) => {
        let image = await postImage(form.image[0]);
        let ingredient = await postIngredient(form);
        let ingredientWithImage = await putIngredient(
            ingredient.data.id,
            {
                name: ingredient.data.name,
                quantity: ingredient.data.quantity,
                price: ingredient.data.price,
                image: image.data.id,
            }
        )
        console.log(ingredientWithImage)
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
        {...register("price", {
          required: true,
        })}
      />
      {errors.price && <span>This field is required</span>} <br />
        <label htmlFor="price">Price</label>
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

      <input type="submit" /> <br />
    </form>
  );
}
