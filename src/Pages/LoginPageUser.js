import { useNavigate } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import LoginPageUserForm from "../Components/Forms/LoginPageUserForm";
import { UserContext } from "../Providers/UserProvider";


export default function LoginPageUser() {
    let navigate = useNavigate();
    const { setRole } = useContext(UserContext)

    return (
        <div>
            <h1>LoginPageUser</h1>
            <LoginPageUserForm/>
            <button onClick={
                () => {
                   
                    setRole("guest")
                    navigate("/main");
                 
                }
            }>Continuer sans s'identifier</button>
        </div>
    )

}