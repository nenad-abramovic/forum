import React from 'react';
import styles from './header.module.css';
import { Navigation } from '../components/navigation';

import { Link } from 'react-router-dom';

export const Header = () => {


  return (
    <header className={styles.header}>
      <h1><Link to="/">Форум</Link></h1>
      <Navigation />
    </header>
  );
}