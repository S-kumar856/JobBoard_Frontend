import React, { useState } from "react";
import { registerService } from "../../services";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    })

    const handleFormData = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const res = await registerService(formData)
        if (res.status === 200) {
            alert('registered successfully')
        }
        else {
            console.log(res)
            alert('error')
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleFormData} />
                <input type="text" name="mobile" placeholder="Enter your phone number" value={formData.mobile} onChange={handleFormData} />
                <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleFormData} />
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleFormData} />
                <button type="submit" >Submit</button>
            </form>

        </>
    )
}

export default Register;