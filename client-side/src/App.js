import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './component/RegistrationPage';
import LoginPage from './component/LoginPage';
import LandingPage from './component/LandingPage';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';  // Import the ProtectedRoute component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/landing" element={<ProtectedRoute element={<LandingPage />} />} />
            </Routes>
        </Router>
    );
};

export default App;
