import React, { useState } from 'react';
import { loginUser } from '../utilities/services';
import { setUser } from '../utilities/user';

export const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    loginUser({username, password})
      .then(data => {
        if(data.success === true){
          setUser(data.user);
          history.push('/');
        }
      })
      .catch(error => setInfoMessage(error));
  }

  return (
    <form>
      <h2>Login</h2>
      <p>{infoMessage}</p>
      <label htmlFor="login-username">Username:</label>
      <input type="text" id="login-username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      <label htmlFor="login-password">Password:</label>
      <input type="password" id="login-password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="submit" value="Log In" onClick={handleClick} />
    </form>
  );
}