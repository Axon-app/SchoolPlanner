import { meses } from '../utils/dateUtils';

export const shareService = {
  shareMonthlyReport: (monthlyTotalsData, setClipboardMessage) => {
    if (!monthlyTotalsData || monthlyTotalsData.length === 0) {
      setClipboardMessage('No hay datos para compartir.');
      setTimeout(() => setClipboardMessage(''), 5000);
      return;
    }
    
    // Determinar título según la cantidad de meses a compartir
    const isSingleMonth = monthlyTotalsData.length === 1;
    
    // Crear el texto del informe
    let shareText = isSingleMonth 
      ? "Informe Mensual de Control de Ruta\n\n" 
      : "Informe Mensual de Control de Ruta (Todos los meses)\n\n";
    
    // Asegurar que los meses están ordenados correctamente (más recientes primero)
    const sortedData = [...monthlyTotalsData].sort((a, b) => b.id.localeCompare(a.id));
    
    sortedData.forEach(item => {
      const [year, month] = item.id.split('-');
      // Ajustar el índice del mes según corresponda
      const monthIndex = parseInt(month, 10);
      const monthName = meses[monthIndex];
      shareText += `${monthName} ${year}: $${item.total.toLocaleString()}\n`;
    });

    if (navigator.share) {
      const title = isSingleMonth 
        ? `Informe de ${meses[parseInt(sortedData[0].id.split('-')[1], 10)]} ${sortedData[0].id.split('-')[0]}`
        : 'Informe Mensual de Control de Ruta';
        
      navigator.share({
        title: title,
        text: shareText
      }).catch(error => {
        console.error('Error al compartir', error);
        setClipboardMessage('Error al compartir el informe. Por favor, inténtalo de nuevo.');
      });
    } else {
      // Fallback for browsers that don't support the share API
      navigator.clipboard.writeText(shareText)
        .then(() => {
          const message = isSingleMonth 
            ? 'Informe del mes copiado al portapapeles. ¡Ahora puedes pegarlo!' 
            : 'Informe completo copiado al portapapeles. ¡Ahora puedes pegarlo!';
          setClipboardMessage(message);
        })
        .catch(error => setClipboardMessage('Error al copiar el informe. Por favor, inténtalo de nuevo.'));
      
      setTimeout(() => setClipboardMessage(''), 5000);
    }
  }
};
