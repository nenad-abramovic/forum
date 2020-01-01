let userData = window.localStorage.getItem('user');

let user = (userData === null) ? {} : JSON.parse(userData);

export const getUser = () => {
  return user;
};

export const setUser = (userData) => {
  user = userData;
  window.localStorage.setItem('user', JSON.stringify(user));
};