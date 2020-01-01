import React, { useState } from 'react';
import styles from './registration.module.css';

export const Registration = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
  });
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.stopPropagation();
    if (!validatePassword(userData.password)) {
      return setInfoMessage('Invalid Password! You must use at least one number, one uppercase and on lowercase letter.');
    }
  };

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  };

  return (
    <form className={styles.form}>
      <h2>Register</h2>
      <p className={styles.infoMessage}>{infoMessage}</p>
      <label htmlFor="name">Name:</label>
      <br />
      <input className={styles.input} type="text" id="name" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} placeholder="Enter name" required />
      <br />
      <label htmlFor="surnam">Surname:</label>
      <br />
      <input className={styles.input} type="text" id="surname" value={userData.surname} onChange={e => setUserData({ ...userData, surname: e.target.value })} placeholder="Enter surname" required />
      <br />
      <label htmlFor="username">Username:</label>
      <br />
      <input className={styles.input} type="text" id="username" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder="Enter username" required />
      <br />
      <label htmlFor="email">E-mail:</label>
      <br />
      <input className={styles.input} type="email" id="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder="Enter your email" required />
      <br />
      <label htmlFor="password">Password:</label>
      <br />
      <input className={styles.input} type="password" id="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder="Enter password" required />
      <br />
      <label htmlFor="confirm-password">Confirm passowrd:</label>
      <br />
      <input className={styles.input} type="password" id="confirm-password" placeholder="Enter same password" pattern={userData.password} required />
      <br />
      <input className={styles.inputBtn} type="submit" value="Register" onClick={handleClick} />
    </form>
  );
}