import { useContext, useState } from 'react';
import { FaChevronDown, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full border border-gray-300 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2.5 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex min-w-[180px] items-center">
          <Link
            className="text-xl font-semibold tracking-tight text-pink-700 no-underline transition-opacity hover:opacity-80"
            to="/"
          >
            E-Commerce
          </Link>
        </div>

        {/* Search */}
        <div className="mx-auto hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaSearch size={14} />
            </div>

            <input
              type="text"
              className="block w-full rounded-full border border-gray-300 bg-slate-50 py-2 pl-9 pr-4 text-sm text-gray-700 transition focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Search products"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">

          {/* Profile */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-2 rounded-full border border-transparent bg-transparent px-1.5 py-1 text-pink-700 transition hover:text-pink-600">
              
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                <FaUser size={13} />
              </div>

              <span className="hidden text-sm font-medium sm:block">
                {user?.username || 'Profile'}
              </span>

              <FaChevronDown size={10} className="text-pink-700" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user?.username || 'Guest'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {user?.phone || '+91 6367739531'}
                  </p>
                </div>

                <button
                  onClick={() => navigate('/orders')}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                >
                  My Orders
                </button>

                <button
                  onClick={() => navigate('/delete-account')}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  Delete Account
                </button>

                <div className="my-1 border-t border-gray-100"></div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 text-pink-700 transition hover:text-pink-600"
          >
            <FaShoppingCart size={18} />

            {cartItems.length > 0 && (
              <span className="absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-pink-600 text-[10px] font-bold leading-none text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>
      </div>
      <hr className="border-t-1 border-black" />

    </nav>
  );
};

export default Navbar;