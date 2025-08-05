import React, { useState } from 'react';

const TimePicker = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(4);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  // Convertir valor inicial si existe - usamos una ref para evitar actualizaciones infinitas
  const initialValueSet = React.useRef(false);
  
  React.useEffect(() => {
    if (value && typeof value === 'string' && !initialValueSet.current) {
      const [hours, minutes] = value.split(':');
      const hour24 = parseInt(hours);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      setSelectedHour(hour12);
      setSelectedMinute(parseInt(minutes));
      setIsAM(hour24 < 12);
      initialValueSet.current = true;
    }
  }, [value]);

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const handleTimeSelect = () => {
    let hour24 = selectedHour;
    if (isAM && selectedHour === 12) hour24 = 0;
    else if (!isAM && selectedHour !== 12) hour24 = selectedHour + 12;
    
    const timeString = `${hour24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange(timeString);
    setIsOpen(false);
  };

  const formatDisplayTime = () => {
    if (!value) return '00:00';
    const [hours, minutes] = value.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 < 12 ? 'A.M.' : 'P.M.';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getClockPosition = (hour, radius = 85) => {
    const angle = (hour * 30) - 90; // 30 degrees per hour, -90 to start at top
    const radian = (angle * Math.PI) / 180;
    const x = 130 + radius * Math.cos(radian);
    const y = 130 + radius * Math.sin(radian);
    return { x, y };
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-2">{label}:</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-left bg-white text-gray-800"
      >
        {formatDisplayTime()}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full mx-4 overflow-hidden">
            {/* Header azul con tiempo */}
            <div className="bg-blue-600 text-white p-6 text-center">
              <div className="text-4xl font-light tracking-wider">
                {selectedHour}:{selectedMinute.toString().padStart(2, '0')}
              </div>
              <div className="text-lg font-normal mt-1">
                {isAM ? 'A.M.' : 'P.M.'}
              </div>
            </div>

            <div className="p-6">
              {/* Reloj circular */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <svg width="260" height="260" className="absolute inset-0">
                  {/* Círculo exterior gris claro */}
                  <circle cx="130" cy="130" r="120" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="1" />
                  
                  {/* Números de horas */}
                  {hours.map((hour) => {
                    const pos = getClockPosition(hour === 12 ? 0 : hour);
                    const isSelected = selectedHour === hour;
                    return (
                      <g key={hour}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="18"
                          fill={isSelected ? "#3b82f6" : "transparent"}
                          className="cursor-pointer transition-all hover:fill-blue-100"
                          onClick={() => setSelectedHour(hour)}
                        />
                        <text
                          x={pos.x}
                          y={pos.y + 5}
                          textAnchor="middle"
                          className={`text-base font-medium cursor-pointer select-none ${
                            isSelected ? 'fill-white' : 'fill-gray-700'
                          }`}
                          onClick={() => setSelectedHour(hour)}
                        >
                          {hour}
                        </text>
                      </g>
                    );
                  })}

                  {/* Línea al centro */}
                  <line
                    x1="130"
                    y1="130"
                    x2={getClockPosition(selectedHour === 12 ? 0 : selectedHour).x}
                    y2={getClockPosition(selectedHour === 12 ? 0 : selectedHour).y}
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />

                  {/* Centro */}
                  <circle cx="130" cy="130" r="6" fill="#3b82f6" />
                </svg>
              </div>

              {/* Selector de minutos */}
              <div className="flex items-center justify-center mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedMinute(Math.max(0, selectedMinute - 5))}
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <div className="mx-4 px-4 py-2 text-xl font-medium text-gray-800 min-w-[80px] text-center">
                  :{selectedMinute.toString().padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMinute(Math.min(59, selectedMinute + 5))}
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* AM/PM */}
              <div className="flex justify-center mb-6 border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsAM(true)}
                  className={`flex-1 py-3 px-6 font-medium transition-colors ${
                    isAM 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  A.M.
                </button>
                <button
                  type="button"
                  onClick={() => setIsAM(false)}
                  className={`flex-1 py-3 px-6 font-medium transition-colors ${
                    !isAM 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  P.M.
                </button>
              </div>

              {/* Botones */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-4 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleTimeSelect}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Establecer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
