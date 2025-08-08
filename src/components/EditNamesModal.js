import React, { useState } from 'react';


export default function EditNamesModal({ open, names, onSave, onDelete, onClose }) {
  // Solo se edita un nombre a la vez (names siempre será un array de 1 elemento)
  const [localName, setLocalName] = useState(names[0] || "");

  // Actualiza el nombre local
  const handleChange = (value) => {
    setLocalName(value);
  };

  // Guardar el nombre editado
  const handleSave = () => {
    onSave([localName]);
    onClose();
  };


  // Borrar el nombre y actualizar en el padre
  const handleDelete = () => {
    setLocalName("");
  };

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs border-2 border-blue-400">
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Editar Nombre</h2>
        <div className="mb-4 w-full">
          <input
            type="text"
            value={localName}
            onChange={e => handleChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`Nombre`}
          />
          <button
            onClick={handleDelete}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Borrar
          </button>
        </div>
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
