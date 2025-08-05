import React, { useState } from 'react';
import { X, List, Share2 } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';
import { shareMonthlyReport } from '../../utils/calendarUtils';

// Componente modal para ver el historial de totales mensuales
const HistoryModal = ({ onClose }) => {
  const { monthlyTotalsData, MESES } = useCalendar();
  const [clipboardMessage, setClipboardMessage] = useState('');

  const handleShareReport = () => {
    shareMonthlyReport(monthlyTotalsData, setClipboardMessage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <List className="h-6 w-6 text-blue-600" />
            <span>Historial Mensual</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-3 mb-6">
          {monthlyTotalsData.length > 0 ? (
            monthlyTotalsData.map((item) => {
              const [year, month] = item.id.split('-');
              const monthName = MESES[parseInt(month, 10) - 1];
              return (
                <div key={item.id} className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                  <span className="text-gray-700 font-medium">{monthName} {year}</span>
                  <span className="text-lg font-bold text-blue-600">${item.total.toLocaleString()}</span>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-center py-8">No hay totales guardados aún.</div>
          )}
        </div>
        
        <button
          onClick={handleShareReport}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Share2 className="h-5 w-5" />
          <span>Compartir Informe</span>
        </button>
        
        {clipboardMessage && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm py-2 px-4 rounded-lg shadow-lg">
            {clipboardMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
