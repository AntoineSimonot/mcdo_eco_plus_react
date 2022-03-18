import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IngredientContext } from "../../Providers/IngredientProvider";
import { postImage, postIngredient, putIngredient } from "../../Services/API";

export default function PutIngredientForm(ingredientToChange) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { ingredients,setIngredients } = useContext(IngredientContext);

  return (
    <form
      onSubmit={handleSubmit(async (form) => {
        let jsonIngredient = {};

        if (form.name !== "") jsonIngredient.name = form.name;

        if (form.quantity !== "") jsonIngredient.quantity = form.quantity;

        if (form.price !== "") jsonIngredient.price = form.price;

        if (form.image.length > 0) {
          let image = await postImage(form.image[0]);
          jsonIngredient.image = image;
        }

        let putIngredientResponse = await putIngredient(ingredientToChange.ingredient.id, {
          ...jsonIngredient,
        });

        console.log(putIngredientResponse)

        setIngredients(
            ingredients.map((ingredient) => {
                if (putIngredientResponse.data.id === ingredient.id) {
                    return {
                        ...putIngredientResponse.data,
                    };
                }
                return ingredient;
            })
        );
      })}
    >
      <label htmlFor="name">Name</label>
      <input type="text" {...register("name", {})} />
      <label htmlFor="quantity">Quantity</label>
      <input type="number" {...register("price", {})} />
      <label htmlFor="price">Price</label>
      <input type="number" {...register("quantity", {})} />
      <input type="file" {...register("image", {})} />
      <input type="submit" /> <br />
    </form>
  );
}
