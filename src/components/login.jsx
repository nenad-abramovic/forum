import React, { useState } from 'react';
import { loginUser } from '../utilities/services';
import { setUser } from '../utilities/user';
import styles from './login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (username === '' && password === '') {
      return setInfoMessage('Унеси корисничко име и шифру.');
    }
    if (username === '') {
      return setInfoMessage('Унеси корисничко име.');
    }
    if (password === '') {
      return setInfoMessage('Унеси шифру.');
    }
    loginUser({ username, password })
      .then(data => {
        if (data.success === true) {
          setUser(data.user);
          setInfoMessage('');
        } else {
          setInfoMessage('Погрешно корисничко име или шифра')
        }
      })
      .catch(error => setInfoMessage(`ГРЕШКА: ${error.toString()}`));
  }

  return (
    <form className={styles.form}>

      <div className={styles.container}>
        <div>
          <label htmlFor="login-username"></label>
          <input type="text" className={styles.input} id="login-username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} onBlur={e => setUsername(e.target.value.trim())} />
        </div>
        <div>
          <label htmlFor="login-password"></label>
          <input type="password" className={styles.input} id="login-password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onBlur={e => setPassword(e.target.value.trim())} />
        </div>
        <input type="submit" className={styles.button} value="Пријави се" onClick={handleClick} />
      </div>
      <p className={styles.infoMessage}>{infoMessage}</p>
    </form>
  );
};

export default Login;