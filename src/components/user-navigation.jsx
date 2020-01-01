import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setUser, getUser } from '../utilities/user';

export const UserNavigation = () => {

  const handleClick = () => {
    setUser({});
  };

  return (
    <nav>
      <ul>
        <li><Link to="/topiclist">Home</Link></li>
        <li><Link to={`/profile/${getUser().user_id}`}>Profile</Link></li>
        <li><Link to="/userlist">Users</Link></li>
        <li><Link to="/" onClick={handleClick}>Log Out</Link></li>
      </ul>
    </nav>
  );
}