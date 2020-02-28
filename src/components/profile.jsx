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
      <h3 className={styles.title}>Информације о кориснику</h3>
      <div className={styles.userInfo}>
        <div>
          <h4>Корисничко име</h4>
          <p>{userData.username}</p>
        </div>
        <div>
          <h4>Име</h4>
          <p>{userData.name}</p>
        </div>
        <div>
          <h4>Презиме</h4>
          <p>{userData.surname}</p>
        </div>
        <div>
          <h4>Бр. порука</h4>
          <p>{userMessages.length}</p>
        </div>
      </div>
      <h3 className={styles.title}>Поруке</h3>
      {
        userMessages.reverse().map(message => {
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