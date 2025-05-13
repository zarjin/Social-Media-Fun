import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/getUser', {
          withCredentials: true,
        });
        setCurrentUser(res.data);
      } catch (err) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/api/user/register', userData, {
        withCredentials: true,
      });
      // After registration, fetch user data
      await fetchCurrentUser();
      toast.success('Registration successful!');
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/api/user/login', credentials, {
        withCredentials: true,
      });
      // After login, fetch user data
      await fetchCurrentUser();
      toast.success('Login successful!');
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/api/user/logout', {
        withCredentials: true,
      });
      setCurrentUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Logout failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/getUser', {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      return res.data;
    } catch (err) {
      setCurrentUser(null);
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
