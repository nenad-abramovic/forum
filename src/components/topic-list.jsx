import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './topic-list.module.css';
import { getAllTopics, getAllMessages } from '../utilities/services';

export const TopicList = () => {
  const [topics, setTopics] = useState([]);

  async function f() {
    let data = await getAllTopics();
    let messages = await getAllMessages();
    if (data.success === true) {
      let tmp = data.topics.map(topic => {
        if (messages.success === true) {
          let topicMessages = messages.data.filter(msg => msg.topic_id === topic.topic_id);
          topicMessages = topicMessages.sort((a, b) => a.timestamp - b.timestamp);
          console.log({
            ...topic,
            no_of_messages: topicMessages.length,
            first_message: topicMessages[0],
            last_message: topicMessages[topicMessages.length - 1]

          })
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

  const handleClick = (e) => {
    e.target.textContent = (e.target.textContent === '↑') ? '↓' : '↑';
    let tmp = [...topics];
    setTopics(tmp.reverse());
  };

  const handleChange = (e) => {
    let tmp = [...topics];

    switch (e.target.value) {
      case 'date-created':
        setTopics(tmp.sort((a, b) => a.timestamp - b.timestamp));
        break;
      case 'last-comment':
        break;
      case 'number-of-comments':
        break;
      default:
        console.log('Something went wrong!');
    }
  }

  return (
    <section className={styles.topicList}>
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
              <tr>
                <td>{topic.title.toString()}</td>
                <td>{new Date(topic.timestamp).toLocaleString()}</td>
                <td>{topic.last_message.username}<br />
                  {
                    new Date(topic.last_message.timestamp).toLocaleString() === 'Invalid Date'
                      ? 'Нема порука'
                      : new Date(topic.first_message.timestamp).toLocaleString()
                  }
                </td>
                <td>{topic.no_of_messages}</td>
                <td>{topic.first_message.username}<br />
                  {
                    new Date(topic.first_message.timestamp).toLocaleString() === 'Invalid Date'
                      ? 'Нема порука'
                      : new Date(topic.first_message.timestamp).toLocaleString()
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}