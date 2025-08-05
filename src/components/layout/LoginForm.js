import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Componente de formulario de inicio de sesión
const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Credenciales ofuscadas para demostración (NO SEGURO para producción)
  const VALID_USERNAME_ENCODED = btoa('admin');
  const VALID_PASSWORD_ENCODED = btoa('temporal123');

  const handleLogin = (e) => {
    e.preventDefault();
    const inputUsernameEncoded = btoa(username);
    const inputPasswordEncoded = btoa(password);

    if (inputUsernameEncoded === VALID_USERNAME_ENCODED && inputPasswordEncoded === VALID_PASSWORD_ENCODED) {
      login();
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-sm text-center transition-all duration-300">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center justify-center space-x-2">
          <Lock className="h-8 w-8 text-teal-600" />
          <span>Iniciar Sesión</span>
        </h1>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {loginError && (
            <div className="text-red-500 text-sm mb-4">
              Credenciales incorrectas. Por favor, inténtalo de nuevo.
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
