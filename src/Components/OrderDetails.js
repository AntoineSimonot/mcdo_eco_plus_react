import { useContext, useEffect } from "react";
import { onSocketSetOrder } from "../Services/OrderHelper";
import OrderDetailsIngredients from "./OrderDetailsIngredients"
import { OrderContext } from "../Providers/OrderProvider";

export default function OrderDetails({order}) {
  const { orders, setOrders } = useContext(OrderContext);

  useEffect(() => {
    console.log("test")
    if (window.location.pathname === "/kitchen") {
      onSocketSetOrder(orders, setOrders);
    }
  }, [orders]);

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
                <OrderDetailsIngredients product={opt} ingredient={ingredient}></OrderDetailsIngredients>
              )
            })}
          </div>
        )
      }
      )}
    </div>
  </div>
  )

}
