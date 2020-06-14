import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import CustomTextField from '../CustomTextField';
import { useAuth } from '../../../context';

const useStyles = makeStyles(theme => ({
  paper: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    '& > *': {
      color: 'white',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    'width': '100%', // Fix IE 11 issue.
    'marginTop': theme.spacing(1),
    '& > *': {
      color: 'white',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  checkbox: {
    color: '#ffff',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: 'knjlau1@gmail.com',
    password: '1234',
  });
  const { setAuthTokens } = useAuth();

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = event => {
    const { email, password } = user;
    if (email !== '' && password !== '') {
      event.preventDefault();
      const url = '/api/login';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      fetch(url, options)
        .then(response => {
          const { status, url } = response;
          // very bad error handling => didn't manage to send error 401 in response when authentication fails with passportjs
          // but sending a redirect url is working so i'm using this as a flag
          if (status === 200) {
            const arr = url.split('/');
            const param = arr[arr.length - 1];
            if (param === '') {
              setAuthTokens('docfolio');
            }
          }
        })
        .catch(console.error);
    } else {
      alert('Error');
    }
  };

  if (localStorage.getItem('docfolio-token')) {
    return <Redirect to="/" />;
  }

  const { email, password } = user;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <CustomTextField
            autoFocus
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <CustomTextField
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
            onClick={login}
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
