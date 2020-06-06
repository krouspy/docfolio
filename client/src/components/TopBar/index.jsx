import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1e2732',
    zIndex: theme.zIndex.drawer,
  },
  appBarOpen: {
    zIndex: theme.zIndex.drawer - 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TopBar = ({ children, openDrawer, toggleDrawer }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      className={clsx(classes.appBar, {
        [classes.appBarOpen]: openDrawer,
      })}
    >
      <Toolbar variant="regular" className={classes.toolbar}>
        <Typography variant="h6">Docfolio</Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  openDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default TopBar;
