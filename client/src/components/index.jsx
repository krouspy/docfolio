import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Resources from './Resources';
import TopBar from './TopBar';
import Drawer from './Drawer';
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

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <TopBar open={open} handleOpen={handleOpen} />
        <Drawer open={open} handleOpen={handleOpen} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/resources/ethereum" />
          </Route>
          <Route exact path="/resources">
            <Redirect to="/resources/ethereum" />
          </Route>
          <Route path="/resources/:category">
            <Resources />
          </Route>
          <Route path="/workspaces">
            <Workspaces />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
