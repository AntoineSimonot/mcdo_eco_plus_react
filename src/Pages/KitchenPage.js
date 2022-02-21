import React, { useContext, useEffect } from "react";
import { OrderContext } from "../Providers/OrderProvider";
import { putOrderStatus } from "../Services/API";
import '../Style/ProductsPageStyle.css';
import { io } from "socket.io-client";
import Timer from "../Components/Timer";
import OrderDetails from "../Components/OrderDetails";



export default function Kitchen() {
  const { orders, setOrders } = useContext(OrderContext)
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
      
    useEffect(
      () => {
        const socket = io("http://127.0.0.1:3000");
        socket.connect();

        socket.on("order", (order) => {
          console.log(order)
          setOrders([...orders, order.order])
        })

        socket.on("change-order-status", (order) => {
          setOrders(orders.filter(o => o.orderId != order))
        })
        return () => {
          socket.disconnect();
        }
      },
      [orders]
    )
  

  if (orders.length === 0) {
    return <h1>No orders yet</h1>
  }
  else{
    return (
      <div className="kitchenPage">
      
      {orders.map((order) => {
        if (order.status === "kitchen") {
          return (
              <div className="order" key={order.orderId}>
                <OrderDetails order={order} key={order.orderId}/>

                <button onClick={() => {
                  putOrderStatus(order.orderId, "finished")
                } }>Finish</button> 
      
                <Timer expiryTimestamp={time} />
  
                <hr></hr>
              </div>
            )
          }
        }
      )}
        
      </div>
    )
  }
}