import React from 'react';
import styles from './message.module.css';

export const Message = ({ message }) => {
  const datetime = new Date(message.timestamp);
  
  return (
    <div className={styles.message}>
      <p>{message.username}</p>
      <p>{message.message}</p>
      <p>{datetime.toLocaleString()}</p>
    </div>
  );
}