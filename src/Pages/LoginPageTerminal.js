import { useForm } from "react-hook-form";
import { loginTerminal, me } from '../Services/API'
import { useContext } from 'react';
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPageTerminal() {
    let navigate = useNavigate();

    const { setUser } = useContext(UserContext)
    const { setConnected } = useContext(UserContext)

    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <form onSubmit={handleSubmit(async (form) => {
            
            let response = await loginTerminal(form)

            if (response.status === 200) {
                localStorage.setItem('token', response.data)
                let userData = await me()
             
                setConnected(true)
                setUser(userData.data)
                
                navigate("/login_user")
            }
            else{
                alert("Wrong serial")
            }

        })}>

            <input type="serial" {...register("serial", { required: true })} /> <br />
            {errors.serial && <span>This field is required</span>} <br />

            <input type="submit" /> <br />

        </form>
    )

}