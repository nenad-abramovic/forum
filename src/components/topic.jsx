import React, { useState, useEffect } from 'react';
import { getTopicMessages } from '../utilities/services';
import Message from './message';
import NewMessage from './new-message';
import { getUser } from '../utilities/user';
import styles from './topic.module.css';

const Topic = ({ location }) => {
  const [click, setClick] = useState(new Date());
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Object.keys(getUser()).length !== 0
  );

  useEffect(() => {
    let i = setInterval(() => setIsLoggedIn(
      Object.keys(getUser()).length !== 0
    ), 500);

    return clearInterval(i);
  }, []);

  useEffect(() => {
    getTopicMessages(location.state.topic.topic_id)
      .then(data => {
        if (data.success === true) {
          setMessages(data.messages.reverse());
        }
      });
  }, [location.state.topic.topic_id, click]);

  return (
    <section className={styles.topic}>
      <div className={styles.titleContainer}>
        <h2>{location.state.topic.title.toString()}</h2>
        <p>Датум објављивања: {new Date(location.state.topic.timestamp).toLocaleString('sr-rs')}</p>
      </div>
      {
        messages.map(message => <Message key={message.message_id} message={message} />)
      }
      <br />
      {
        isLoggedIn
          ? <NewMessage topic_id={location.state.topic.topic_id} setClick={setClick} />
          : ''
      }
    </section>
  );
};

export default Topic;