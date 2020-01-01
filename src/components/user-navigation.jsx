import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setUser, getUser } from '../utilities/user';

export const UserNavigation = () => {
  const [loggedUser, setLoggedUser] = useState(getUser());

  const handleClick = () => {
    setUser({});
    setLoggedUser({});
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to={`/profile/${loggedUser.user_id}`}>Profile</Link></li>
        <li><Link to="/" onClick={handleClick}>Log Out</Link></li>
      </ul>
    </nav>
  );
}