import React from 'react';
import { X, Bell, Info } from 'lucide-react';
import { useAlarm } from '../../context/AlarmContext';
import TimePicker from '../ui/TimePicker';

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
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-800">Configurar Alarmas</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Sección Samuel */}
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-3">Alarmas para Samuel</h4>
            <div className="space-y-3">
              <TimePicker
                label="Hora de Salida"
                value={samuelDepartureTime}
                onChange={setSamuelDepartureTime}
              />
              <TimePicker
                label="Hora de Llegada"
                value={samuelArrivalTime}
                onChange={setSamuelArrivalTime}
              />
            </div>
          </div>

          {/* Sección Martín */}
          <div className="mt-4">
            <h4 className="text-base font-medium text-gray-700 mb-3">Alarmas para Martín</h4>
            <div className="space-y-3">
              <TimePicker
                label="Hora de Salida"
                value={martinDepartureTime}
                onChange={setMartinDepartureTime}
              />
              <TimePicker
                label="Hora de Llegada"
                value={martinArrivalTime}
                onChange={setMartinArrivalTime}
              />
            </div>
          </div>

          {/* Notificación de permisos */}
          {notificationPermission !== 'granted' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
              <div className="flex items-center text-sm">
                <Info className="h-5 w-5 mr-2 text-yellow-600 flex-shrink-0" />
                <p className="text-yellow-800">Notificaciones en la configuración de tu navegador.</p>
              </div>
              <button
                onClick={requestNotificationPermission}
                className="mt-2 w-full bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Activar Notificaciones
              </button>
            </div>
          )}
        </div>

        {/* Botones inferiores */}
        <div className="p-4">
          <button
            onClick={handleSaveAlarms}
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-3"
          >
            Establecer
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 mb-3"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              // Función para borrar todas las alarmas
              setSamuelDepartureTime('');
              setSamuelArrivalTime('');
              setMartinDepartureTime('');
              setMartinArrivalTime('');
            }}
            className="w-full py-3 px-4 text-gray-600 font-medium"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
