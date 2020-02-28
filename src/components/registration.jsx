import React, { useState, useEffect } from 'react';
import styles from './registration.module.css';
import { registerUser, getAllUsers } from '../utilities/services';
import { setUser } from '../utilities/user';
import { useHistory } from 'react-router-dom';

const Registration = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(data => {
        if (data.success === true) {
          setAllUsers(data.users);
        }
      })
  }, []);

  const handleSubmit = (e) => {
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
      return setInfoMessage({
        ...infoMessage,
        username: 'Корисничко име је заузето!'
      });
    }
    setInfoMessage({
      ...infoMessage,
      username: ''
    });
  }

  const isEmailTaken = (e) => {
    let user = allUsers.find(({ email }) => email === e.target.value.trim());
    if (user !== undefined) {
      return setInfoMessage({
        ...infoMessage,
        email: 'Е-маил је већ у употреби!'
      });
    }
    setInfoMessage({
      ...infoMessage,
      email: ''
    });
  }

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Придружи се</h2>
      <label htmlFor="name" className={styles.redLabel}>
        Име:
        <span className={styles.infoMessage}>{'\n' + infoMessage.name}</span>
      </label>
      <br />
      <input className={styles.input} type="text" id="name" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} required />
      <br />
      <label htmlFor="surname" className={styles.label}>
        Презиме:
        <span className={styles.infoMessage}>{infoMessage.surname}</span>
      </label>
      <br />
      <input className={styles.input} type="text" id="surname" value={userData.surname} onChange={e => setUserData({ ...userData, surname: e.target.value })} required />
      <br />
      <label htmlFor="username" className={styles.label}>
        Корисничко име:{" "}
        <span className={styles.infoMessage}>{infoMessage.username}</span>
      </label>
      <br />
      <input className={styles.input} type="text" id="username" value={userData.username} onChange={e => {
        setUserData({ ...userData, username: e.target.value });
        isUsernameTaken(e);
      }} required />
      <br />
      <label htmlFor="email" className={styles.label}>
        Е-маил:
        <span className={styles.infoMessage}>{infoMessage.email}</span>
      </label>
      <br />
      <input className={styles.input} type="email" id="email" value={userData.email} onChange={e => {
        setUserData({ ...userData, email: e.target.value });
        isEmailTaken(e);
      }} required />
      <br />
      <label htmlFor="password" className={styles.label}>
        Шифра:
        <span className={styles.infoMessage}>{infoMessage.password}</span>
      </label>
      <br />
      <input className={styles.input} type="password" id="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} required />
      <br />
      <label htmlFor="confirm-password" className={styles.label}>
        Понови шифру:
        <span className={styles.infoMessage}>{infoMessage.confirmPassword}</span>
      </label>
      <br />
      <input className={styles.input} type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value.trim())} required />
      <br />
      <input className={styles.button} type="submit" value="Региструј се!" />
    </form>
  );
};

export default Registration;