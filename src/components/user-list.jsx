import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../utilities/services';
import { useHistory } from 'react-router-dom';
import styles from './user-list.module.css';

const UserList = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(data => {
        if (data.success) {
          setUsers(data.users);
        }
      })
  }, []);

  return (
    <div>
      {
        users.map(user => (
          <div className={styles.container} key={user.user_id} onClick={() => history.push(`/profile/${user.user_id}`)}>
            <h3>{user.username}</h3>
            <p>{user.name} {user.surname}</p>
          </div>
        ))
      }
    </div>
  );
};

export default UserList;