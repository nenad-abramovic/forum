import React, { useState } from 'react';
import styles from './new-topic.module.css';
import { addNewTopic, sendMessage } from '../utilities/services';
import { getUser } from '../utilities/user';
import { useHistory } from 'react-router-dom';

const NewTopic = () => {
  const history = useHistory();
  const [topicTitle, setTopicTitle] = useState('');
  const [message, setMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (message === '' && topicTitle === '') {
      return setInfoMessage('Унеси наслов теме и прву поруку.');
    }
    if (message === '') {
      return setInfoMessage('Унеси прву поруку.');
    }
    if (topicTitle === '') {
      return setInfoMessage('Унеси наслов теме.');
    }

    addNewTopic(getUser().user_id, topicTitle)
      .then(data => {
        if (data.success) {
          sendMessage(getUser().username, data.topic.topic_id, message)
            .then(msg_data => {
              if (msg_data.success) {
                history.push({
                  pathname: `/topic/${data.topic.topic_id}`,
                  state: { topic: data.topic }
                });
              }
            });
        }
      });
  };

  return (
    <form className={styles.form}>
      <h4>Додај нову тему</h4>
      <label htmlFor="topic-title">Наслов:</label>
      <input className={styles.input} type="text" id="topic-title" value={topicTitle} onChange={e => setTopicTitle(e.target.value)} onBlur={e => setTopicTitle(e.target.value.trim())} />
      <label htmlFor="message">Прва порука:</label>
      <input className={styles.input} type="text" id="message" value={message} onChange={e => setMessage(e.target.value)} onBlur={e => setMessage(e.target.value.trim())} />
      <p className={styles.infoMessage}>{infoMessage}</p>
      <input className={styles.button} type="submit" value="Додај тему" onClick={handleClick} />
    </form>
  );
};

export default NewTopic;