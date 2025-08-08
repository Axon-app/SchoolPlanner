import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { Header } from './Header';
import { Calendar } from './Calendar';
import { DayModal } from './DayModal';
import { AlarmsModal } from './AlarmsModal';
import { HistoryModal } from './HistoryModal';
import { useAuth } from '../hooks/useAuth';
import { useClock } from '../hooks/useClock';
import { useCalendarData } from '../hooks/useCalendarData';
import { useAlarms } from '../hooks/useAlarms';
import { shareService } from '../services/shareService';

export const CalendarioControlRuta = () => {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAlarmsModal, setShowAlarmsModal] = useState(false);

  // Custom hooks
  const { isLoggedIn, loginError, login } = useAuth();
  const currentTime = useClock();
  const {
    dayData,
    totalMensual,
    monthlyTotalsData,
    updateDayData,
    resetDayData,
    getDayData,
    calculateDayTotal,
    getDayColor
  } = useCalendarData(currentDate);

  const {
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
  } = useAlarms();

  // Auto-update date to current month
  useEffect(() => {
    if (!isLoggedIn) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getMonth() !== currentDate.getMonth() || now.getFullYear() !== currentDate.getFullYear()) {
        setCurrentDate(now);
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [currentDate, isLoggedIn]);

  // Handlers
  const handleLogin = (username, password) => {
    login(username, password);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleUpdateDayData = (field, value) => {
    updateDayData(selectedDay, field, value);
  };

  const handleResetDayData = () => {
    resetDayData(selectedDay);
    setShowModal(false);
  };

  const handleChangeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    // Al cambiar de mes, limpiamos el día seleccionado para evitar confusiones
    setSelectedDay(null);
  };

  const handleSaveAlarms = () => {
    saveAlarms();
    setShowAlarmsModal(false);
  };

  const handleShareReport = (setClipboardMessage, dataToShare = null) => {
    const data = dataToShare || monthlyTotalsData;
    shareService.shareMonthlyReport(data, setClipboardMessage);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} loginError={loginError} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Header
          currentTime={currentTime}
          currentDate={currentDate}
          totalMensual={totalMensual}
          onChangeMonth={handleChangeMonth}
          onShowAlarms={() => setShowAlarmsModal(true)}
          onShowHistory={() => setShowHistoryModal(true)}
        />

        <Calendar
          currentDate={currentDate}
          onDayClick={handleDayClick}
          getDayColor={getDayColor}
          onChangeMonth={handleChangeMonth}
        />

        {showModal && (
          <DayModal
            selectedDay={selectedDay}
            currentDate={currentDate}
            dayData={getDayData(selectedDay)}
            onUpdateData={handleUpdateDayData}
            onResetData={handleResetDayData}
            onClose={() => setShowModal(false)}
            calculateDayTotal={calculateDayTotal}
          />
        )}

        {showHistoryModal && (
          <HistoryModal
            onClose={() => setShowHistoryModal(false)}
            monthlyTotalsData={monthlyTotalsData}
            onShareReport={handleShareReport}
          />
        )}

        {showAlarmsModal && (
          <AlarmsModal
            onClose={() => setShowAlarmsModal(false)}
            samuelDepartureTime={samuelDepartureTime}
            setSamuelDepartureTime={setSamuelDepartureTime}
            samuelArrivalTime={samuelArrivalTime}
            setSamuelArrivalTime={setSamuelArrivalTime}
            martinDepartureTime={martinDepartureTime}
            setMartinDepartureTime={setMartinDepartureTime}
            martinArrivalTime={martinArrivalTime}
            setMartinArrivalTime={setMartinArrivalTime}
            notificationPermission={notificationPermission}
            requestNotificationPermission={requestNotificationPermission}
            onSaveAlarms={handleSaveAlarms}
          />
        )}
      </div>
    </div>
  );
};
