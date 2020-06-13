import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '../Drawer';
import Resources from '../Resources';
import Workspaces from '../Workspaces';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#1e2732',
  },
  main: {
    flexGrow: 1,
  },
});

const Layout = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Drawer open={open} toggle={toggleDrawer} />
      <main className={classes.main}>
        <Switch>
          <Route
            path="/resources/:category/:topic"
            render={() => <Resources openDrawer={open} toggleDrawer={toggleDrawer} />}
          />
          <Route path="/workspaces">
            <Workspaces openDrawer={open} toggleDrawer={toggleDrawer} />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default Layout;
