import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Drawer from './Drawer';
import Resources from './Resources';
import Workspaces from './Workspaces';
import Project from './Workspaces/Project';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    backgroundColor: '#1e2732',
  },
});

export default () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer open={openDrawer} handleOpen={handleOpenDrawer} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/resources/ethereum" />
          </Route>
          <Route exact path="/resources">
            <Redirect to="/resources/ethereum" />
          </Route>
          <Route path="/resources/:category">
            <Resources openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />
          </Route>
          <Route exact path="/workspaces">
            <Workspaces openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />
          </Route>
          <Route exact path="/workspace/:id">
            <Project />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
