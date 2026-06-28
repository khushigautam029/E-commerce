import { useContext, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext); // Access cart from context
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-purple" to="/">
          <span style={{ color: '#720760', fontSize: '30px' }}>LifestyleNest</span>
        </Link>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Try clothes, gifts or Search by Product Code"
            />
          </div>
        </form>

        {/* Right Side Links */}
        <div className="d-flex align-items-center gap-4 position-relative">

          {/* Profile Dropdown */}
          <div
            className="position-relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center text-dark">
              <FaUser className="me-2" /> Profile
            </div>

            {showDropdown && (
              <div className="position-absolute bg-white shadow rounded p-3" style={{ top: '40px', right: 0, width: '220px', zIndex: 1000 }}>
                {/* User Info */}
                <div className="text-center mb-3">
                  <div>Hello!!..{user?.username || 'Guest'}</div>
                  <div className="text-muted">Phone:-{user?.phone || '+91 6367739531'}</div>
                </div>

                <hr />

                {/* My Orders */}
                <div className="mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/my-orders')}>
                  My Orders
                </div>

                {/* Delete Account */}
                <div className="mb-2 text-danger" style={{ cursor: 'pointer' }} onClick={() => navigate('/delete-account')}>
                  Delete Account
                </div>

                {/* Logout */}
                <div className="text-primary" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon with Count */}
          <Link to="/cart" className="text-decoration-none text-dark d-flex align-items-center position-relative">
            <FaShoppingCart className="me-2" /> Cart
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
