import React, { useState } from 'react';
import Header from './components/layout/Header';
import LoginForm from './components/layout/LoginForm';
import CalendarGrid from './components/calendar/CalendarGrid';
import DayModal from './components/modals/DayModal';
import HistoryModal from './components/modals/HistoryModal';
import AlarmModal from './components/modals/AlarmModal';
import { useAuth } from './context/AuthContext';
import { useCalendar } from './context/CalendarContext';

// Componente principal de la aplicación
const App = () => {
  const { isLoggedIn } = useAuth();
  const { setSelectedDay } = useCalendar();
  const [showDayModal, setShowDayModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAlarmsModal, setShowAlarmsModal] = useState(false);

  // Manejador para cuando se hace clic en un día
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowDayModal(true);
  };

  // Si no hay inicio de sesión, mostrar el formulario de login
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado con reloj y controles */}
        <Header 
          onShowAlarmsModal={() => setShowAlarmsModal(true)}
          onShowHistoryModal={() => setShowHistoryModal(true)}
        />

        {/* Rejilla del calendario */}
        <CalendarGrid onDayClick={handleDayClick} />

        {/* Modales */}
        {showDayModal && (
          <DayModal onClose={() => setShowDayModal(false)} />
        )}

        {showHistoryModal && (
          <HistoryModal onClose={() => setShowHistoryModal(false)} />
        )}

        {showAlarmsModal && (
          <AlarmModal onClose={() => setShowAlarmsModal(false)} />
        )}
      </div>
    </div>
  );
};

export default App;
