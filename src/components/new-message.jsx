import React, { useState } from 'react';
import { sendMessage } from '../utilities/services';
import { getUser } from '../utilities/user';

export const NewMessage = ({ topic_id, setClick }) => {
  const [message, setMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(getUser().username, topic_id, message)
        .then(data => {
          if (data.success === true) {
            setMessage('');
            setInfoMessage('Message sent successfully');
            setClick(new Date());
          }
        });
    }
  };

  return (
    <form>
      <label htmlFor="message">Message:</label>
      <input type="text" placeholder="Enter message" value={message} onChange={e => setMessage(e.target.value)} />
      <p>{infoMessage}</p>
      <input type="submit" value="Send" onClick={handleClick} />
    </form>
  );
}