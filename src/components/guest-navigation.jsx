import React from 'react';
import { Link } from 'react-router-dom';

export const GuestNavigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    </nav>
  );
}