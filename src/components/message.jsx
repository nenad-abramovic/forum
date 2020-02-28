import React from 'react';
import styles from './message.module.css';
import { Link } from 'react-router-dom';

const Message = ({ message }) => {
  const datetime = new Date(message.timestamp);

  return (
    <div className={styles.message}>
      <p className={styles.info}>
        На дан
        {datetime.toLocaleDateString('sr-rs', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        у
        {datetime.toLocaleTimeString('sr-rs')},
        <Link to={`/profile/${message.user_id}`}>
          {message.username.toString()}
        </Link>
        је написао:
      </p>
      <br />
      <p>{message.message.toString()}</p>
    </div>
  );
};

export default Message;