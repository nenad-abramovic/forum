import React from 'react';
import styles from './message.module.css';
import { Link } from 'react-router-dom';

const Message = ({ message }) => {
  const datetime = new Date(message.timestamp);

  return (
    <div className={styles.message}>
      <p className={styles.info}>На дан <span className={styles.redSpan}>{datetime.toLocaleDateString()}</span> у <span className={styles.yellowSpan}>{datetime.toLocaleTimeString()}</span>, <Link to={`/profile/${123}`} className={styles.greenSpan}>{message.username.toString()}</Link> је написао:</p>
      <br />
      <p>{message.message.toString()}</p>
      <hr />
    </div>
  );
};

export default Message;