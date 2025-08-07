import React from 'react';
import { DollarSign, Clock, Bell, List } from 'lucide-react';
import { meses } from '../utils/dateUtils';
import logoCalen from '../assets/images/logoCalen.png';

export const Header = ({ 
  currentTime, 
  currentDate, 
  totalMensual, 
  onChangeMonth, 
  onShowAlarms, 
  onShowHistory 
}) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 relative border border-slate-100" style={{
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.05)'
    }}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-0">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img 
            src={logoCalen} 
            alt="Logo School Planner" 
            className="h-12 w-12 object-contain drop-shadow-lg"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-transparent bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 bg-clip-text tracking-tight drop-shadow-lg" style={{
              fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
              textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
            }}>
              School Planner
            </h1>
            <p className="text-sm font-medium text-slate-500 tracking-wide" style={{
              fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif'
            }}>
              Control de Ruta Inteligente
            </p>
          </div>
        </div>
        
        {/* Contenedor del reloj y botones */}
        <div className="flex items-center space-x-4">
          {/* Reloj digital mejorado */}
          <div className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-xl shadow-lg">
            <Clock className="h-5 w-5 text-teal-400" />
            <span className="text-lg font-mono font-bold tracking-wide">{currentTime}</span>
          </div>
          
          {/* Botones para abrir los modales */}
          <div className="flex space-x-2">
            <button
              onClick={onShowAlarms}
              className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-md"
              aria-label="Configurar alarmas"
            >
              <Bell className="h-6 w-6" />
            </button>
            <button
              onClick={onShowHistory}
              className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md"
              aria-label="Ver historial"
            >
              <List className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-center space-x-4 mt-6 mb-4">
        <button
          onClick={() => onChangeMonth(-1)}
          className="p-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
        >
          ←
        </button>
        <h2 className="text-2xl font-semibold text-slate-700 min-w-[200px] text-center">
          {meses[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={() => onChangeMonth(1)}
          className="p-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
        >
          →
        </button>
      </div>
      <div className="flex items-center justify-center space-x-2 bg-slate-100 border border-slate-200 px-4 py-3 rounded-xl w-full">
        <DollarSign className="h-5 w-5 text-green-600" />
        <span className="text-lg font-bold text-green-700">
          Total Mensual: ${totalMensual.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
