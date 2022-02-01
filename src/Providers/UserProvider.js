import React, { createContext, useEffect, useState } from 'react';
import { getToken, me } from '../Services/API';
export const UserContext = createContext()
export const UserProvider = (props) => {

    const [user, setUser] = useState([]);
    const [connected, setConnected] = useState(false);

    function setUserData() {
        me().then((user) => {
            setUser(user.data)
            localStorage.setItem("role", user.data.role)
            if (user.data.role !== "terminal") setConnected(true)
        })
    }

    useEffect(() => {     
        getToken() ? setUserData() : setUser({"role" : "guest"})
    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser, connected, setConnected}} >
            {props.children}
        </UserContext.Provider>
    )

}