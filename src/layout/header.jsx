import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { UserNavigation } from '../components/user-navigation';
import { GuestNavigation } from '../components/guest-navigation';
import { getUser } from '../utilities/user';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Object.keys(getUser()).length !== 0
  );

  useEffect(() => {
    let i = setInterval(
      () => setIsLoggedIn(Object.keys(getUser()).length !== 0),
      500);

    return clearInterval(i);
  }, []);

  return (
    <header id="top" className={styles.header}>
      <div className="col-s-8 col-8">
      <h1>Forum</h1>
      </div>
      <div className="col-s-4 col-4">
      {
        isLoggedIn ? <UserNavigation /> : <GuestNavigation />
      }
      </div>
    </header>
  );
}