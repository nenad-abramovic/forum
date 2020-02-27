import React from 'react';
import { getUser } from '../utilities/user';

const Profile = () => {
  return (
    <section>
      <h4>Profile</h4>
      <p>{getUser().username}</p>
    </section>
  );
};

export default Profile;