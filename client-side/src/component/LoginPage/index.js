import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function LoginPage() {
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3008/login', formData);
            setSuccessMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            console.log(response)
            localStorage.setItem('firstName', response.data.user.firstName);
            localStorage.setItem('lastName', response.data.user.lastName)
            console.log(response.data.user.firstName)
            setErrorMessage('');
            navigate('/'); // Redirect to landing page
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response ? error.response.data : 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
