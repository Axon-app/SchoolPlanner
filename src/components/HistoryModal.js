import React, { useState } from 'react';
import { X, List, Share2 } from 'lucide-react';
import { meses } from '../utils/dateUtils';

export const HistoryModal = ({ onClose, monthlyTotalsData, onShareReport }) => {
  const [clipboardMessage, setClipboardMessage] = useState('');

  const handleShare = () => {
    onShareReport(setClipboardMessage, sortedData);
  };

  // Ordenar los datos por fecha, más recientes primero
  const sortedData = [...monthlyTotalsData].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <List className="h-6 w-6 text-indigo-600" />
            <span>Historial Mensual</span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <ul className="space-y-3 mb-4">
          {sortedData.length > 0 ? (
            sortedData.map((item) => {
              const [year, month] = item.id.split('-');
              const monthIndex = parseInt(month, 10);
              const monthName = meses[monthIndex];
              return (
                <li key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-200">
                  <span className="font-medium text-slate-700">{monthName} {year}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-indigo-600">${item.total.toLocaleString()}</span>
                    <button 
                      onClick={() => onShareReport(setClipboardMessage, [item])} 
                      className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
                      title={`Compartir ${monthName} ${year}`}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="text-slate-500 text-center py-4">No hay totales guardados aún.</li>
          )}
        </ul>
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          <Share2 className="h-5 w-5" />
          <span>Compartir Todos los Meses</span>
        </button>
        {clipboardMessage && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm py-2 px-4 rounded-full shadow-lg transition-opacity duration-300 animate-fade-in">
            {clipboardMessage}
          </div>
        )}
      </div>
    </div>
  );
};
