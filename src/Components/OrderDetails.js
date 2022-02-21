export default function OrderDetails({order}) {

  return (
    <div className="orderDetails" key={order.orderId}>
      <h1>Order #{order.orderId}</h1>
      <div className="products">
      <h2>Products</h2>

      {order.otp.map((opt) => {
        return (
          <div className="product" key={opt.orderToProductId}>
            <h3>{opt.product.name}</h3>
            
            <h4>Ingredients</h4> 
             {opt.product.pti.map((ingredient) => {
              return (
                <div className="ingredient" key={ingredient.ingredient.id}>
                  <h5>{ingredient.ingredient.name}</h5>
                </div>
              );
            })} 
          </div>
        )
      }
      )}
    </div>
  </div>
  )

}
