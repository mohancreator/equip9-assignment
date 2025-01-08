import React, { useState } from 'react';
import './index.css'
function RegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="registration-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            <div className="social-login">
                <button>Login with Google</button>
                <button>Login with Facebook</button>
                <button>Login with Apple ID</button>
            </div>
        </div>
    );
}

export default RegistrationPage;
