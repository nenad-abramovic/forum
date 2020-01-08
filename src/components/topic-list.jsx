import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './topic-list.module.css';
import { getAllTopics } from '../utilities/services';

export const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics()
      .then(data => {
        if(data.success === true) {
          setTopics(data.topics);
        }
      })
  }, []);

  const handleClick = (e) => {
    e.target.textContent = (e.target.textContent === '↑') ? '↓' : '↑';
    let tmp = [...topics];
    setTopics(tmp.reverse());
  };

  const handleChange = (e) => {
    let tmp = [...topics];

    switch(e.target.value) {
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
      <h2>Topics</h2>
      <select onChange={handleChange}>
        <option value="date-created">Date Created</option>
        <option value="last-comment">Last Commented</option>
        <option value="number-of-comments">Number of Comments</option>
      </select>
      <button onClick={handleClick}>↑</button>
      <ul>
        {
          topics.map(topic => (
          <li className={styles.topicLink} key={topic.topic_id}>
            <Link key={topic.topic_id} to={{
              pathname:`/topic/${topic.topic_id}`,
              state: { topic }
            }}>{topic.title.toString()} - {new Date(topic.timestamp).toLocaleString()} [{}]</Link>
          </li>
          ))
        }
      </ul>
    </section>
  );
}