import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../Providers/UserProvider";

function RequireAuth({ children }) {
    const { user } = useContext(UserContext)

    let navigate = useNavigate();

    
    useEffect (() => {
        switch (localStorage.getItem("role") || user.role) {
            case "terminal":
                return navigate("/login_user");
            case "user":
                if (window.location.pathname.match(/admin/g) === null && window.location.pathname.match(/kitchen/g) === null) {
                    return children;

                }
                return navigate("/login_user");
            case "guest":
                if (window.location.pathname.match(/admin/g) === null && window.location.pathname.match(/kitchen/g) === null) {
                    return children;
                }
                return navigate("/login_user");
            case "kitchen":
                if (window.location.pathname === "/kitchen") {
                    return children;
                }
                console.log("oui")
                return navigate("/login_user");
            case "admin":
                return children;
            default :
                navigate("/login_terminal");
        }
     
    }, [navigate, user])
    
    return children;

}

export default RequireAuth;
  