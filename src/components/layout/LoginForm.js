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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
          {loginError && (
            <div className="text-red-500 text-sm text-center">
              Credenciales incorrectas. Por favor, inténtalo de nuevo.
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
