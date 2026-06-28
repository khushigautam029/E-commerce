// src/Pages/DeleteAccount.js
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = () => {
    // Simulate account deletion (you can add real API call here)
    alert('Your account has been deleted.');
    logout();
    navigate('/signup'); // Redirect to signup after deletion
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 text-danger">Delete Account</h2>
      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      <button className="btn btn-danger me-3" onClick={handleDelete}>
        Yes, Delete My Account
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteAccount;
