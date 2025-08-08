import React from 'react';
import { CalendarioControlRuta } from './components/CalendarioControlRuta';

// Componente para el botón de instalación PWA
function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [showInstall, setShowInstall] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setShowInstall(false);
      setDeferredPrompt(null);
    }
  };

  const handleCancel = () => {
    setShowInstall(false);
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      <span className="mb-2 text-lg font-semibold">¿Deseas instalar la aplicación?</span>
      <div className="flex gap-4">
        <button onClick={handleInstall} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Instalar</button>
        <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
      </div>
    </div>
  );
}

function App() {
  // Mostrar el splash modal antes del contenido principal
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
  <InstallPWAButton />
      {showSplash && (
        <>
          <img src={process.env.PUBLIC_URL + "/logoCalen.png"} alt="Logo" className="fixed inset-0 m-auto w-32 h-32 animate-bounce z-50 bg-white rounded-full" />
          <div className="fixed inset-0 bg-white opacity-90 z-40" />
        </>
      )}
      {!showSplash && <CalendarioControlRuta />}
    </div>
  );
}

export default App;
