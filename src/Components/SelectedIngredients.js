function SelectedIngredients({ productIngredient, setProductIngredient }) {
  return (
    <div className="selectedIngredients">
      {productIngredient.map((data, index) => {
        return (
          <div className="ingredient" key={index}>
            <button
              onClick={() => {
                setProductIngredient(
                  productIngredient.filter((ingredient, i) => i !== index)
                );
              }}
            >
              X
            </button>
            <h3>{data.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default SelectedIngredients;
