import React from 'react';
import styles from './welcome-message.module.css';

const WelcomeMessage = () => {
  return (
    <div className={styles.container}>
      <h1>
        Форум
      </h1>
      <br />
      <p className={styles.text}>Добродош'о на форум.</p>
      <p className={styles.text}>Овде можеш наћи разне теме.</p>
      <p className={styles.text}>Оне које те интересују и оне друге.</p>
      <p className={styles.text}>Укључи се у расправу.</p>
      <p className={styles.text}>Сазнај нешто ново и прошири видике.</p>
      <p className={styles.text}>Региструј се бесплатно.</p>
    </div>
  );
};

export default WelcomeMessage;