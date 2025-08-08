import React from 'react';
import { CalendarioControlRuta } from './components/CalendarioControlRuta';
import { UserSettings } from './components/UserSettings';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs animate-fadeIn">
        <img src={process.env.PUBLIC_URL + "/images/logoCalen192.png"} alt="Logo" className="w-16 h-16 mb-4 drop-shadow-lg" />
        <span className="mb-4 text-xl font-bold text-slate-800 text-center">¿Deseas instalar la aplicación?</span>
        <div className="flex gap-4 w-full justify-center">
          <button onClick={handleInstall} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Instalar</button>
          <button onClick={handleCancel} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  // Mostrar el splash modal antes del contenido principal
  const [showSplash, setShowSplash] = React.useState(true);
  const [isInstalled, setIsInstalled] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    // Detectar si la app está instalada
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
    };
    checkInstalled();
    window.addEventListener('appinstalled', () => setIsInstalled(true));
    return () => window.removeEventListener('appinstalled', () => setIsInstalled(true));
  }, []);

  return (
    <div className="App">
      {showSplash && (
        <>
          <img src={process.env.PUBLIC_URL + "/logoCalen.png"} alt="Logo" className="fixed inset-0 m-auto w-32 h-32 animate-bounce z-50 bg-white rounded-full" />
          <div className="fixed inset-0 bg-white opacity-90 z-40" />
        </>
      )}
      {!showSplash && (
        <>
          {/* Modal de instalación personalizado para todos los dispositivos */}
          {!isInstalled && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xs animate-fadeIn">
                <img src={process.env.PUBLIC_URL + "/images/logoCalen192.png"} alt="Logo" className="w-16 h-16 mb-4 drop-shadow-lg" />
                <span className="mb-2 text-xl font-bold text-slate-800 text-center">¡Bienvenido a School Planner!</span>
                <span className="mb-4 text-sm text-slate-700 text-center">¿Quieres instalar la aplicación para acceder más rápido y sin navegador?</span>
                <span className="mb-4 text-xs text-indigo-700 bg-indigo-100 rounded px-2 py-1 block">
                  Pulsa <b>Instalar</b> para agregar la app a tu pantalla de inicio.<br />
                  Si no ves el botón, usa el menú de tu navegador y selecciona "Instalar app".<br />
                </span>
                <div className="flex gap-4 w-full justify-center">
                  <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Instalar</button>
                  <button onClick={() => document.querySelector('.App').removeChild(document.querySelector('.fixed.inset-0.z-50'))} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Cancelar</button>
                </div>
              </div>
            </div>
          )}
          <CalendarioControlRuta />
        </>
      )}
    </div>
  );
}

export default App;
