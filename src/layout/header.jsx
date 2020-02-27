import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import Navigation from '../components/navigation';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1><Link to="/" className={styles.title}>Форум</Link></h1>
      <Navigation />
    </header>
  );
};

export default Header;