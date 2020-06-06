import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#212d40',
    zIndex: theme.zIndex.drawer - 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const TopicBar = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        {children}
      </Toolbar>
    </AppBar>
  );
};

TopicBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default TopicBar;
