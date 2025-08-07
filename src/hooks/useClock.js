import { useState, useEffect } from 'react';
import { formatTime } from '../utils/dateUtils';

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(formatTime(new Date()));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};
