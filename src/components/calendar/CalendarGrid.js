import React from 'react';
import { useCalendar } from '../../context/CalendarContext';

// Componente del calendario
const CalendarGrid = ({ onDayClick }) => {
  const { currentMonth, currentYear, dayData } = useCalendar();
  
  // Calcular días en el mes y primer día de la semana
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Días de la semana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {/* Espacios vacíos para el inicio del mes */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12"></div>
        ))}
        
        {/* Días del mes */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const hasData = dayData[`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`];
          
          return (
            <button
              key={`day-${day}`}
              onClick={() => onDayClick(day)}
              className={`h-12 rounded-lg transition-colors font-medium text-gray-700 hover:bg-gray-100 border border-gray-200 ${
                hasData ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
