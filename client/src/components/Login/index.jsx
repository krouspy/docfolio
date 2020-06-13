import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1e2732',
    paddingTop: theme.spacing(8),
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </div>
  );
};

export default Login;
