import React, { useContext, useEffect } from "react";
import OrderDetails from "../../Components/OrderDetails";
import { onSocketSetOrder } from "../../Services/OrderHelper";
import { OrderContext } from "../../Providers/OrderProvider";
import AdminNavigation from "../../Components/AdminNavigation";
import '../../Style/Admin/AdminOrdersStyle.css';
import { IngredientContext } from '../../Providers/IngredientProvider';

const AdminOrders = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const { ingredients, setIngredients } = useContext(IngredientContext);

  useEffect(() => {
    onSocketSetOrder(setOrders, orders, setIngredients)
  }, [orders]);

  return (
    <div className="AdminPage">
      <AdminNavigation></AdminNavigation>
      
      <div className="orders">
        {orders.map((order) => {
          return <OrderDetails key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
};

export default AdminOrders;
