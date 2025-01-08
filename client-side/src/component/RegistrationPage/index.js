import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
    });

    const [statusMessage, setStatusMessage] = useState(''); // To show success or error messages
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to the homepage if the user is already logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = 'http://localhost:3008/register';

        try {
            const response = await axios.post(api, formData); // Send form data to backend
            setStatusMessage('Registration successful!');
            console.log(response.data);
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Navigate after showing success message
        } catch (error) {
            console.error('Error registering user:', error);
            const errorMessage =
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : 'Failed to register. Please try again.';
            setStatusMessage(errorMessage);
        }
    };


    return (
        <div className="App">
            <div className="registration-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
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
                    <button type="submit">Register</button>
                </form>

                {statusMessage && <p className="status-message">{statusMessage}</p>} {/* Show status messages */}
                <Link to='/login'><p className='status-message'>I have account</p></Link>
                <div className="social-login">
                    <p>Or sign up with</p>
                    <button className="google-btn">Login with Google</button>
                    <button className="facebook-btn">Login with Facebook</button>
                    <button className="apple-btn">Login with Apple ID</button>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
