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
  }, [])

  return (
    <section>
      <ul>
        {
          topics.map(topic => (
          <li className={styles.topicLink} key={topic.topic_id}>
            <Link key={topic.topic_id} to={{
              pathname:`/topic/${topic.topic_id}`,
              state: { topic }
            }}>{topic.title} - {new Date(topic.timestamp).toLocaleString()} [{}]</Link>
          </li>
          ))
        }
      </ul>
    </section>
  );
}