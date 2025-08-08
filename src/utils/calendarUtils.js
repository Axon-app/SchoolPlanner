import { MESES } from '../context/CalendarContext';

// Funciones para compartir informes

// Función para compartir el informe mensual
export const shareMonthlyReport = (monthlyTotalsData, setClipboardMessage) => {
  let shareText = "Informe Mensual de Control de Ruta\n\n";
  monthlyTotalsData.forEach(item => {
    const [year, month] = item.id.split('-');
    const monthName = MESES[parseInt(month, 10) - 1];
    shareText += `${monthName} ${year}: $${item.total.toLocaleString()}\n`;
  });

  if (navigator.share) {
    navigator.share({
      title: 'Informe Mensual de Control de Ruta',
      text: shareText
    }).catch(error => console.error('Error al compartir', error));
  } else {
    // Fallback para navegadores que no soportan la API de compartir
    navigator.clipboard.writeText(shareText)
      .then(() => setClipboardMessage('Informe copiado al portapapeles. ¡Ahora puedes pegarlo!'))
      .catch(error => setClipboardMessage('Error al copiar el informe. Por favor, inténtalo de nuevo.'));
    setTimeout(() => setClipboardMessage(''), 5000); // Borra el mensaje después de 5 segundos
  }
};

// Función para calcular el total de un día
export const calculateDayTotal = (data, valoresFijos) => {
  let total = 0;
  if (data.llevada1) total += (data.valorLlevada1 !== undefined ? Number(data.valorLlevada1) : valoresFijos.samuel.llevada);
  if (data.traida1) total += (data.valorTraida1 !== undefined ? Number(data.valorTraida1) : valoresFijos.samuel.traida);
  if (data.llevada2) total += (data.valorLlevada2 !== undefined ? Number(data.valorLlevada2) : valoresFijos.martin.llevada);
  if (data.traida2) total += (data.valorTraida2 !== undefined ? Number(data.valorTraida2) : valoresFijos.martin.traida);
  if (data.valorPrincipal) {
    total += parseFloat(data.valorPrincipal);
  }
  return total;
};

// Función para determinar el color de un día en el calendario
export const getDayColor = (day, dayData, currentYear, currentMonth) => {
  const key = `${currentYear}-${currentMonth}-${day}`;
  const data = dayData[key];
  
  if (data) {
    const allChecked = data.llevada1 && data.traida1 && data.llevada2 && data.traida2;
    const someChecked = data.llevada1 || data.traida1 || data.llevada2 || data.traida2;
    const hasValue = data.valorPrincipal && parseFloat(data.valorPrincipal) !== 0;
    
    if (allChecked) {
      return 'bg-teal-500 text-white';
    } else if (someChecked || hasValue) {
      return 'bg-amber-400 text-white';
    } else if (data.valorPrincipal !== undefined) {
      return 'bg-indigo-400 text-white';
    }
  }
  return 'bg-slate-200 hover:bg-slate-300';
};
