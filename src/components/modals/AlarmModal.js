import React from 'react';
import { X, Bell, Info } from 'lucide-react';
import { useAlarm } from '../../context/AlarmContext';

// Componente modal para configurar las alarmas
const AlarmModal = ({ onClose }) => {
  const {
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
  } = useAlarm();

  const handleSaveAlarms = async () => {
    await saveAlarms();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Bell className="h-6 w-6 text-teal-600" />
            <span>Configurar Alarmas</span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h4 className="text-lg font-bold text-slate-700 mb-3">Alarmas para Samuel</h4>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Hora de Salida:</label>
              <input
                type="time"
                value={samuelDepartureTime}
                onChange={(e) => setSamuelDepartureTime(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Hora de Llegada:</label>
              <input
                type="time"
                value={samuelArrivalTime}
                onChange={(e) => setSamuelArrivalTime(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h4 className="text-lg font-bold text-slate-700 mb-3">Alarmas para Martín</h4>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Hora de Salida:</label>
              <input
                type="time"
                value={martinDepartureTime}
                onChange={(e) => setMartinDepartureTime(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Hora de Llegada:</label>
              <input
                type="time"
                value={martinArrivalTime}
                onChange={(e) => setMartinArrivalTime(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
        {notificationPermission !== 'granted' && (
          <div className="mt-4 p-4 rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
            <div className="flex items-start">
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Permisos de notificación denegados.</p>
                <p className="text-sm">Para recibir las alarmas, por favor, activa las notificaciones en la configuración de tu navegador.</p>
              </div>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="mt-3 w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              Activar Notificaciones
            </button>
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={handleSaveAlarms}
            className="w-full bg-teal-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Guardar Alarmas
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
