// Date utility functions

export const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
};

export const getCurrentTimeString = () => {
  return new Date().toTimeString().slice(0, 5);
};

export const createDateKey = (year, month, day) => {
  return `${year}-${month}-${day}`;
};

export const createMonthKey = (year, month) => {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
};
