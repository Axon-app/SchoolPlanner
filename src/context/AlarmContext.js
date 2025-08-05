import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

// Crear contexto para las alarmas
const AlarmContext = createContext({
  samuelDepartureTime: '',
  samuelArrivalTime: '',
  martinDepartureTime: '',
  martinArrivalTime: '',
  notificationPermission: 'default',
  setSamuelDepartureTime: () => {},
  setSamuelArrivalTime: () => {},
  setMartinDepartureTime: () => {},
  setMartinArrivalTime: () => {},
  saveAlarms: () => {},
  requestNotificationPermission: () => {}
});

// Audio para la alarma
const alarmSound = new Audio("data:audio/wav;base64,UklGRl9QDwBXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSAcDwAAAAAAAAAAAA==");

// Proveedor del contexto de alarmas
export const AlarmProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // Estados para las alarmas
  const [samuelDepartureTime, setSamuelDepartureTime] = useState('07:30');
  const [samuelArrivalTime, setSamuelArrivalTime] = useState('15:00');
  const [martinDepartureTime, setMartinDepartureTime] = useState('08:00');
  const [martinArrivalTime, setMartinArrivalTime] = useState('16:00');
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [alarmIntervals, setAlarmIntervals] = useState([]);

  // Solicita permisos de notificación al cargar
  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    } else {
      setNotificationPermission(Notification.permission);
    }
  };

  // Solicitar permisos al montar el componente
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Función para reproducir el sonido de la alarma
  const playAlarmSound = () => {
    alarmSound.play().catch(e => console.error("Error playing alarm sound:", e));
  };

  // Configurar las alarmas
  useEffect(() => {
    if (!isLoggedIn || notificationPermission !== 'granted' || 
        (!samuelDepartureTime && !samuelArrivalTime && 
         !martinDepartureTime && !martinArrivalTime)) {
      return;
    }

    // Limpiar intervalos anteriores
    alarmIntervals.forEach(clearInterval);
    
    const intervals = [];

    if (samuelDepartureTime) {
      const samuelDepartureInterval = setInterval(() => {
        const checkTime = new Date().toTimeString().slice(0, 5);
        if (checkTime === samuelDepartureTime) {
          playAlarmSound();
          new Notification('Alarma de Salida: Samuel', { body: 'Es hora de tu salida de la ruta.' });
        }
      }, 60000); // Revisa cada minuto
      intervals.push(samuelDepartureInterval);
    }

    if (samuelArrivalTime) {
      const samuelArrivalInterval = setInterval(() => {
        const checkTime = new Date().toTimeString().slice(0, 5);
        if (checkTime === samuelArrivalTime) {
          playAlarmSound();
          new Notification('Alarma de Llegada: Samuel', { body: 'Es hora de tu llegada a la ruta.' });
        }
      }, 60000); // Revisa cada minuto
      intervals.push(samuelArrivalInterval);
    }
    
    if (martinDepartureTime) {
      const martinDepartureInterval = setInterval(() => {
        const checkTime = new Date().toTimeString().slice(0, 5);
        if (checkTime === martinDepartureTime) {
          playAlarmSound();
          new Notification('Alarma de Salida: Martín', { body: 'Es hora de tu salida de la ruta.' });
        }
      }, 60000); // Revisa cada minuto
      intervals.push(martinDepartureInterval);
    }

    if (martinArrivalTime) {
      const martinArrivalInterval = setInterval(() => {
        const checkTime = new Date().toTimeString().slice(0, 5);
        if (checkTime === martinArrivalTime) {
          playAlarmSound();
          new Notification('Alarma de Llegada: Martín', { body: 'Es hora de tu llegada a la ruta.' });
        }
      }, 60000); // Revisa cada minuto
      intervals.push(martinArrivalInterval);
    }

    setAlarmIntervals(intervals);

    return () => intervals.forEach(clearInterval);
  }, [samuelDepartureTime, samuelArrivalTime, martinDepartureTime, martinArrivalTime, notificationPermission, isLoggedIn]);

  // Función para guardar las alarmas (ahora solo actualiza el estado local)
  const saveAlarms = async () => {
    console.log('Alarmas guardadas localmente');
    // No hace nada real, solo simula que se guardaron
    return Promise.resolve();
  };

  // Contexto que se proporcionará
  const alarmContext = {
    samuelDepartureTime,
    samuelArrivalTime,
    martinDepartureTime,
    martinArrivalTime,
    notificationPermission,
    setSamuelDepartureTime,
    setSamuelArrivalTime,
    setMartinDepartureTime,
    setMartinArrivalTime,
    saveAlarms,
    requestNotificationPermission
  };

  return (
    <AlarmContext.Provider value={alarmContext}>
      {children}
    </AlarmContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de alarmas
export const useAlarm = () => useContext(AlarmContext);

export default AlarmContext;
