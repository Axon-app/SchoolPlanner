import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { getDayColor } from '../../utils/calendarUtils';

// Componente del calendario
const CalendarGrid = ({ onDayClick }) => {
  const { currentMonth, currentYear, dayData } = useCalendar();
  
  // Calcular días en el mes y primer día de la semana
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Días de la semana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center font-bold text-slate-600 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {/* Espacios vacíos para el inicio del mes */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-16"></div>
        ))}
        
        {/* Días del mes */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          return (
            <button
              key={`day-${day}`}
              onClick={() => onDayClick(day)}
              className={`h-16 rounded-xl border-2 border-transparent transition-all duration-200 font-bold text-xl hover:scale-105 hover:shadow-lg ${getDayColor(day, dayData, currentYear, currentMonth)}`}
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
