import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../Providers/UserProvider";

function RequireAuth({ children }) {
    const { user } = useContext(UserContext);
    const { role } = useContext(UserContext)

    let navigate = useNavigate();

    useEffect (() => {

        console.log(user)
        if (role === "guest") {
            console.log("user", user)
            navigate("/main");
        }

        if (role === "user") {
            console.log("user", user)
            navigate("/main");
        }

        if (role === "terminal") {
            console.log("user", user)
            navigate("/main");
        }

        // if user is empty array 
        if (user.length === 0) {
            navigate("/login_terminal");
        }
     
        
    }, [navigate])

    return children;

}

export default RequireAuth;
  