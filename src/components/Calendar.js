import React, { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';

export const Calendar = ({ currentDate, onDayClick, getDayColor, onChangeMonth }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Estados para controlar el deslizamiento
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Umbral mínimo de deslizamiento en píxeles para activar el cambio de mes
  const minSwipeDistance = 50;
  
  // Manejar el evento de inicio de toque
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  // Manejar el evento de movimiento de toque
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  // Estado para controlar la animación de cambio de mes
  const [swipeAnimation, setSwipeAnimation] = useState('');
  
  // Manejar el evento de fin de toque
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) >= minSwipeDistance;
    
    if (isSwipe) {
      // Si la distancia es negativa, el usuario deslizó de izquierda a derecha (mes anterior)
      // Si la distancia es positiva, el usuario deslizó de derecha a izquierda (mes siguiente)
      if (distance > 0) {
        setSwipeAnimation('animate-slide-out-left');
        setTimeout(() => {
          onChangeMonth(1); // Mes siguiente
          setSwipeAnimation('animate-slide-in-right');
        }, 150);
      } else {
        setSwipeAnimation('animate-slide-out-right');
        setTimeout(() => {
          onChangeMonth(-1); // Mes anterior
          setSwipeAnimation('animate-slide-in-left');
        }, 150);
      }
      
      // Resetear la animación después de completarse
      setTimeout(() => {
        setSwipeAnimation('');
      }, 300);
    }
    
    // Resetear los valores de toque
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-xl p-6 mb-6 touch-pan-x transition-all duration-150 ${swipeAnimation}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Indicador de deslizamiento */}
      <div className="flex justify-center items-center mb-3 text-slate-500 text-xs">
        <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Desliza para cambiar de mes</span>
        <svg className="w-4 h-4 ml-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      
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
