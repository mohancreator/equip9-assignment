import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if there's no token
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return children;
};

export default ProtectedRoute;
