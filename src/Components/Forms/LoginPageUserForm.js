import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from "../../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { loginUser, me } from "../../Services/API";

export default function LoginPageUserForm() {
   

    const { user, setUser } = useContext(UserContext)
    const { setConnected } = useContext(UserContext)
    const { setRole } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(async (form) => {
                
            let response = await loginUser(form)

            if (response.status === 200) {
                localStorage.setItem('token', response.data)
                let userData = await me()
                setConnected(true)
                setUser(userData.data)

                if (user.role === "user") {
                    setRole("user")
                    navigate("/main")
                }
                if (user.role === "kitchen") {
                    setRole("kitchen")
                    setRole("/kitchen")
                }
                if (user.role === "admin") {
                    setRole("admin")
                    setRole("/admin")
                }
            }
            else{
                alert("Wrong email or password")
            }

        })}>

            <input 
                type="email" 
                defaultValue="simonotantoine1@gmail.com" 
                {...register("email", { 
                    required: true,  
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })} 

            /> <br />
            {errors.email && <span>This field is required</span>} <br />

            <input type="password" {...register("password", { required: true })} /> <br />
            {errors.password && <span>This field is required</span>} <br />

            <input type="submit" /> <br />

        </form>
    )
}