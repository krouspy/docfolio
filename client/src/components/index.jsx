import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Drawer from './Drawer';
import Resources from './Resources';
import Workspaces from './Workspaces';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    backgroundColor: '#1e2732',
  },
});

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer open={open} toggle={toggleDrawer} />
        <Switch>
          <Redirect exact from="/" to="/resources/ethereum/all" />
          <Redirect exact from="/resources" to="/resources/ethereum/all" />
          <Redirect exact from="/resources/:category" to="/resources/:category/all" />
          <Route
            path="/resources/:category/:topic"
            render={() => <Resources openDrawer={open} toggleDrawer={toggleDrawer} />}
          />
          <Route path="/workspaces">
            <Workspaces openDrawer={open} toggleDrawer={toggleDrawer} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
