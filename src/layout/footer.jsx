import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="col-2 col-s-2">
      <Link to="/registration" className={styles.register}>Register</Link>
      </div>
      <div className="col-8 col-s-8">
      <label>
        &copy; nenad abramovic 2020.
      </label>
      </div>
      <div className="col-2 col-s-2">
      <p className={styles.toTop} onClick={() => window.scrollTo(0, 0)}>To Top</p>
      </div>
    </footer>
  );
}