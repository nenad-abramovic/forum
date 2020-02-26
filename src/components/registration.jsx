import React, { useState, useEffect } from 'react';
import styles from './registration.module.css';
import { registerUser, getAllUsers } from '../utilities/services';
import { setUser } from '../utilities/user';

export const Registration = ({ history }) => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(data => {
        if (data.success === true) {
          setAllUsers(data.users);
        }
      })
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (!validatePassword(userData.password)) {
      return setInfoMessage('Invalid Password! You must use at least one number, one uppercase and one lowercase letter.');
    }
    if (userData.password !== confirmPassword) {
      return setInfoMessage('Password was not confirmed.');
    }

    registerUser(userData)
      .then(data => {
        if (data.success === true) {
          setUser(data.user);
          history.push('/topiclist');
        }
      })
  };

  const isUsernameTaken = (e) => {
    let user = allUsers.find(({ username }) => username === e.target.value.trim());
    if (user !== undefined) {
      return setInfoMessage('Username is already taken!');
    }
    setInfoMessage('');
  }

  const isEmailTaken = (e) => {
    let user = allUsers.find(({ email }) => email === e.target.value.trim());
    if (user !== undefined) {
      return setInfoMessage('E-mail is already taken!');
    }
    setInfoMessage('');
  }

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  };

  return (
    <form className={styles.form}>
      <h2>Регистрација</h2>
      <p className={styles.infoMessage}>{infoMessage}</p>
      <label htmlFor="name" className={styles.redLabel}>Име:</label>
      <br />
      <input className={styles.redInput} type="text" id="name" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} required />
      <br />
      <label htmlFor="surname" className={styles.yellowLabel}>Презиме:</label>
      <br />
      <input className={styles.yellowInput} type="text" id="surname" value={userData.surname} onChange={e => setUserData({ ...userData, surname: e.target.value })} required />
      <br />
      <label htmlFor="username" className={styles.blueLabel}>Корисничко име:</label>
      <br />
      <input className={styles.blueInput} type="text" id="username" value={userData.username} onChange={e => {
        setUserData({ ...userData, username: e.target.value });
        isUsernameTaken(e);
      }} required />
      <br />
      <label htmlFor="email" className={styles.redLabel}>Е-маил:</label>
      <br />
      <input className={styles.redInput} type="email" id="email" value={userData.email} onChange={e => {
        setUserData({ ...userData, email: e.target.value });
        isEmailTaken(e);
      }} required />
      <br />
      <label htmlFor="password" className={styles.blueLabel}>Шифра:</label>
      <br />
      <input className={styles.blueInput} type="password" id="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} required />
      <br />
      <label htmlFor="confirm-password" className={styles.yellowLabel}>Понови шифру:</label>
      <br />
      <input className={styles.yellowInput} type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value.trim())} required />
      <br />
      <input className={styles.greenInput} type="submit" value="Региструј се!" onClick={handleClick} />
    </form>
  );
}