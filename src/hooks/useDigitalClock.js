import { useState, useEffect } from 'react';

// Hook personalizado para el reloj digital
const useDigitalClock = () => {
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};

export default useDigitalClock;
