import React, { createContext, useState, useContext } from 'react';

// Crear contexto de autenticación
const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {}
});

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('user123'); // ID de usuario ficticio

  // Función para iniciar sesión
  const login = () => {
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false);
  };

  // Contexto que se proporcionará
  const authContext = {
    isLoggedIn,
    userId,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
