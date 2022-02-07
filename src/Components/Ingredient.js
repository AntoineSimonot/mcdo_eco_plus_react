export default function Ingredient({ingredient, product, setProduct}) {

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