import React, { useState, useEffect } from 'react';
import { getTopicMessages } from '../utilities/services';
import { Message } from './message';
import { NewMessage } from './new-message';
import { getUser } from '../utilities/user';

export const Topic = ({ location }) => {
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
        if(data.success === true){
          setMessages(data.messages);
        }
      });
  }, [location.state.topic.topic_id, click]);

  return (
    <section>
  <h3>{location.state.topic.title}</h3>
  <p>Created on: {new Date(location.state.topic.timestamp).toLocaleString()}</p>
  {
    messages.map(message => <Message message={message} />)
  }
  <br />
  {
    isLoggedIn 
    ? <NewMessage topic_id={location.state.topic.topic_id} setClick={setClick} />
    : ''
  }
  </section>
  );
}