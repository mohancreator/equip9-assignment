import { useState } from 'react';
import axios from 'axios'; // Correct import for axios
import { useNavigate } from 'react-router-dom';
import './index.css';


function RegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        password: '',
    });

    const [statusMessage, setStatusMessage] = useState(''); // To show success or error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = 'http://localhost:3008/register';
        

        try {
            const response = await axios.post(api, formData); // Send form data to backend
            setStatusMessage('Registration successful!');
            console.log(response.data)
            setTimeout(() => {navigate('/login')}, 2000)
        } catch (error) {
            console.error('Error registering user:', error);
            setStatusMessage('Failed to register. Please try again.');
        }
    };

    return (
        <div className='App'>
            <div className="registration-form">
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

            <div className="social-login">
                <button>Login with Google</button>
                <button>Login with Facebook</button>
                <button>Login with Apple ID</button>
            </div>
        </div>
        </div>
    );
}

export default RegistrationPage;
