import React, { useState } from 'react';
import { X, DollarSign, RotateCcw, Edit } from 'lucide-react';
import { VALORES_FIJOS } from '../utils/constants';
import { meses } from '../utils/dateUtils';
import EditNamesModal from './EditNamesModal';

export const DayModal = ({ 
  selectedDay, 
  currentDate, 
  dayData, 
  onUpdateData, 
  onResetData, 
  onClose, 
  calculateDayTotal 
}) => {
  // Restaurar función updateField
  const updateField = (field, value) => {
    if (field === 'valorPrincipal') {
      if (value === '' || !isNaN(value)) {
        onUpdateData(field, value);
      }
    } else {
      onUpdateData(field, value);
    }
  };
  const currentMonth = currentDate.getMonth();
  // Nombres editables sincronizados con localStorage
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800">
            Día {selectedDay} - {meses[currentMonth]}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Samuel Mathias editable */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-slate-700">{names[0]}</h4>
              <div className="flex items-center gap-2">
                <button onClick={() => { setShowEditNames(true); setEditNameIdx(0); }} className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition" title="Editar nombre">
                  <Edit className="h-5 w-5 text-blue-600" />
                </button>
                <span className="text-xs text-blue-600 font-medium">Escribe el nombre</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg border hover:bg-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={dayData.llevada1 || false}
                      onChange={(e) => updateField('llevada1', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${dayData.llevada1 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {dayData.llevada1 && (<span className="text-white text-sm">✓</span>)}
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
                      checked={dayData.traida1 || false}
                      onChange={(e) => updateField('traida1', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${dayData.traida1 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {dayData.traida1 && (<span className="text-white text-sm">✓</span>)}
                    </div>
                  </div>
                  <span className="text-slate-700 font-medium">Traída</span>
                </div>
                <span className="text-green-600 font-semibold">${VALORES_FIJOS.samuel.traida.toLocaleString()}</span>
              </label>
            </div>
          </div>

          {/* Martín Santiago editable */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-slate-700">{names[1]}</h4>
              <div className="flex items-center gap-2">
                <button onClick={() => { setShowEditNames(true); setEditNameIdx(1); }} className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition" title="Editar nombre">
                  <Edit className="h-5 w-5 text-blue-600" />
                </button>
                <span className="text-xs text-blue-600 font-medium">Escribe el nombre</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-2 bg-white rounded-lg border hover:bg-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={dayData.llevada2 || false}
                      onChange={(e) => updateField('llevada2', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${dayData.llevada2 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {dayData.llevada2 && (<span className="text-white text-sm">✓</span>)}
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
                      checked={dayData.traida2 || false}
                      onChange={(e) => updateField('traida2', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md ${dayData.traida2 ? 'bg-teal-500 border-teal-500' : 'border-slate-300'} flex items-center justify-center transition-colors duration-200`}>
                      {dayData.traida2 && (<span className="text-white text-sm">✓</span>)}
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
              value={dayData.valorPrincipal || ''}
              onChange={(e) => updateField('valorPrincipal', e.target.value)}
              placeholder="Ej: 1000 o -500"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Day Summary */}
          <div className="border border-slate-300 rounded-xl p-4 bg-slate-100">
            <h5 className="text-lg font-bold text-slate-700 mb-3">Resumen del Día:</h5>
            <div className="space-y-2 text-sm">
              {dayData.llevada1 && (<div className="flex justify-between"><span>Samuel - Llevada:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.samuel.llevada.toLocaleString()}</span></div>)}
              {dayData.traida1 && (<div className="flex justify-between"><span>Samuel - Traída:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.samuel.traida.toLocaleString()}</span></div>)}
              {dayData.llevada2 && (<div className="flex justify-between"><span>Martín - Llevada:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.martin.llevada.toLocaleString()}</span></div>)}
              {dayData.traida2 && (<div className="flex justify-between"><span>Martín - Traída:</span><span className="text-green-600 font-semibold">+${VALORES_FIJOS.martin.traida.toLocaleString()}</span></div>)}
              {dayData.valorPrincipal && parseFloat(dayData.valorPrincipal) !== 0 && (<div className="flex justify-between"><span>Valor Adicional:</span><span className={`font-semibold ${parseFloat(dayData.valorPrincipal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{parseFloat(dayData.valorPrincipal) >= 0 ? '+' : ''}${parseFloat(dayData.valorPrincipal).toLocaleString()}</span></div>)}
              <hr className="my-2 border-slate-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total del Día:</span>
                <span className="text-teal-600">${calculateDayTotal(dayData).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button 
              onClick={onResetData} 
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
  );
};
