import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/:category">
          <Home />
        </Route>
        <Route path="/">
          <Redirect to="/all" />
        </Route>
      </Switch>
    </Router>
  );
};
