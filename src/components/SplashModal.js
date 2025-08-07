import React, { useEffect, useState } from 'react';

export default function SplashModal({ logoSrc }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800); // 1.8 segundos
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <img src={logoSrc} alt="Logo" className="w-32 h-32 animate-bounce" />
    </div>
  );
}
