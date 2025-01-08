import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('token');

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return 'Good Morning';
        } else if (hour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    const getUserDetails = () => {
        if (userToken) {
            // You would decode the token and extract user details here (e.g., using jwt-decode)
            const firstName = localStorage.getItem('firstName');
            const lastName = localStorage.getItem('lastName'); // Example: Get user from localStorage
            return `${firstName} ${lastName}`;
        }
        return '';
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="landing-container">
            <h2>{`${getGreeting()}, ${getUserDetails()}`}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default LandingPage;
