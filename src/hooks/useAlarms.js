import { useState, useEffect } from 'react';
import { StorageKeys, loadFromStorage, saveToStorage } from '../utils/storage';
import { ALARM_SOUND_DATA, NOTIFICATION_MESSAGES } from '../utils/constants';
import { getCurrentTimeString } from '../utils/dateUtils';

export const useAlarms = () => {
  const [samuelDepartureTime, setSamuelDepartureTime] = useState('');
  const [samuelArrivalTime, setSamuelArrivalTime] = useState('');
  const [martinDepartureTime, setMartinDepartureTime] = useState('');
  const [martinArrivalTime, setMartinArrivalTime] = useState('');
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [alarmIntervals, setAlarmIntervals] = useState([]);

  const alarmSound = new Audio(ALARM_SOUND_DATA);

  // Load alarms from localStorage
  useEffect(() => {
    const savedAlarms = loadFromStorage(StorageKeys.ALARMS, {});
    setSamuelDepartureTime(savedAlarms.samuelDepartureTime || '');
    setSamuelArrivalTime(savedAlarms.samuelArrivalTime || '');
    setMartinDepartureTime(savedAlarms.martinDepartureTime || '');
    setMartinArrivalTime(savedAlarms.martinArrivalTime || '');
  }, []);

  // Request notification permission
  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    } else {
      setNotificationPermission(Notification.permission);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const playAlarmSound = () => {
    alarmSound.play().catch(e => console.error("Error playing alarm sound:", e));
  };

  // Setup alarm intervals
  useEffect(() => {
    if (notificationPermission !== 'granted' || 
        (!samuelDepartureTime && !samuelArrivalTime && !martinDepartureTime && !martinArrivalTime)) {
      return;
    }

    // Clear previous intervals
    alarmIntervals.forEach(clearInterval);
    setAlarmIntervals([]);

    const intervals = [];

    const createAlarmInterval = (time, message) => {
      if (!time) return null;
      
      return setInterval(() => {
        const checkTime = getCurrentTimeString();
        if (checkTime === time) {
          playAlarmSound();
          new Notification('Alarma de Ruta', { body: message });
        }
      }, 60000); // Check every minute
    };

    if (samuelDepartureTime) {
      const interval = createAlarmInterval(samuelDepartureTime, NOTIFICATION_MESSAGES.SAMUEL_DEPARTURE);
      if (interval) intervals.push(interval);
    }

    if (samuelArrivalTime) {
      const interval = createAlarmInterval(samuelArrivalTime, NOTIFICATION_MESSAGES.SAMUEL_ARRIVAL);
      if (interval) intervals.push(interval);
    }

    if (martinDepartureTime) {
      const interval = createAlarmInterval(martinDepartureTime, NOTIFICATION_MESSAGES.MARTIN_DEPARTURE);
      if (interval) intervals.push(interval);
    }

    if (martinArrivalTime) {
      const interval = createAlarmInterval(martinArrivalTime, NOTIFICATION_MESSAGES.MARTIN_ARRIVAL);
      if (interval) intervals.push(interval);
    }

    setAlarmIntervals(intervals);

    return () => intervals.forEach(clearInterval);
  }, [samuelDepartureTime, samuelArrivalTime, martinDepartureTime, martinArrivalTime, notificationPermission]);

  const saveAlarms = () => {
    const alarmConfig = {
      samuelDepartureTime,
      samuelArrivalTime,
      martinDepartureTime,
      martinArrivalTime
    };
    
    saveToStorage(StorageKeys.ALARMS, alarmConfig);
    console.log('Alarmas guardadas exitosamente.');
  };

  return {
    samuelDepartureTime,
    setSamuelDepartureTime,
    samuelArrivalTime,
    setSamuelArrivalTime,
    martinDepartureTime,
    setMartinDepartureTime,
    martinArrivalTime,
    setMartinArrivalTime,
    notificationPermission,
    requestNotificationPermission,
    saveAlarms
  };
};
