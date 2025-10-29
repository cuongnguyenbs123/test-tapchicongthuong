/**
 * Context: AuthContext
 * Purpose: Manage authentication state (guest vs registered user)
 * Provides: User info, registration status, login/logout functions
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('quiz_logged_user', null);
  const [isRegistered, setIsRegistered] = useState(!!user);

  useEffect(() => {
    setIsRegistered(!!user);
  }, [user]);

  const register = (userData) => {
    const newUser = {
      id: userData._id || userData.id,
      fullname: userData.fullName || userData.fullname,
      phone: userData.phone,
      email: userData.email,
      gender: userData.gender,
      unit: userData.unit,
      ...userData
    };
    setUser(newUser);
    setIsRegistered(true);
  };

  const logout = () => {
    setUser(null);
    setIsRegistered(false);
    localStorage.removeItem('quiz_logged_user');
    localStorage.removeItem('quiz_session_active');
  };

  const value = {
    user,
    isRegistered,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
