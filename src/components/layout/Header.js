import React from 'react';
import { Calendar, DollarSign, Bell, List, Clock } from 'lucide-react';
import useDigitalClock from '../../hooks/useDigitalClock';
import { useCalendar } from '../../context/CalendarContext';

// Componente de encabezado de la aplicación
const Header = ({ onShowAlarmsModal, onShowHistoryModal }) => {
  const { totalMensual, currentMonth, currentYear, MESES, changeMonth } = useCalendar();
  const currentTime = useDigitalClock();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Calendar className="h-6 w-6 text-teal-600" />
          <h1 className="text-xl font-bold text-gray-800">Control de Ruta</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-mono">{currentTime}</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onShowAlarmsModal}
              className="p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors"
              aria-label="Configurar alarmas"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={onShowHistoryModal}
              className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              aria-label="Ver historial"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          {MESES[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          →
        </button>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg">
          <DollarSign className="h-5 w-5" />
          <span className="text-lg font-bold">Total Mensual: ${totalMensual.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
