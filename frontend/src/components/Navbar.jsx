import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="w-full h-20 py-4 flex items-center justify-between px-8 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-[#e94560] shadow-lg">
      <Link
        to="/"
        className="logo w-10 transition-transform duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-auto"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      {currentUser ? (
        <>
          <div className="nav flex items-center space-x-8">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-white transition-all duration-300 hover:underline"
            >
              Feeds
            </Link>
            <Link
              to="/friends"
              className="text-lg font-semibold hover:text-white transition-all duration-300 hover:underline"
            >
              Friends
            </Link>
            <Link
              to="/profile"
              className="text-lg font-semibold hover:text-white transition-all duration-300 hover:underline"
            >
              Profile
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={
                    currentUser.profileImage ||
                    'https://via.placeholder.com/32?text=User'
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden md:inline text-white font-medium">
                {currentUser.firstName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-[#e94560] text-white p-2 rounded-full hover:bg-[#e94560]/90 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoggingOut ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSignOutAlt />
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-transparent border border-[#e94560] text-[#e94560] px-6 py-2 rounded-full font-bold hover:bg-[#e94560] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#e94560] text-white px-6 py-2 rounded-full font-bold hover:bg-[#e94560]/90 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Register
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
