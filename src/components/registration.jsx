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
        if(data.success === true) {
          setAllUsers(data.users);
        }
      })
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (!validatePassword(userData.password)) {
      return setInfoMessage('Invalid Password! You must use at least one number, one uppercase and one lowercase letter.');
    }
    if(userData.password !== confirmPassword) {
      return setInfoMessage('Password was not confirmed.');
    }

    registerUser(userData)
      .then(data => {
        if(data.success === true) {
          setUser(data.user);
          history.push('/topiclist');
        }
      })
  };

  const isUsernameTaken = (e) => {
    let user = allUsers.find(({ username }) => username === e.target.value.trim());
    if(user !== undefined) {
      return setInfoMessage('Username is already taken!');
    }
    setInfoMessage('');
  }

  const isEmailTaken = (e) => {
    let user = allUsers.find(({ email }) => email === e.target.value.trim());
    if(user !== undefined) {
      return setInfoMessage('E-mail is already taken!');
    }
    setInfoMessage('');
  }

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  };

  return (
    <form className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Register</legend>
      <p className={styles.infoMessage}>{infoMessage}</p>
      <label htmlFor="name">Name:</label>
      <br />
      <input className={styles.input} type="text" id="name" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} placeholder="Enter name" required />
      <br />
      <label htmlFor="surname">Surname:</label>
      <br />
      <input className={styles.input} type="text" id="surname" value={userData.surname} onChange={e => setUserData({ ...userData, surname: e.target.value })} placeholder="Enter surname" required />
      <br />
      <label htmlFor="username">Username:</label>
      <br />
      <input className={styles.input} type="text" id="username" value={userData.username} onChange={e => {
        setUserData({ ...userData, username: e.target.value });
        isUsernameTaken(e);
        }} placeholder="Enter username" required />
      <br />
      <label htmlFor="email">E-mail:</label>
      <br />
      <input className={styles.input} type="email" id="email" value={userData.email} onChange={e => {
        setUserData({ ...userData, email: e.target.value });
        isEmailTaken(e);
        }} placeholder="Enter your email" required />
      <br />
      <label htmlFor="password">Password:</label>
      <br />
      <input className={styles.input} type="password" id="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder="Enter password" required />
      <br />
      <label htmlFor="confirm-password">Confirm passowrd:</label>
      <br />
      <input className={styles.input} type="password" id="confirm-password" placeholder="Enter same password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value.trim())} required />
      <br />
      <input className={styles.inputBtn} type="submit" value="Register" onClick={handleClick} />
      </fieldset>
    </form>
  );
}