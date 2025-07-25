// utils/auth.js
export function getLoggedInUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
