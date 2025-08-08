import React, { useState } from 'react';

export default function EditNamesModal({ open, names, onSave, onDelete, onClose }) {
  const [localNames, setLocalNames] = useState(names);

  const handleChange = (idx, value) => {
    const updated = [...localNames];
    updated[idx] = value;
    setLocalNames(updated);
  };

  const handleSave = () => {
    onSave(localNames);
    onClose();
  };

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs border-2 border-blue-400">
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Editar Nombres</h2>
        {localNames.map((name, idx) => (
          <div key={idx} className="mb-4 w-full">
            <input
              type="text"
              value={name}
              onChange={e => handleChange(idx, e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Nombre ${idx + 1}`}
            />
            <button
              onClick={() => {
                const updated = [...localNames];
                updated[idx] = '';
                setLocalNames(updated);
                onDelete(idx);
              }}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Borrar
            </button>
          </div>
        ))}
        <div className="flex gap-4 w-full justify-center mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
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
