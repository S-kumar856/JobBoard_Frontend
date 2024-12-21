import React, { useEffect, useState } from "react";
import { loginService } from "../../services";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './login.css'

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
        if (token) {
            navigate('/home');
        }

    }, [])

    return (
        <>
            <div className='login-container'>
                <div className="login-left">
                    <div className="left">
                        <h3 className='reg-h'>Already have an account?</h3>
                        <p className='reg-p' >Your personal job finder is here</p>
                        <form className='login-form' onSubmit={handleLoginSubmit}>
                            <input type="email" name="email" placeholder='Email' value={loginFormData.email} onChange={handleLogin} className='login-input' required />
                            <input type="password" name="password" placeholder='Password' value={loginFormData.password} onChange={handleLogin} className='login-input' required />
                            <button type="submit" className='reg-submit'>Sign in</button>
                        </form>
                        <p className='reg-p' >Don’t have an account? <a><b><Link to={'/register'}>Sign Up</Link></b></a></p>
                    </div>
                </div>
                <div className="login-right">
                    <p>Your Personal Job Finder</p>
                </div>
            </div>
        </>
    )
}

export default Login;