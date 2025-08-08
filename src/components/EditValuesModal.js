import React, { useState } from 'react';

export default function EditValuesModal({ open, value, type, onSave, onReset, onClose }) {
  // Estado local para el valor (convertido a string)
  const [localValue, setLocalValue] = useState(value !== undefined ? value.toString() : '');

  // Actualiza el valor local
  const handleChange = (value) => {
    // Solo permitir números (dígitos) o cadena vacía
    if (value === '' || /^\d*$/.test(value)) {
      setLocalValue(value);
    }
  };

  // Guardar el valor editado
  const handleSave = () => {
    // Si el valor está vacío, guardamos 0
    if (localValue === '') {
      onSave(0);
    } else {
      // Convertir el valor a número antes de guardarlo
      onSave(parseInt(localValue, 10));
    }
    onClose();
  };

  // Limpiar el input (establecer valor vacío)
  const handleReset = () => {
    setLocalValue('');
    // No cerramos el modal para permitir al usuario guardar explícitamente
  };

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs border-2 border-teal-400">
        <h2 className="text-base font-bold text-teal-700 mb-4 text-center">Editar Valor de {type}</h2>
        <div className="mb-4 w-full">
          <div className="flex items-center mb-2">
            <span className="text-teal-600 text-lg mr-2">$</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={localValue}
              onChange={e => handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Valor"
            />
          </div>
          <button
            onClick={handleReset}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center"
            type="button"
          >
            <span>Borrar</span>
          </button>
        </div>
        <div className="flex gap-4 w-full justify-center mt-4">
          <button
            onClick={handleSave}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-teal-700 transition"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
