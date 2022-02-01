import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

function Nav() {

    const { setUser, connected, setConnected} = useContext(UserContext)

    return (
        <nav>
            <NavLink to={ "/products"}>Products</NavLink>
            <NavLink to={ "/custom-product"}>Custom Product</NavLink>
            { connected === false && <NavLink to={ "/login_user"} >login</NavLink>}
            { connected === true && <NavLink to={ "#"} onClick={ ()=> {
                localStorage.setItem('role', "guest")
                localStorage.removeItem('token')
                setUser({
                    "role" : "guest"
                })                
                setConnected(false)
            }}>logout</NavLink>}
                
        </nav>
    )

}

export default Nav;
  