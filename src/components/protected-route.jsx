import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../utilities/user';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      return (
        Object.keys(getUser()).length === 0
          ? <Redirect to="/" />
          : <Component {...props} />
      );
    }} />
  );
}