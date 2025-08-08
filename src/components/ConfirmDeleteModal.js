import React from 'react';

export default function ConfirmDeleteModal({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900/70 via-slate-700/60 to-teal-400/40 animate-fadeIn">
      <div className="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs border-2 border-red-400"
        style={{
          background: 'linear-gradient(135deg, #232b3e 0%, #2d3748 60%, #38b2ac 100%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
          border: '2px solid #f87171'
        }}>
        <div className="flex items-center justify-center mb-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 shadow-lg">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v2H8V4a1 1 0 011-1zm-3 5h10" /></svg>
          </span>
        </div>
  <h2 className="text-xl font-bold mb-2 text-center" style={{color: '#ef4444'}}>¿Estás seguro de borrar todos tus datos?</h2>
  <p className="text-sm mb-6 text-center" style={{color: '#fff'}}>Esta acción no se puede deshacer.</p>
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Borrar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
