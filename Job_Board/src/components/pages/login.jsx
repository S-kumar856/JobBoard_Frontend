import React, { useEffect, useState } from "react";
import { loginService } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })

    

    const handleLogin = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const res = await loginService(loginFormData);
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            setLoginFormData({
                email: "",
                password: ""
            })
            localStorage.setItem('token', data.token)
            toast.success("Login successfull")
            navigate("/home");
        }
        else {
            toast.error("Invalid credentials")
        }
    }

    // if user already logged in, then automatically it open the home page
    useEffect(() => {
        const token = localStorage.getItem('token')
            if(token){
                navigate('/home');
            }
        
    },[])

    return (
        <>
            <form onSubmit={handleLoginSubmit}>
                <input type="email" value={loginFormData.email} onChange={handleLogin} name="email" id="email" placeholder="Enter your email" />
                <input type="password" value={loginFormData.password} onChange={handleLogin} name="password" id="password" placeholder="Enter your password" />
                <button type="submit">Login</button>
            </form>

        </>
    )
}

export default Login;