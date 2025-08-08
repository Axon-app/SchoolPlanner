import React, { useEffect, useState } from 'react';
import { Edit } from 'lucide-react';
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

  // Estados de edición para cada valor
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Inicia edición
  const startEdit = (field, value) => {
    setEditField(field);
    setEditValue(value.toString());
  };

  // Guarda el valor editado
  const saveEdit = () => {
    if (editField && editValue !== "") {
      handleValueChange(editField, Number(editValue));
    }
    setEditField(null);
  };

  // Cancela edición
  const cancelEdit = () => {
    setEditField(null);
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
              {/* Llevada1 */}
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
                {editField === 'valorLlevada1' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="w-20 p-1 border border-green-300 rounded text-green-600 font-semibold text-right"
                    />
                    <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded">Guardar</button>
                    <button onClick={cancelEdit} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">${(currentData.valorLlevada1 !== undefined ? currentData.valorLlevada1 : VALORES_FIJOS.samuel.llevada).toLocaleString()}</span>
                    <button onClick={() => startEdit('valorLlevada1', currentData.valorLlevada1 !== undefined ? currentData.valorLlevada1 : VALORES_FIJOS.samuel.llevada)} className="p-1 rounded bg-blue-100 hover:bg-blue-200"><Edit className="h-4 w-4 text-blue-600" /></button>
                  </div>
                )}
              </label>
              {/* Traida1 */}
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
                {editField === 'valorTraida1' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="w-20 p-1 border border-green-300 rounded text-green-600 font-semibold text-right"
                    />
                    <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded">Guardar</button>
                    <button onClick={cancelEdit} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">${(currentData.valorTraida1 !== undefined ? currentData.valorTraida1 : VALORES_FIJOS.samuel.traida).toLocaleString()}</span>
                    <button onClick={() => startEdit('valorTraida1', currentData.valorTraida1 !== undefined ? currentData.valorTraida1 : VALORES_FIJOS.samuel.traida)} className="p-1 rounded bg-blue-100 hover:bg-blue-200"><Edit className="h-4 w-4 text-blue-600" /></button>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Martín Santiago */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Martín Santiago</h4>
            <div className="space-y-3">
              {/* Llevada2 */}
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
                {editField === 'valorLlevada2' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="w-20 p-1 border border-green-300 rounded text-green-600 font-semibold text-right"
                    />
                    <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded">Guardar</button>
                    <button onClick={cancelEdit} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">${(currentData.valorLlevada2 !== undefined ? currentData.valorLlevada2 : VALORES_FIJOS.martin.llevada).toLocaleString()}</span>
                    <button onClick={() => startEdit('valorLlevada2', currentData.valorLlevada2 !== undefined ? currentData.valorLlevada2 : VALORES_FIJOS.martin.llevada)} className="p-1 rounded bg-blue-100 hover:bg-blue-200"><Edit className="h-4 w-4 text-blue-600" /></button>
                  </div>
                )}
              </label>
              {/* Traida2 */}
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
                {editField === 'valorTraida2' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="w-20 p-1 border border-green-300 rounded text-green-600 font-semibold text-right"
                    />
                    <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded">Guardar</button>
                    <button onClick={cancelEdit} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">${(currentData.valorTraida2 !== undefined ? currentData.valorTraida2 : VALORES_FIJOS.martin.traida).toLocaleString()}</span>
                    <button onClick={() => startEdit('valorTraida2', currentData.valorTraida2 !== undefined ? currentData.valorTraida2 : VALORES_FIJOS.martin.traida)} className="p-1 rounded bg-blue-100 hover:bg-blue-200"><Edit className="h-4 w-4 text-blue-600" /></button>
                  </div>
                )}
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
                  <span className="text-green-600 font-semibold">+${(currentData.valorLlevada1 !== undefined ? Number(currentData.valorLlevada1) : VALORES_FIJOS.samuel.llevada).toLocaleString()}</span>
                </div>
              )}
              {currentData.traida1 && (
                <div className="flex justify-between">
                  <span>Samuel - Traída:</span>
                  <span className="text-green-600 font-semibold">+${(currentData.valorTraida1 !== undefined ? Number(currentData.valorTraida1) : VALORES_FIJOS.samuel.traida).toLocaleString()}</span>
                </div>
              )}
              {currentData.llevada2 && (
                <div className="flex justify-between">
                  <span>Martín - Llevada:</span>
                  <span className="text-green-600 font-semibold">+${(currentData.valorLlevada2 !== undefined ? Number(currentData.valorLlevada2) : VALORES_FIJOS.martin.llevada).toLocaleString()}</span>
                </div>
              )}
              {currentData.traida2 && (
                <div className="flex justify-between">
                  <span>Martín - Traída:</span>
                  <span className="text-green-600 font-semibold">+${(currentData.valorTraida2 !== undefined ? Number(currentData.valorTraida2) : VALORES_FIJOS.martin.traida).toLocaleString()}</span>
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
