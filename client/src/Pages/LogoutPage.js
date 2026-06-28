// src/Pages/LogoutPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutPage = () => {
    const { logout } = useAuth();  // This should be from your AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Clear the authentication data
        navigate('/login'); // Redirect to login page
    }, [logout, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h2 className="text-xl font-semibold">Logging you out...</h2>
        </div>
    );
};

export default LogoutPage;
