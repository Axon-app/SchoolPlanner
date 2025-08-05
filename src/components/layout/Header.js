import React from 'react';
import { Calendar, DollarSign, Bell, List, Clock } from 'lucide-react';
import useDigitalClock from '../../hooks/useDigitalClock';
import { useCalendar } from '../../context/CalendarContext';

// Componente de encabezado de la aplicación
const Header = ({ onShowAlarmsModal, onShowHistoryModal }) => {
  const { totalMensual, currentMonth, currentYear, MESES, changeMonth } = useCalendar();
  const currentTime = useDigitalClock();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-0">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Calendar className="h-8 w-8 text-teal-600" />
          <h1 className="text-2xl font-bold text-slate-800">
            Control de Ruta
          </h1>
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
              onClick={onShowAlarmsModal}
              className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-md"
              aria-label="Configurar alarmas"
            >
              <Bell className="h-6 w-6" />
            </button>
            <button
              onClick={onShowHistoryModal}
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
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
        >
          ←
        </button>
        <h2 className="text-2xl font-semibold text-slate-700 min-w-[200px] text-center">
          {MESES[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={() => changeMonth(1)}
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

export default Header;
