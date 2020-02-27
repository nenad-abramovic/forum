import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export default () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link to="/registration" className={styles.greenLink}>Региструј се</Link>
      </div>
      <div>
        <label>
          &copy; ненад абрамовић 2020.
      </label>
      </div>
      <div>
        <p className={styles.yellowLink} onClick={() => window.scrollTo(0, 0)}>На врх</p>
      </div>
    </footer>
  );
};