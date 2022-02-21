import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginPageUserForm from "../Components/Forms/LoginPageUserForm";
import { UserContext } from "../Providers/UserProvider";


export default function LoginPageUser() {
    const { setUser } = useContext(UserContext)
    let navigate = useNavigate();

    return (
        <div>
            <h1>LoginPageUser</h1>
            <LoginPageUserForm/>
            <button onClick={
                () => {
                    localStorage.setItem('role', "guest")
                    setUser({
                        "role" : "guest"
                    })
                    navigate("/products");
                }
            }>Continuer sans s'identifier</button>
        </div>
    )

}