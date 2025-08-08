import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { clearAllStorage } from '../utils/storage';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export function ClearDataIcon() {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    clearAllStorage();
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
        aria-label="Borrar mis datos"
        title="Borrar mis datos"
      >
        <Trash2 className="h-6 w-6" />
      </button>
      <ConfirmDeleteModal
        open={showModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
