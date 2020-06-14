import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthContext } from '../context';
import PrivateRoute from './PrivateRoute';

import Layout from './Layout';
import Login from './Login';

export default () => {
  const token = JSON.parse(localStorage.getItem('docfolio-token'));
  const [authTokens, setAuthTokens] = useState(token);

  const setTokens = data => {
    localStorage.setItem('docfolio-token', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <CssBaseline />
      <Router>
        <Switch>
          <Redirect exact from="/" to="/resources/ethereum/all" />
          <Redirect exact from="/resources" to="/resources/ethereum/all" />
          <Redirect exact from="/resources/:category" to="/resources/:category/all" />

          <Route exact path="/sign-in" component={Login} />
          <Route exact path="/sign-up" component={Login} />
          <PrivateRoute path="/resources/:category/:topic" component={Layout} />
          <PrivateRoute path="/workspaces" component={Layout} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};
