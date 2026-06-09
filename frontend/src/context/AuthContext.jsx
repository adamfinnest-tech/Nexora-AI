import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        try {
          // Verify token and get fresh profile
          const profile = await authService.getProfile();
          const updatedUser = { ...profile, token };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
          console.error("Session expired or invalid token");
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data);
  };

  const loginWithGoogle = async (token) => {
    const data = await authService.googleLogin(token);
    setUser(data);
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    setUser(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
