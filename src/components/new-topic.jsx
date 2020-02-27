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
    if (message === '' || topicTitle === '') {
      return setInfoMessage('Topic Title or first message can\'t be empty!');
    }

    addNewTopic(getUser().user_id, topicTitle)
      .then(data => {
        if (data.success === true) {
          sendMessage(getUser().username, data.topic.topic_id, message)
            .then(msg_data => {
              if (msg_data.success === true) {
                history.push({
                  pathname: `/topic/${data.topic.topic_id}`,
                  state: { topic: data.topic }
                });
              }
            });
        }
      })
  };

  return (
    <form className={styles.form}>
      <h4>New Topic</h4>
      <label htmlFor="topic-title">Title:</label>
      <input className={styles.input} type="text" id="topic-title" placeholder="Enter title" value={topicTitle} onChange={e => setTopicTitle(e.target.value)} onBlur={e => setTopicTitle(e.target.value.trim())} />
      <label htmlFor="message">Message:</label>
      <input className={styles.input} type="text" id="message" placeholder="Enter message" value={message} onChange={e => setMessage(e.target.value)} onBlur={e => setMessage(e.target.value.trim())} />
      <p>{infoMessage}</p>
      <input className={styles.inputBtn} type="submit" value="Add Topic" onClick={handleClick} />
    </form>
  );
};

export default NewTopic;