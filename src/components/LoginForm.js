import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export const LoginForm = ({ onLogin, loginError }) => {
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('password') || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-sm text-center transition-all duration-300">
        <h1 className="text-4xl font-black text-transparent bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 bg-clip-text tracking-tight mb-6 flex items-center justify-center space-x-3" style={{
          fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
        }}>
          <Lock className="h-10 w-10 text-teal-600 drop-shadow-md" />
          <span>School Planner</span>
        </h1>
        
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
