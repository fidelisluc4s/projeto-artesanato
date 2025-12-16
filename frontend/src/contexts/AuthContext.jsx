import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('artesanato_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      if (email && password) {
        const fakeUser = {
          id: 1,
          name: 'Cliente Teste',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
          token: 'fake-jwt-token-12345'
        };
        
        setUser(fakeUser);
        localStorage.setItem('artesanato_user', JSON.stringify(fakeUser));
        return { success: true, user: fakeUser };
      }
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const register = async (userData) => {
    try {
      const fakeUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
        token: 'fake-jwt-token-' + Date.now()
      };
      
      setUser(fakeUser);
      localStorage.setItem('artesanato_user', JSON.stringify(fakeUser));
      return { success: true, user: fakeUser };
    } catch (error) {
      return { success: false, error: 'Erro ao registrar' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('artesanato_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);