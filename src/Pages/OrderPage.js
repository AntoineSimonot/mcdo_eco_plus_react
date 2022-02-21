import React from "react";
import { useLocation } from "react-router-dom";
import OrderDetails from "../Components/OrderDetails";

export default function OrderPage() {
  const {state} = useLocation();
  const { order } = state;

  return (
    <div className="order" key={order.orderId}>
      <OrderDetails order={order} />
    </div>
  )
}
