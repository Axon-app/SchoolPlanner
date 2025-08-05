import React from 'react';
import { X, DollarSign, RotateCcw } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';
import { VALORES_FIJOS, MESES } from '../../context/CalendarContext';
import { calculateDayTotal } from '../../utils/calendarUtils';

// Componente modal para editar datos del día
const DayModal = ({ onClose }) => {
  const { selectedDay, currentMonth, currentYear, updateDayData, resetDayData, dayData } = useCalendar();

  // Obtiene los datos del día seleccionado
  const getCurrentDayData = () => {
    const key = `${currentYear}-${currentMonth}-${selectedDay}`;
    return dayData[key] || {};
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800">
            Día {selectedDay} - {MESES[currentMonth]}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* First Person - Samuel Mathias */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h4 className="text-lg font-bold text-slate-700 mb-3">Samuel Mathias</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg border hover:bg-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={getCurrentDayData().llevada1 || false}
                      onChange={(e) => updateDayData('llevada1', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${getCurrentDayData().llevada1 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {getCurrentDayData().llevada1 && (<span className="text-white text-sm">✓</span>)}
                    </div>
                  </div>
                  <span className="text-slate-700 font-medium">Llevada</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.samuel.llevada.toLocaleString()}</span>
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg border hover:bg-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={getCurrentDayData().traida1 || false}
                      onChange={(e) => updateDayData('traida1', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${getCurrentDayData().traida1 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {getCurrentDayData().traida1 && (<span className="text-white text-sm">✓</span>)}
                    </div>
                  </div>
                  <span className="text-slate-700 font-medium">Traída</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.samuel.traida.toLocaleString()}</span>
              </label>
            </div>
          </div>

          {/* Second Person - Martín Santiago */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h4 className="text-lg font-bold text-slate-700 mb-3">Martín Santiago</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg border hover:bg-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={getCurrentDayData().llevada2 || false}
                      onChange={(e) => updateDayData('llevada2', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${getCurrentDayData().llevada2 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {getCurrentDayData().llevada2 && (<span className="text-white text-sm">✓</span>)}
                    </div>
                  </div>
                  <span className="text-slate-700 font-medium">Llevada</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.martin.llevada.toLocaleString()}</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg border hover:bg-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={getCurrentDayData().traida2 || false}
                      onChange={(e) => updateDayData('traida2', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${getCurrentDayData().traida2 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {getCurrentDayData().traida2 && (<span className="text-white text-sm">✓</span>)}
                    </div>
                  </div>
                  <span className="text-slate-700 font-medium">Traída</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.martin.traida.toLocaleString()}</span>
              </label>
            </div>
          </div>

          {/* Principal Value */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <DollarSign className="inline h-4 w-4 mr-1 text-slate-500" />
              Valor Adicional (Opcional):
            </label>
            <input
              type="number"
              value={getCurrentDayData().valorPrincipal || ''}
              onChange={(e) => updateDayData('valorPrincipal', e.target.value)}
              placeholder="Ej: 1000 o -500"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Day Summary */}
          <div className="border border-slate-300 rounded-xl p-4 bg-slate-100">
            <h5 className="text-lg font-bold text-slate-700 mb-3">Resumen del Día:</h5>
            <div className="space-y-2 text-sm">
              {getCurrentDayData().llevada1 && (<div className="flex justify-between"><span>Samuel - Llevada:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.samuel.llevada.toLocaleString()}</span></div>)}
              {getCurrentDayData().traida1 && (<div className="flex justify-between"><span>Samuel - Traída:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.samuel.traida.toLocaleString()}</span></div>)}
              {getCurrentDayData().llevada2 && (<div className="flex justify-between"><span>Martín - Llevada:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.martin.llevada.toLocaleString()}</span></div>)}
              {getCurrentDayData().traida2 && (<div className="flex justify-between"><span>Martín - Traída:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.martin.traida.toLocaleString()}</span></div>)}
              {getCurrentDayData().valorPrincipal && parseFloat(getCurrentDayData().valorPrincipal) !== 0 && (<div className="flex justify-between"><span>Valor Adicional:</span><span className={`font-semibold ${parseFloat(getCurrentDayData().valorPrincipal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{parseFloat(getCurrentDayData().valorPrincipal) >= 0 ? '+' : ''}${parseFloat(getCurrentDayData().valorPrincipal).toLocaleString()}</span></div>)}
              <hr className="my-2 border-slate-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total del Día:</span>
                <span className="text-teal-600">${calculateDayTotal(getCurrentDayData(), VALORES_FIJOS).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={() => {
                resetDayData();
                onClose();
              }}
              className="flex-1 bg-slate-400 text-white py-3 px-6 rounded-full hover:bg-slate-500 transition-colors flex items-center justify-center space-x-2 shadow-md"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset</span>
            </button>
            <button 
              onClick={onClose} 
              className="flex-1 bg-teal-500 text-white py-3 px-6 rounded-full hover:bg-teal-600 transition-colors shadow-md"
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
