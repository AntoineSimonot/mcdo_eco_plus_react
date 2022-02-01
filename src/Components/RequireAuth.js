import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../Providers/UserProvider";

function RequireAuth({ children }) {
    const { user } = useContext(UserContext)

    let navigate = useNavigate();

    
    useEffect (() => {

        switch (localStorage.getItem("role")) {
            case "terminal":
                return children;
            case "user":
                return children;
            case "guest":
                return children;
            case "kitchen":
                navigate("/kitchen");
                break;
            case "admin":
                navigate("/admin");
                break;
            default :
                navigate("/login_terminal");
        }
     
    }, [navigate, user])
    
    return children;

}

export default RequireAuth;
  