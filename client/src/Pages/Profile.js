// src/Pages/Profile.jsx
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth(); // Get user data from AuthContext

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Profile</h2>
            {user ? (
                <div className="card p-4">
                    <h4>Username: {user.username}</h4>
                    <h4>Phone: {user.phone}</h4>
                    {/* You can show more user details here */}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Profile;
