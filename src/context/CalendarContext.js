import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

// Crear contexto para los datos del calendario
const CalendarContext = createContext({
  currentDate: new Date(),
  selectedDay: null,
  dayData: {},
  totalMensual: 0,
  monthlyTotalsData: [],
  setSelectedDay: () => {},
  updateDayData: () => {},
  resetDayData: () => {},
  changeMonth: () => {}
});

// Valores fijos para cada persona
export const VALORES_FIJOS = {
  samuel: { llevada: 3000, traida: 3000 },
  martin: { llevada: 2500, traida: 2500 }
};

export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Proveedor del contexto del calendario
export const CalendarProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // Estados del calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayData, setDayData] = useState({});
  const [totalMensual, setTotalMensual] = useState(0);
  const [monthlyTotalsData, setMonthlyTotalsData] = useState([
    { id: '2025-08', total: 25000 },
    { id: '2025-07', total: 28500 },
    { id: '2025-06', total: 22000 }
  ]);

  // Obtener el mes y año actuales
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Actualiza la fecha automáticamente
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getMonth() !== currentDate.getMonth() || now.getFullYear() !== currentDate.getFullYear()) {
        setCurrentDate(now);
        setDayData({}); // Limpiar los datos del mes anterior
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentDate, isLoggedIn]);

  // Calcula el total mensual cuando los datos cambian
  useEffect(() => {
    if (!isLoggedIn) return;
    const total = Object.entries(dayData).reduce((sum, [key, data]) => {
      // Verificar si la clave pertenece al mes y año actuales
      const [year, month] = key.split('-');
      if (parseInt(year) === currentYear && parseInt(month) === currentMonth + 1) {
        if (data) {
          let dayTotal = 0;
          
          if (data.llevada1) dayTotal += (data.valorLlevada1 !== undefined ? Number(data.valorLlevada1) : VALORES_FIJOS.samuel.llevada);
          if (data.traida1) dayTotal += (data.valorTraida1 !== undefined ? Number(data.valorTraida1) : VALORES_FIJOS.samuel.traida);
          if (data.llevada2) dayTotal += (data.valorLlevada2 !== undefined ? Number(data.valorLlevada2) : VALORES_FIJOS.martin.llevada);
          if (data.traida2) dayTotal += (data.valorTraida2 !== undefined ? Number(data.valorTraida2) : VALORES_FIJOS.martin.traida);
          
          if (data.valorPrincipal) {
            dayTotal += parseFloat(data.valorPrincipal);
          }
          
          return sum + dayTotal;
        }
      }
      return sum;
    }, 0);
    setTotalMensual(total);
    
    // Simulamos guardar el total (sin Firebase)
    const docId = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    setMonthlyTotalsData(prev => {
      const existingIndex = prev.findIndex(item => item.id === docId);
      if (existingIndex >= 0) {
        const newData = [...prev];
        newData[existingIndex] = { ...newData[existingIndex], total };
        return newData;
      } else {
        return [{ id: docId, total }, ...prev];
      }
    });
  }, [dayData, isLoggedIn, currentMonth, currentYear]);

  // Función para actualizar los datos de un día
  const updateDayData = (field, value) => {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    console.log('Context - updateDayData:', { field, value, key, selectedDay });
    
    if (field === 'valorPrincipal') {
      if (value === '' || !isNaN(value)) {
        setDayData(prev => {
          const newData = {
            ...prev,
            [key]: {
              ...prev[key],
              [field]: value
            }
          };
          console.log('Context - New dayData:', newData);
          return newData;
        });
      }
    } else {
      setDayData(prev => {
        const newData = {
          ...prev,
          [key]: {
            ...prev[key],
            [field]: value
          }
        };
        console.log('Context - New dayData:', newData);
        return newData;
      });
    }
  };

  // Función para resetear los datos de un día
  const resetDayData = () => {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    setDayData(prev => {
      const newData = { ...prev };
      delete newData[key];
      return newData;
    });
  };

  // Función para cambiar de mes
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  // Función para obtener el total del mes actual
  const getCurrentMonthTotal = () => {
    return totalMensual;
  };

  // Contexto que se proporcionará
  const calendarContext = {
    currentDate,
    selectedDay,
    dayData,
    totalMensual,
    monthlyTotalsData,
    currentMonth,
    currentYear,
    setSelectedDay,
    updateDayData,
    resetDayData,
    changeMonth,
    getCurrentMonthTotal,
    MESES: MESES
  };

  return (
    <CalendarContext.Provider value={calendarContext}>
      {children}
    </CalendarContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del calendario
export const useCalendar = () => useContext(CalendarContext);

export default CalendarContext;
