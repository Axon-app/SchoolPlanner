import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';

export const Calendar = ({ currentDate, onDayClick, getDayColor }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center font-bold text-slate-600 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="h-16"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          return (
            <button
              key={day}
              onClick={() => onDayClick(day)}
              className={`h-16 rounded-xl border-2 border-transparent transition-all duration-200 font-bold text-xl hover:scale-105 hover:shadow-lg ${getDayColor(day)}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
