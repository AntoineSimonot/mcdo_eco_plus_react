import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import '../Style/NavStyle.css';
import '../Img/McdoLogo.png';
function Nav() {

    const { setUser, connected, setConnected} = useContext(UserContext)
   
    return (

        <nav>
            <div className="logo">
                <img src={require('../Img/McdoLogo.png')} alt="img"></img>
            </div>
            <ul>
                <h1>Navigation</h1>
                <li>
                    <NavLink to={ "/products"}>Products</NavLink>
                </li>
                <li>
                    <NavLink to={ "/custom-product"}>Custom Product</NavLink>
                </li>
                
                { connected === false && <li> <NavLink to={ "/login_user"} >Login</NavLink></li>}
                
               
                { connected === true &&  <li> <NavLink to={ "/logout_user"} onClick={ ()=> {
                    localStorage.setItem('role', "guest")
                    localStorage.removeItem('token')
                    setUser({
                        "role" : "guest"
                    })                
                    setConnected(false)
                }}>Logout</NavLink> </li>}
                
            </ul>
     
            <div className="socials">
                <a href="https://www.facebook.com/Mcdo-102058479909878/" target={"_blank"} rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                <a href="https://www.instagram.com/mcdo.fr/" target={"_blank"} rel="noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://twitter.com/Mcdo_fr" target={"_blank"} rel="noreferrer"><i className="fab fa-twitter-square"></i></a>
            </div>
        </nav>
    )

}

export default Nav;
  