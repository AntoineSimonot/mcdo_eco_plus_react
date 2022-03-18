import React, { useContext, useEffect, useState } from 'react';
import { onSocketSetOrder } from '../../Services/OrderHelper';
import { OrderContext } from "../../Providers/OrderProvider";
import AdminNavigation from '../../Components/AdminNavigation';
import '../../Style/Admin/AdminStatsStyle.css';
import { IngredientContext } from '../../Providers/IngredientProvider';

const AdminStats = () => {
    const { orders, setOrders } = useContext(OrderContext);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    const { ingredients, setIngredients } = useContext(IngredientContext);

    useEffect(() => {
      
      onSocketSetOrder(setOrders, orders, setIngredients)
        
        let productsArr = [];
    
        if (orders.length > 0) {
          // get all products of orders
          orders.forEach((order) => {
            order.otp.forEach((otp) => {
              productsArr.push(otp.product);
            });
          });
        }
    
        let productsCount = [];
        productsArr.forEach((product) => {
          if (!productsCount.some((p) => p.product.id === product.id)) {
            productsCount.push({
              product: product,
              count: 1,
              price: product.price,
            });
          } else {
            productsCount.forEach((p) => {
              if (p.product.id === product.id) {
                p.count++;
                p.price += product.price;
              }
            });
          }
        });
    
        setBestSellingProducts(productsCount);
    }, [orders]);


    return (
        <div className="AdminPage">
          <AdminNavigation></AdminNavigation>
          <div className="Stats">
          {bestSellingProducts.map((product) => {
            return (
              <div key={product.product.id}>
                <h3>Name : {product.product.name}</h3>
                <p>Buyed : {product.count} times</p>
                <p>Total : {product.price} €</p>
              </div>
            );
          })}
          </div>
         
        </div>
      );
};

export default AdminStats;