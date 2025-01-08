import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './component/RegistrationPage';
import LoginPage from './component/LoginPage';
import LandingPage from './component/LandingPage';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Pass LandingPage as children to ProtectedRoute */}
                <Route path="/" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
