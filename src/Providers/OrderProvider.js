import React, { createContext, useEffect, useState } from 'react';
import { getOrders } from '../Services/API';

export const OrderContext = createContext()
export const OrderProvider = (props) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => { 
        getOrders().then((orders) => {
            setOrders(orders.data)
        })
    }, [] )

    return (
        <OrderContext.Provider value={{orders, setOrders}} >
            {props.children}
        </OrderContext.Provider>
    )

}