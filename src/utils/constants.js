// Constants for the application

export const CREDENTIALS = {
  USERNAME_ENCODED: btoa('admin'),
  PASSWORD_ENCODED: btoa('temporal123')
};

export const VALORES_FIJOS = {
  samuel: { llevada: 3000, traida: 3000 },
  martin: { llevada: 2500, traida: 2500 }
};

export const ALARM_SOUND_DATA = "data:audio/wav;base64,UklGRl9QDwBXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSAcDwAAAAAAAAAAAA==";

export const NOTIFICATION_MESSAGES = {
  SAMUEL_DEPARTURE: 'Alarma de Salida: Samuel - Es hora de tu salida de la ruta.',
  SAMUEL_ARRIVAL: 'Alarma de Llegada: Samuel - Es hora de tu llegada a la ruta.',
  MARTIN_DEPARTURE: 'Alarma de Salida: Martín - Es hora de tu salida de la ruta.',
  MARTIN_ARRIVAL: 'Alarma de Llegada: Martín - Es hora de tu llegada a la ruta.'
};
