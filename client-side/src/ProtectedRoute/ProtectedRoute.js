import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Redirect to login if no token is found
    if (!token) {
        navigate('/login');
        return null; // Prevent rendering of protected content
    }

    return element; // Render the protected component
};

export default ProtectedRoute;
