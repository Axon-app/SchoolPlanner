import { useState, useEffect } from 'react';
import { StorageKeys, loadFromStorage, saveToStorage } from '../utils/storage';
import { VALORES_FIJOS } from '../utils/constants';
import { createDateKey, createMonthKey } from '../utils/dateUtils';

export const useCalendarData = (currentDate) => {
  const [dayData, setDayData] = useState({});
  const [totalMensual, setTotalMensual] = useState(0);
  const [monthlyTotalsData, setMonthlyTotalsData] = useState([]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDayData = loadFromStorage(StorageKeys.DAY_DATA, {});
    const savedMonthlyTotals = loadFromStorage(StorageKeys.MONTHLY_TOTALS, []);
    
    setDayData(savedDayData);
    setMonthlyTotalsData(savedMonthlyTotals);
  }, []);

  // Calculate monthly total when dayData changes
  useEffect(() => {
    // Filtrar solo las entradas que corresponden al mes y año actual
    const total = Object.entries(dayData).reduce((sum, [key, data]) => {
      // Verificar si la clave pertenece al mes y año actuales
      const [year, month, day] = key.split('-').map(Number);
      if (year === currentYear && month === currentMonth) {
        if (data) {
          // Calcular usando la función existente para mantener coherencia
          return sum + calculateDayTotal(data);
        }
      }
      return sum;
    }, 0);
    
    setTotalMensual(total);
    saveMonthlyTotal(currentMonth, currentYear, total);
  }, [dayData, currentMonth, currentYear]);

  const saveMonthlyTotal = (month, year, total) => {
    const monthKey = createMonthKey(year, month);
    
    // Verificamos si hay datos en este mes específico
    const hasDayDataForThisMonth = Object.entries(dayData).some(([key, data]) => {
      const [dataYear, dataMonth] = key.split('-').map(Number);
      return dataYear === year && dataMonth === month && data && Object.keys(data).length > 0;
    });
    
    // Solo actualizamos si hay datos para este mes
    if (hasDayDataForThisMonth) {
      const updatedTotals = monthlyTotalsData.filter(item => item.id !== monthKey);
      updatedTotals.push({ id: monthKey, total });
      updatedTotals.sort((a, b) => b.id.localeCompare(a.id));
      
      setMonthlyTotalsData(updatedTotals);
      saveToStorage(StorageKeys.MONTHLY_TOTALS, updatedTotals);
    } else {
      // Si no hay datos, nos aseguramos de que este mes no aparezca en el historial
      const filteredTotals = monthlyTotalsData.filter(item => item.id !== monthKey);
      if (filteredTotals.length !== monthlyTotalsData.length) {
        setMonthlyTotalsData(filteredTotals);
        saveToStorage(StorageKeys.MONTHLY_TOTALS, filteredTotals);
      }
    }
  };

  const updateDayData = (selectedDay, field, value) => {
    // Asegurarnos de que estamos usando el formato correcto para las claves
    const key = createDateKey(currentYear, currentMonth, selectedDay);
    
    const newDayData = {
      ...dayData,
      [key]: {
        ...dayData[key],
        [field]: value
      }
    };
    
    setDayData(newDayData);
    saveToStorage(StorageKeys.DAY_DATA, newDayData);
  };

  const resetDayData = (selectedDay) => {
    const key = createDateKey(currentYear, currentMonth, selectedDay);
    const newDayData = { ...dayData };
    delete newDayData[key];
    
    setDayData(newDayData);
    saveToStorage(StorageKeys.DAY_DATA, newDayData);
  };

  const getDayData = (selectedDay) => {
    const key = createDateKey(currentYear, currentMonth, selectedDay);
    return dayData[key] || {};
  };

  const calculateDayTotal = (data) => {
    let total = 0;
    
    // Obtener valores personalizados de localStorage o usar predeterminados
    const valorLlevada1 = data.valorLlevada1 !== undefined ? Number(data.valorLlevada1) : 
                         (localStorage.getItem('valorLlevada1') !== null ? Number(localStorage.getItem('valorLlevada1')) : VALORES_FIJOS.samuel.llevada);
    
    const valorTraida1 = data.valorTraida1 !== undefined ? Number(data.valorTraida1) : 
                        (localStorage.getItem('valorTraida1') !== null ? Number(localStorage.getItem('valorTraida1')) : VALORES_FIJOS.samuel.traida);
    
    const valorLlevada2 = data.valorLlevada2 !== undefined ? Number(data.valorLlevada2) : 
                         (localStorage.getItem('valorLlevada2') !== null ? Number(localStorage.getItem('valorLlevada2')) : VALORES_FIJOS.martin.llevada);
    
    const valorTraida2 = data.valorTraida2 !== undefined ? Number(data.valorTraida2) : 
                        (localStorage.getItem('valorTraida2') !== null ? Number(localStorage.getItem('valorTraida2')) : VALORES_FIJOS.martin.traida);
    
    // Sumar los valores correspondientes (incluso si son cero)
    if (data.llevada1) total += valorLlevada1;
    if (data.traida1) total += valorTraida1;
    if (data.llevada2) total += valorLlevada2;
    if (data.traida2) total += valorTraida2;
    
    // Agregar valor adicional si existe
    if (data.valorPrincipal) {
      total += parseFloat(data.valorPrincipal);
    }
    
    return total;
  };

  const getDayColor = (day) => {
    const key = createDateKey(currentYear, currentMonth, day);
    const data = dayData[key];
    
    if (data) {
      const allChecked = data.llevada1 && data.traida1 && data.llevada2 && data.traida2;
      const someChecked = data.llevada1 || data.traida1 || data.llevada2 || data.traida2;
      const hasValue = data.valorPrincipal && parseFloat(data.valorPrincipal) !== 0;
      
      if (allChecked) {
        return 'bg-teal-500 text-white';
      } else if (someChecked || hasValue) {
        return 'bg-amber-400 text-white';
      } else if (data.valorPrincipal !== undefined) {
        return 'bg-indigo-400 text-white';
      }
    }
    return 'bg-slate-200 hover:bg-slate-300';
  };

  return {
    dayData,
    totalMensual,
    monthlyTotalsData,
    updateDayData,
    resetDayData,
    getDayData,
    calculateDayTotal,
    getDayColor
  };
};
