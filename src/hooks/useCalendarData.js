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
    const total = Object.values(dayData).reduce((sum, data) => {
      if (data) {
        let dayTotal = 0;
        
        if (data.llevada1) dayTotal += VALORES_FIJOS.samuel.llevada;
        if (data.traida1) dayTotal += VALORES_FIJOS.samuel.traida;
        if (data.llevada2) dayTotal += VALORES_FIJOS.martin.llevada;
        if (data.traida2) dayTotal += VALORES_FIJOS.martin.traida;
        
        if (data.valorPrincipal) {
          dayTotal += parseFloat(data.valorPrincipal);
        }
        
        return sum + dayTotal;
      }
      return sum;
    }, 0);
    
    setTotalMensual(total);
    saveMonthlyTotal(currentMonth, currentYear, total);
  }, [dayData, currentMonth, currentYear]);

  const saveMonthlyTotal = (month, year, total) => {
    const monthKey = createMonthKey(year, month);
    const updatedTotals = monthlyTotalsData.filter(item => item.id !== monthKey);
    updatedTotals.push({ id: monthKey, total });
    updatedTotals.sort((a, b) => b.id.localeCompare(a.id));
    
    setMonthlyTotalsData(updatedTotals);
    saveToStorage(StorageKeys.MONTHLY_TOTALS, updatedTotals);
  };

  const updateDayData = (selectedDay, field, value) => {
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
    if (data.llevada1) total += VALORES_FIJOS.samuel.llevada;
    if (data.traida1) total += VALORES_FIJOS.samuel.traida;
    if (data.llevada2) total += VALORES_FIJOS.martin.llevada;
    if (data.traida2) total += VALORES_FIJOS.martin.traida;
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
