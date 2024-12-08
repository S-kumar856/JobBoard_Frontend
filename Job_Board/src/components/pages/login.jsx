import React, { useState } from "react";
import { loginService } from "../../services";
import { Navigate, useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e) =>{
        const {name, value} = e.target;
        setLoginFormData({...loginFormData, [name]:value})
    }

    const handleLoginSubmit = async(e) =>{
        e.preventDefault();
        const res = await loginService(loginFormData);
        if (res.status === 200){
            alert("Login successfull")
            navigate("/home");
        }
        else{
            alert("Invalid credentials")
        }
        setLoginFormData("");   
      
    }


    return(
        <>
            <form onSubmit={handleLoginSubmit}>
                <input type="email" value={loginFormData.email} onChange={handleLogin} name="email" id="email" placeholder="Enter your email" />
                <input type="password" value={loginFormData.password}  onChange={handleLogin} name="password" id="password" placeholder="Enter your password" />
                <button type="submit">Login</button>
            </form>

        </>
    )
}

export default Login;