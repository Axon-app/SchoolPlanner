import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import {
  authenticate,
  saveUser,
  userExists,
  changePassword,
  resetPassword
} from '../utils/userStorage';

export const LoginForm = ({ onLogin, loginError }) => {
  const [remember, setRemember] = useState(() => localStorage.getItem('rememberMe') === 'true');
  const [username, setUsername] = useState(() => (localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('username') || '' : ''));
  const [password, setPassword] = useState(() => (localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('password') || '' : ''));
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (isRegister) {
      if (userExists(username)) {
        setMessage('El usuario ya existe.');
        return;
      }
      saveUser(username, password);
      setMessage('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
      setIsRegister(false);
      setUsername('');
      setPassword('');
      return;
    }
    if (isReset) {
      if (!userExists(username)) {
        setMessage('El usuario no existe.');
        return;
      }
      if (!newPassword) {
        setMessage('Debes ingresar la nueva contraseña.');
        return;
      }
      resetPassword(username, newPassword);
      setMessage('Contraseña actualizada. Ahora puedes iniciar sesión.');
      setIsReset(false);
      setUsername('');
      setPassword('');
      setNewPassword('');
      return;
    }
    // Login normal
    if (authenticate(username, password)) {
      if (remember) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.setItem('rememberMe', 'false');
      }
      onLogin(username, password);
    } else {
      setMessage('Credenciales incorrectas.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-sm text-center transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <Lock className="h-10 w-10 text-teal-600 drop-shadow-md mb-2" />
          <h1
            className="text-4xl font-black text-transparent bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 bg-clip-text tracking-tight w-full text-center"
            style={{
              fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
              textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
            }}
          >
            School Planner
          </h1>
        </div>
  <form onSubmit={handleSubmit}>
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
          {!isReset && (
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-800 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          )}
          {isReset && (
            <div className="mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          )}
          {message && (
            <div className={`text-sm mb-4 ${message.includes('incorrectas') || message.includes('existe') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </div>
          )}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="mr-2 accent-teal-600"
            />
            <label htmlFor="rememberMe" className="text-sm text-slate-700 select-none">Recordar usuario y contraseña</label>
          </div>
          {remember && (
            <div className="mb-4 text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1">
              Advertencia: No actives esta opción en computadoras públicas o compartidas.
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 mb-2"
          >
            {isRegister ? 'Registrar' : isReset ? 'Cambiar contraseña' : 'Entrar'}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="text-teal-700 hover:underline text-sm"
            onClick={() => {
              setIsRegister((v) => !v);
              setIsReset(false);
              setMessage('');
            }}
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
          <button
            className="text-teal-700 hover:underline text-sm"
            onClick={() => {
              setIsReset((v) => !v);
              setIsRegister(false);
              setMessage('');
            }}
          >
            {isReset ? 'Volver a iniciar sesión' : '¿Olvidaste tu contraseña?'}
          </button>
        </div>
      </div>
    </div>
  );
};
