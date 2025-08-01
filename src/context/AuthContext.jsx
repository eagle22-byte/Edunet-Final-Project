import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - replace with actual API call
    if (email && password.length >= 6) {
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'citizen'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (name, email, password) => {
    // Mock register - replace with actual API call
    if (name && email && password.length >= 6) {
      const userData = {
        id: Date.now().toString(),
        email,
        name,
        role: 'citizen'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid data' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};