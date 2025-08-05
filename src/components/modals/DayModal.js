import React, { useEffect, useState } from 'react';
import { X, DollarSign, RotateCcw } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';
import { VALORES_FIJOS, MESES } from '../../context/CalendarContext';
import { calculateDayTotal } from '../../utils/calendarUtils';

// Componente modal para editar datos del día
const DayModal = ({ onClose }) => {
  const { selectedDay, currentMonth, currentYear, updateDayData, resetDayData, dayData } = useCalendar();
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    console.log('DayModal - Key:', key);
    console.log('DayModal - All dayData:', dayData);
    console.log('DayModal - Current data:', dayData[key]);
    setCurrentData(dayData[key] || {});
  }, [dayData, selectedDay, currentMonth, currentYear]);

  const handleCheckboxChange = (field, checked) => {
    console.log('Checkbox change:', field, checked);
    updateDayData(field, checked);
  };

  const handleValueChange = (field, value) => {
    updateDayData(field, value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Día {selectedDay} - {MESES[currentMonth]}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Samuel Mathias */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Samuel Mathias</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={currentData.llevada1 || false}
                    onChange={(e) => handleCheckboxChange('llevada1', e.target.checked)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Llevada</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.samuel.llevada.toLocaleString()}</span>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={currentData.traida1 || false}
                    onChange={(e) => handleCheckboxChange('traida1', e.target.checked)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Traída</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.samuel.traida.toLocaleString()}</span>
              </label>
            </div>
          </div>

          {/* Martín Santiago */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Martín Santiago</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={currentData.llevada2 || false}
                    onChange={(e) => handleCheckboxChange('llevada2', e.target.checked)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Llevada</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.martin.llevada.toLocaleString()}</span>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={currentData.traida2 || false}
                    onChange={(e) => handleCheckboxChange('traida2', e.target.checked)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Traída</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.martin.traida.toLocaleString()}</span>
              </label>
            </div>
          </div>

          {/* Valor Adicional */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-purple-600 mb-2 font-medium">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Valor Adicional (Opcional):
            </label>
            <input
              type="text"
              value={currentData.valorPrincipal || ''}
              onChange={(e) => handleValueChange('valorPrincipal', e.target.value)}
              placeholder="Ej: 1000 o -500"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Resumen del Día */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="text-lg font-medium text-gray-800 mb-3">Resumen del Día:</h5>
            <div className="space-y-2 text-sm mb-4">
              {currentData.llevada1 && (
                <div className="flex justify-between">
                  <span>Samuel - Llevada:</span>
                  <span className="text-green-600 font-semibold">+${VALORES_FIJOS.samuel.llevada.toLocaleString()}</span>
                </div>
              )}
              {currentData.traida1 && (
                <div className="flex justify-between">
                  <span>Samuel - Traída:</span>
                  <span className="text-green-600 font-semibold">+${VALORES_FIJOS.samuel.traida.toLocaleString()}</span>
                </div>
              )}
              {currentData.llevada2 && (
                <div className="flex justify-between">
                  <span>Martín - Llevada:</span>
                  <span className="text-green-600 font-semibold">+${VALORES_FIJOS.martin.llevada.toLocaleString()}</span>
                </div>
              )}
              {currentData.traida2 && (
                <div className="flex justify-between">
                  <span>Martín - Traída:</span>
                  <span className="text-green-600 font-semibold">+${VALORES_FIJOS.martin.traida.toLocaleString()}</span>
                </div>
              )}
              {currentData.valorPrincipal && parseFloat(currentData.valorPrincipal) !== 0 && (
                <div className="flex justify-between">
                  <span>Valor Adicional:</span>
                  <span className={`font-semibold ${parseFloat(currentData.valorPrincipal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(currentData.valorPrincipal) >= 0 ? '+' : ''}${parseFloat(currentData.valorPrincipal).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total del Día:</span>
                <span className="text-2xl font-bold text-teal-600">
                  ${calculateDayTotal(currentData, VALORES_FIJOS).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={() => {
                resetDayData();
                onClose();
              }}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            <button 
              onClick={onClose} 
              className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
