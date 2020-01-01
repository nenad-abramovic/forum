import React from 'react';
import styles from './message.module.css';

export const Message = ({ message }) => {
  const datetime = new Date(message.timestamp);
  
  return (
    <div className={styles.message}>
      <p>{message.username.toString()}</p>
      <p>{message.message.toString()}</p>
      <p>{datetime.toLocaleString()}</p>
    </div>
  );
}