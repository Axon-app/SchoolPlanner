import React from 'react';
import { CalendarioControlRuta } from './components/CalendarioControlRuta';

function App() {
  // Mostrar el splash modal antes del contenido principal
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSplash && (
        <>
          <img src="/logoCalen.png" alt="Logo" className="fixed inset-0 m-auto w-32 h-32 animate-bounce z-50 bg-white rounded-full" />
          <div className="fixed inset-0 bg-white opacity-90 z-40" />
        </>
      )}
      {!showSplash && <CalendarioControlRuta />}
    </div>
  );
}

export default App;
