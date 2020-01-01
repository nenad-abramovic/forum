import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../utilities/user';

export const ProtectedRoute = ({ render: RenderedComponent, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      return (
        <>
        {
        Object.keys(getUser()).length === 0
          ? <Redirect to="/" />
          : <RenderedComponent {...props} />
        }
        </>
      );
    }} />
  );
}