import React, { useState } from 'react';
import { X, Bell, Info, Clock, Save, Edit } from 'lucide-react';
import EditNamesModal from './EditNamesModal';

const TimePickerWheel = ({ value, onChange, type }) => {
  const min = type === 'hours' ? 1 : 0;
  const max = type === 'hours' ? 12 : 59;
  let numValue = parseInt(value, 10);
  if (isNaN(numValue)) numValue = type === 'hours' ? 1 : 0;
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-14 flex items-center justify-center bg-gray-50 rounded-lg text-2xl font-semibold select-none border border-gray-200 mb-2">
        {numValue.toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <button
          className="text-gray-500 hover:text-black px-2 py-1 rounded focus:outline-none"
          onClick={() => onChange(((numValue - 1) < min ? max : numValue - 1).toString().padStart(2, '0'))}
          aria-label="Decrementar"
        >
          ▼
        </button>
        <button
          className="text-gray-500 hover:text-black px-2 py-1 rounded focus:outline-none"
          onClick={() => onChange(((numValue + 1) > max ? min : numValue + 1).toString().padStart(2, '0'))}
          aria-label="Incrementar"
        >
          ▲
        </button>
      </div>
    </div>
  );
};

const TimePicker = ({ time, onChange, label }) => {
  // Convertir a formato 12h y AM/PM
  let [hours, minutes] = time.split(':');
  let ampm = 'AM';
  let h = parseInt(hours, 10);
  if (h === 0) {
    hours = '12';
    ampm = 'AM';
  } else if (h === 12) {
    hours = '12';
    ampm = 'PM';
  } else if (h > 12) {
    hours = (h - 12).toString().padStart(2, '0');
    ampm = 'PM';
  } else {
    hours = h.toString().padStart(2, '0');
    ampm = 'AM';
  }

  const handleHoursChange = (newHours) => {
    updateTime(newHours, minutes, ampm);
  };
  const handleMinutesChange = (newMinutes) => {
    updateTime(hours, newMinutes, ampm);
  };
  const handleAmPmChange = (newAmPm) => {
    updateTime(hours, minutes, newAmPm);
  };

  function updateTime(hh, mm, ampmValue) {
    let h = parseInt(hh, 10);
    if (ampmValue === 'AM') {
      if (h === 12) h = 0;
    } else {
      if (h !== 12) h += 12;
    }
    onChange(`${h.toString().padStart(2, '0')}:${mm}`);
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex space-x-2 items-center">
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1 text-center">Horas</div>
          <TimePickerWheel value={hours} onChange={handleHoursChange} type="hours" />
        </div>
        <div className="flex items-center justify-center text-2xl font-bold text-gray-400">:</div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1 text-center">Minutos</div>
          <TimePickerWheel value={minutes} onChange={handleMinutesChange} type="minutes" />
        </div>
        <div className="ml-2">
          <select value={ampm} onChange={e => handleAmPmChange(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export function AlarmsModal({
  onClose,
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
  onSaveAlarms
}) {
  // Nombres editables
  const [names, setNames] = useState([
    localStorage.getItem('nameSamuel') || 'Samuel Mathias',
    localStorage.getItem('nameMartin') || 'Martín Santiago'
  ]);
  const [showEditNames, setShowEditNames] = useState(false);
  const [editNameIdx, setEditNameIdx] = useState(null);

  const handleSaveNames = (newNames) => {
    setNames(newNames);
    localStorage.setItem('nameSamuel', newNames[0]);
    localStorage.setItem('nameMartin', newNames[1]);
    setEditNameIdx(null);
  };
  const handleDeleteName = (idx) => {
    const updated = [...names];
    updated[idx] = idx === 0 ? 'Samuel Mathias' : 'Martín Santiago';
    setNames(updated);
    localStorage.setItem(idx === 0 ? 'nameSamuel' : 'nameMartin', updated[idx]);
    setEditNameIdx(null);
  };
  // Referencia para el audio
  const audioRef = React.useRef(null);
  const [alarmPlayed, setAlarmPlayed] = React.useState(false);
  const [isAlarmActive, setIsAlarmActive] = React.useState(false);

  // Handler para terminar alarma desde audio
  const handleAudioEnded = () => {
    setIsAlarmActive(false);
  };


  const playAlarmTone = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setAlarmPlayed(true);
      setIsAlarmActive(true);
      // Listener para desactivar alarma cuando termine el audio
  audioRef.current.removeEventListener('ended', handleAudioEnded);
  audioRef.current.addEventListener('ended', handleAudioEnded);
    }
    // Vibración en móviles
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([800, 200, 800]); // vibrar, pausar, vibrar
    }
    // Notificación push
    if (window.Notification && Notification.permission === "granted") {
      new Notification("¡Alarma!", {
        body: "Es hora de tu alarma programada.",
        icon: "/logoCalen.png"
      });
    }
  };

  // Chequeo automático de alarmas
  React.useEffect(() => {
    setAlarmPlayed(false);
    const interval = setInterval(() => {
      const now = new Date();
      const current = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      let alarmType = null;
      if (samuelDepartureTime === current) alarmType = 'Samuel - Hora de Salida';
      else if (samuelArrivalTime === current) alarmType = 'Samuel - Hora de Llegada';
      else if (martinDepartureTime === current) alarmType = 'Martín - Hora de Salida';
      else if (martinArrivalTime === current) alarmType = 'Martín - Hora de Llegada';
      if (alarmType && !alarmPlayed) {
        playAlarmTone();
        // Notificación personalizada
        if (window.Notification && Notification.permission === "granted") {
          new Notification("¡Alarma!", {
            body: `Es hora de: ${alarmType}`,
            icon: "/logoCalen.png"
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [samuelDepartureTime, samuelArrivalTime, martinDepartureTime, martinArrivalTime]);

  const handleSave = () => {
    if (onSaveAlarms) {
      onSaveAlarms();
    }
  playAlarmTone();
  onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <audio ref={audioRef} src="/kuwait-eas-alarm.mp3" preload="auto" />
      {isAlarmActive && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 flex flex-col items-center">
            <span className="text-2xl font-bold mb-4 text-red-600">¡Alarma sonando!</span>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-600"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                  audioRef.current.removeEventListener('ended', handleAudioEnded);
                }
                if (window.navigator && window.navigator.vibrate) {
                  window.navigator.vibrate(0); // detener vibración
                }
                setIsAlarmActive(false);
                // No reiniciar alarmPlayed, así no vuelve a sonar en el mismo minuto
              }}
            >
              Parar Alarma
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <Clock className="mr-2" />
              Configurar Alarmas
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {notificationPermission !== 'granted' && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm mb-2">
                Para recibir notificaciones de alarma, necesitas permitir las notificaciones.
              </p>
              <button
                onClick={requestNotificationPermission}
                className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600 transition-colors"
              >
                Permitir Notificaciones
              </button>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">{names[0]}</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setShowEditNames(true); setEditNameIdx(0); }} className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition" title="Editar nombre">
                    <Edit className="h-5 w-5 text-blue-600" />
                  </button>
                  <span className="text-xs text-blue-600 font-medium">Escribe el nombre</span>
                </div>
              </div>
              <TimePicker
                time={samuelDepartureTime}
                onChange={setSamuelDepartureTime}
                label="Hora de Salida"
              />
              <TimePicker
                time={samuelArrivalTime}
                onChange={setSamuelArrivalTime}
                label="Hora de Llegada"
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800">{names[1]}</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setShowEditNames(true); setEditNameIdx(1); }} className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition" title="Editar nombre">
                    <Edit className="h-5 w-5 text-blue-600" />
                  </button>
                  <span className="text-xs text-blue-600 font-medium">Escribe el nombre</span>
                </div>
              </div>
              <TimePicker
                time={martinDepartureTime}
                onChange={setMartinDepartureTime}
                label="Hora de Salida"
              />
              <TimePicker
                time={martinArrivalTime}
                onChange={setMartinArrivalTime}
                label="Hora de Llegada"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
            >
              <Save className="mr-2" size={20} />
              Guardar Alarmas
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
          <EditNamesModal
            open={showEditNames}
            names={editNameIdx !== null ? [names[editNameIdx]] : names}
            onSave={newNames => {
              if (editNameIdx !== null) {
                const updated = [...names];
                updated[editNameIdx] = newNames[0];
                handleSaveNames(updated);
              } else {
                handleSaveNames(newNames);
              }
            }}
            onDelete={idx => {
              if (editNameIdx !== null) {
                handleDeleteName(editNameIdx);
              } else {
                handleDeleteName(idx);
              }
            }}
            onClose={() => { setShowEditNames(false); setEditNameIdx(null); }}
          />
        </div>
      </div>
    </div>
  );
}
