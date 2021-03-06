import React, { useState } from 'react';
import { sendMessage } from '../utilities/services';
import { getUser } from '../utilities/user';
import styles from './new-message.module.css';

const NewMessage = ({ topic_id, setClick }) => {
  const [message, setMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(getUser().username, topic_id, message)
        .then(data => {
          if (data.success === true) {
            setMessage('');
            setInfoMessage('Порука је успешно послата.');
            setClick(new Date());
          }
        });
    } else {
      setInfoMessage('Напиши поруку.')
    }
  };

  return (
    <form className={styles.form}>
      <h3>Одговори</h3>
      <div className={styles.container}>
        <label htmlFor="message"></label>
        <input type="text" className={styles.input} placeholder="Унеси поруку" value={message} onChange={e => setMessage(e.target.value)} />
        <input type="submit" className={styles.button} value="Пошаљи" onClick={handleClick} />
      </div>
      <p className={styles.infoMessage}>{infoMessage}</p>
    </form>
  );
};

export default NewMessage;