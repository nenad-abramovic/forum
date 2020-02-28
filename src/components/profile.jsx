import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo, getAllMessages, getAllTopics } from '../utilities/services';
import Message from './message';
import styles from './profile.module.css';

const Profile = () => {
  const history = useHistory();
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [userMessages, setUserMessages] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getUserInfo(params.user_id)
      .then(data => {
        if (data.success) {
          setUserData(data.user);
        }
      });

    getAllMessages()
      .then(data => {
        if (data.success) {
          let tmp = data.data.filter(msg => msg.user_id === userData.user_id);
          setUserMessages(tmp);
        }
      });

    getAllTopics()
      .then(data => {
        if (data.success) {
          setTopics(data.topics)
        }
      });
  }, [params.user_id, userData.user_id]);

  return (
    <section>
      <h4>Профил</h4>
      <br />
      <h5>Корисничко име</h5>
      <p>{userData.username}</p>
      <br />
      <h5>Име</h5>
      <p>{userData.name}</p>
      <br />
      <h5>Презиме</h5>
      <p>{userData.surname}</p>
      <br />
      <h4>Поруке</h4>
      {
        userMessages.map(message => {
          let topic = topics.find(topic => topic.topic_id === message.topic_id);
          return (
            <div className={styles.message} key={message.message_id} onClick={() => history.push(`/topic/${message.topic_id}`, { topic }
            )}>
              <h3>{topic.title}</h3>
              <Message message={message} />
            </div>
          );
        })
      }
    </section >
  );
};

export default Profile;