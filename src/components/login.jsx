import React, { useState } from 'react';
import { loginUser } from '../utilities/services';
import { setUser } from '../utilities/user';

export const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if(username === '' || password === '') {
      return setInfoMessage('Username or password can\'t be empty!');
    }
    loginUser({username, password})
      .then(data => {
        if(data.success === true){
          setUser(data.user);
          history.push('/topiclist');
          setInfoMessage('');
        }
      })
      .catch(error => setInfoMessage(error.toString()));
  }

  return (
    <form>
      <h2>Login</h2>
      <p>{infoMessage}</p>
      <label htmlFor="login-username">Username:</label>
      <input type="text" id="login-username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} onBlur={e => setUsername(e.target.value.trim())} />
      <label htmlFor="login-password">Password:</label>
      <input type="password" id="login-password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onBlur={e => setPassword(e.target.value.trim())} />
      <input type="submit" value="Log In" onClick={handleClick} />
    </form>
  );
}