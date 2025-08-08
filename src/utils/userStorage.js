// userStorage.js
// Utilidades para gestionar usuarios en localStorage

const USERS_KEY = 'schoolPlannerUsers';

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUser(username, password) {
  const users = getUsers();
  if (users.find(u => u.username === username)) return false; // usuario ya existe
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function authenticate(username, password) {
  const users = getUsers();
  return users.find(u => u.username === username && u.password === password);
}

export function changePassword(username, newPassword) {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return false;
  user.password = newPassword;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function userExists(username) {
  const users = getUsers();
  return users.some(u => u.username === username);
}

export function resetPassword(username, newPassword) {
  return changePassword(username, newPassword);
}

export function removeUser(username) {
  let users = getUsers();
  users = users.filter(u => u.username !== username);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
