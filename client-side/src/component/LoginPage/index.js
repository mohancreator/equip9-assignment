import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function LoginPage() {
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://equip9-server.vercel.app/login', formData);
            setSuccessMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('firstName', response.data.user.firstName);
            localStorage.setItem('lastName', response.data.user.lastName);
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(
                error.response?.data?.message || 'Login failed. Please try again.'
            );
        }
    };

    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" replace />;
    }

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
                <Link to="/register">
                    <p>I don't have an account</p>
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;
