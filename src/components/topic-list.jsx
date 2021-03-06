import React, { useEffect, useState } from 'react';
import styles from './topic-list.module.css';
import { getAllTopics, getAllMessages } from '../utilities/services';
import { useHistory } from 'react-router-dom';

const TopicList = () => {
  const history = useHistory();
  const [topics, setTopics] = useState([]);

  async function f() {
    let data = await getAllTopics();
    let messages = await getAllMessages();
    if (data.success) {
      let tmp = data.topics.map(topic => {
        if (messages.success) {
          let topicMessages = messages.data.filter(msg => msg.topic_id === topic.topic_id);
          topicMessages = topicMessages.sort((a, b) => a.timestamp - b.timestamp);

          return ({
            ...topic,
            no_of_messages: topicMessages.length,
            first_message: topicMessages[0] || {},
            last_message: topicMessages[topicMessages.length - 1] || {}
          });
        }
        return ({});
      });
      setTopics(tmp);
    }
  }

  useEffect(() => {
    f();
  }, []);

  const handleClick = () => {
    let tmp = [...topics];
    setTopics(tmp.reverse());
  };

  const handleChange = (e) => {
    let tmp = [...topics];

    switch (e.target.value) {
      case 'date-created':
        setTopics(tmp.sort((a, b) => b.timestamp - a.timestamp));
        break;
      case 'last-comment':
        setTopics(tmp.sort((a, b) => {
          if (!a.last_message.timestamp) {
            return 1;
          }
          if (!b.last_message.timestamp) {
            return -1;
          }

          return b.last_message.timestamp - a.last_message.timestamp;
        }));
        break;
      case 'number-of-comments':
        setTopics(tmp.sort((a, b) => b.no_of_messages - a.no_of_messages));
        break;
      default:
        console.log('Something went wrong!');
    }
  }

  return (
    <section className={styles.topicList}>
      <div className={styles.controls}>
        <h2 className={styles.title}>Теме</h2>
        <div>
          <select className={styles.select} onChange={handleChange}>
            <option value="date-created">Датум објављивања</option>
            <option value="last-comment">Последње коментарисано</option>
            <option value="number-of-comments">Број коментара</option>
          </select>
          <button className={styles.button} onClick={handleClick}>⇅</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Наслов</th>
            <th>Датум прављења</th>
            <th>Последња порука</th>
            <th>Број порука</th>
            <th>Прва порука</th>
          </tr>
        </thead>
        <tbody>
          {
            topics.map(topic => (
              <tr key={topic.topic_id} onClick={() => history.push(`/topic/${topic.topic_id}`, { topic })}>
                <td>{topic.title.toString()}</td>
                <td>{new Date(topic.timestamp).toLocaleString('sr-rs')}</td>
                <td>{topic.last_message.username}<br />
                  {
                    new Date(topic.last_message.timestamp).toLocaleString() === 'Invalid Date'
                      ? 'Нема порука'
                      : new Date(topic.first_message.timestamp).toLocaleString('sr-rs')
                  }
                </td>
                <td>{topic.no_of_messages}</td>
                <td>{topic.first_message.username}<br />
                  {
                    new Date(topic.first_message.timestamp).toLocaleString() === 'Invalid Date'
                      ? 'Нема порука'
                      : new Date(topic.first_message.timestamp).toLocaleString('sr-rs')
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section >
  );
};

export default TopicList;