import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setUser, getUser, subscribe } from '../utilities/user';
import styles from './navigation.module.css';
import { Login } from './login';

export const Navigation = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(Object.keys(getUser()).length !== 0);

  useEffect(() => {
    subscribe(() => {
      setIsLoggedIn(Object.keys(getUser()).length !== 0);
      history.push('/topiclist');
    });
  }, [history]);

  const handleClick = () => {
    setUser({});
  };

  if (isLoggedIn) {
    return (
      <nav>
        <ul className={styles.navigation}>
          <li><Link to="/topiclist" className={styles.redLink}>Теме</Link></li>
          <li><Link to={`/profile/${getUser().user_id}`} className={styles.yellowLink}>Профил</Link></li>
          <li><Link to="/userlist" className={styles.greenLink}>Корисници</Link></li>
          <li><Link to="/" onClick={handleClick} className={styles.blueLink}>Одјави се</Link ></li>
        </ul>
      </nav>
    );
  }

  return (
    <Login />
  );

}