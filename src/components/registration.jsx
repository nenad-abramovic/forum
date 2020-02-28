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
        if (data.success) {
          setAllUsers(data.users);
        }
      })
  }, []);

  const handleSubmit = (e) => {
    let isValidData = true;
    e.preventDefault();

    if (userData.name.trim() === '') {
      setInfoMessage(prevState => ({
        ...prevState,
        name: 'Унеси име.'
      }));
      isValidData = false;
    }

    if (userData.surname.trim() === '') {
      setInfoMessage(prevState => ({
        ...prevState,
        surname: 'Унеси презиме.'
      }));
      isValidData = false;
    }

    if (userData.username.trim() === '') {
      setInfoMessage(prevState => ({
        ...prevState,
        username: 'Унеси корисничко име.'
      }));
      isValidData = false;
    }

    if (userData.email.trim() === '') {
      setInfoMessage(prevState => ({
        ...prevState,
        email: 'Унеси емаил.'
      }));
      isValidData = false;
    }

    if (userData.password.trim() === '') {
      setInfoMessage(prevState => ({
        ...prevState,
        password: 'Неисправна шифра! Шифра мора садржати једно мало, велико слово и број и имати бар 8 карактера.'
      }));
      isValidData = false;
    }

    if (userData.password !== confirmPassword) {
      setInfoMessage(prevState => ({
        ...prevState,
        confirmPassword: 'Шифре нису исте.'
      }));
      isValidData = false;
    }

    if (isValidData) {
      registerUser(userData)
        .then(data => {
          if (data.success) {
            setUser(data.user);
            history.push('/topiclist');
          }
        });
    }
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
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
      setInfoMessage({
        ...infoMessage,
        password: 'Неисправна шифра! Шифра мора садржати једно мало, велико слово и број и имати бар 8 карактера.'
      });
    } else {
      setInfoMessage({
        ...infoMessage,
        password: ''
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Придружи се</h2>
      <label htmlFor="name">
        Име: <span className={styles.infoMessage}>{infoMessage.name}</span>
      </label>
      <br />
      <input className={styles.input} type="text" id="name" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
      <br />
      <label htmlFor="surname">
        Презиме: <span className={styles.infoMessage}>{infoMessage.surname}</span>
      </label>
      <br />
      <input className={styles.input} type="text" id="surname" value={userData.surname} onChange={e => setUserData({ ...userData, surname: e.target.value })} />
      <br />
      <label htmlFor="username">
        Корисничко име: <span className={styles.infoMessage}>{infoMessage.username}</span>
      </label>
      <br />
      <input className={styles.input} type="text" id="username" value={userData.username} onChange={e => {
        setUserData({ ...userData, username: e.target.value });
        isUsernameTaken(e);
      }} />
      <br />
      <label htmlFor="email">
        Е-маил: <span className={styles.infoMessage}>{infoMessage.email}</span>
      </label>
      <br />
      <input className={styles.input} type="email" id="email" value={userData.email} onChange={e => {
        setUserData({ ...userData, email: e.target.value });
        isEmailTaken(e);
      }} />
      <br />
      <label htmlFor="password">
        Шифра: <span className={styles.infoMessage}>{infoMessage.password}</span>
      </label>
      <br />
      <input className={styles.input} type="password" id="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} onBlur={e => validatePassword(e.target.value.trim())} />
      <br />
      <label htmlFor="confirm-password">
        Понови шифру: <span className={styles.infoMessage}>{infoMessage.confirmPassword}</span>
      </label>
      <br />
      <input className={styles.input} type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value.trim())} />
      <br />
      <input className={styles.button} type="submit" value="Региструј се!" />
    </form>
  );
};

export default Registration;