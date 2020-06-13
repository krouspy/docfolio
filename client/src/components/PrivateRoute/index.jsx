import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context';

const PrivateRoute = ({ children, ...rest }) => {
  const { authTokens } = useAuth();

  return <Route {...rest}>{authTokens ? children : <Redirect to="/sign-in" />}</Route>;
};

export default PrivateRoute;
