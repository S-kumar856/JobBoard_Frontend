import React, { useState } from "react";
import { registerService } from "../../services";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './register.css'

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    })

    // targetin the multiple input field using name
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    // controling the submit form and connecting the backend services
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const res = await registerService(formData)
        console.log(res.status)
        if (res.status === 200) {

            setFormData({
                name: "",
                email: "",
                password: "",
                mobile: "",
            })
            localStorage.setItem('name', formData.name)
            toast('registered successfully');
            navigate('/')
        }
        else {
            console.log(res)
            toast('error')
        }
    }

    const username = localStorage.getItem('name')
    console.log(username)
    return (
        <>
            <div className='register-container'>
                <div className="register-left">
                <div className="reg-left">

                    <h3 className='reg-h'>Create an account</h3>
                    <p className='reg-p' >Your personal job finder is here</p>

                    <form className='register-form' onSubmit={handleFormSubmit}>
                        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleFormData} className='register-input' required/>
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleFormData} className='register-input' required/>
                        <input type="tel" name="mobile" placeholder='Mobile' value={formData.mobile} onChange={handleFormData} className='register-input' required/>
                        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleFormData} className='register-input' required/>
                        <div className='check-box'>
                            <input type='checkbox' />
                            <p>By creating an account, I agree to our terms of use and privacy policy</p>
                        </div>
                        <button type="submit" className='reg-submit'>Create Account</button>
                    </form>
                    <p className='reg-p' >Already have an account? <a><b><Link to={'/login'}>Sign In</Link> </b></a></p>
                </div>
                </div>
                <div className="register-right">
                    <p style={{ color: "white", padding: "1rem", fontSize: "1.5rem", textAlign: "center" }}>Your Personal Job Finder</p>
                </div>
            </div>

        </>
    )
}

export default Register;