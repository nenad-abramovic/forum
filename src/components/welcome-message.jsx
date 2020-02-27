import React from 'react';
import styles from './welcome-message.module.css';

const WelcomeMessage = () => {
  return (
    <div className={styles.container}>
      <h1>
        Форум
        {/* <span className={styles.redLine}>Ф</span>
        <span className={styles.yellowLine}>о</span>
        <span className={styles.greenLine}>р</span>
        <span className={styles.redLine}>у</span>
        <span className={styles.blueLine}>м</span> */}
      </h1>
      <br />
      <p className={styles.redLine}>Добродош'о на форум.</p>
      <p className={styles.yellowLine}>Овде можеш наћи разне теме.</p>
      <p className={styles.greenLine}>Оне које те интересују и оне друге.</p>
      <p className={styles.redLine}>Укључи се у расправу.</p>
      <p className={styles.blueLine}>Сазнај нешто ново и прошири видике.</p>
      <p className={styles.yellowLine}>Региструј се бесплатно.</p>
    </div>
  );
};

export default WelcomeMessage;