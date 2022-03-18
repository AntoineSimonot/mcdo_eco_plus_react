import { io } from "socket.io-client";
import { getIngredients } from "./API";

const socket = io("http://127.0.0.1:3000");

socket.connect();

export const onSocketSetOrder = (setOrders, orders, setIngredients) => {

    console.log("onSocketSetOrder");
    socket.on("order", (order) => {
        setOrders([...orders, order.order]);   
        getIngredients().then((res) => {
            setIngredients(res.data);
        })
    });
  
    socket.on("change-order-status", (order) => {
        (orders.filter((o) => o.orderId !== order));
    });
}