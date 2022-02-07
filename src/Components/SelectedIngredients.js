function SelectedIngredients({productIngredient, setProductIngredient}) {

    return (
      <div>
        {productIngredient.map((data, index) => {
                return (
                    <div className="ingredient" key={index}>
                        <img src={data.file.location} alt="ingredient"></img>

                        <h3>{data.name}</h3>

                        <button onClick={() => {
                            setProductIngredient(productIngredient.filter((ingredient, i) => i !== index))
                        }}>X</button>
                    </div>
                )
            })}
      </div>
      
    )
}

export default SelectedIngredients;
  