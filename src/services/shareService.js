import { meses } from '../utils/dateUtils';

export const shareService = {
  shareMonthlyReport: (monthlyTotalsData, setClipboardMessage) => {
    let shareText = "Informe Mensual de Control de Ruta\n\n";
    monthlyTotalsData.forEach(item => {
      const [year, month] = item.id.split('-');
      const monthName = meses[parseInt(month, 10) - 1];
      shareText += `${monthName} ${year}: $${item.total.toLocaleString()}\n`;
    });

    if (navigator.share) {
      navigator.share({
        title: 'Informe Mensual de Control de Ruta',
        text: shareText
      }).catch(error => console.error('Error al compartir', error));
    } else {
      // Fallback for browsers that don't support the share API
      navigator.clipboard.writeText(shareText)
        .then(() => setClipboardMessage('Informe copiado al portapapeles. ¡Ahora puedes pegarlo!'))
        .catch(error => setClipboardMessage('Error al copiar el informe. Por favor, inténtalo de nuevo.'));
      
      setTimeout(() => setClipboardMessage(''), 5000);
    }
  }
};
