import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1e2732',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar variant="regular" className={classes.toolbar}>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          General
        </Typography>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          Ethereum
        </Typography>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          Tezos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
