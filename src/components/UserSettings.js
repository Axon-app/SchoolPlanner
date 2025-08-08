import React from 'react';
import { clearAllStorage } from '../utils/storage';

export function UserSettings() {
  const handleClearData = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todos tus datos? Esta acción no se puede deshacer.')) {
      clearAllStorage();
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleClearData}
        className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 font-semibold"
      >
        Borrar mis datos
      </button>
    </div>
  );
}
