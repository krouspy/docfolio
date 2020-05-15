import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/ethereum" />
        </Route>
        <Route path="/:category">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
