import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import CustomTextField from '../CustomTextField';
import { useAuth } from '../../../context';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#ffff',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    'width': '100%', // Fix IE 11 issue.
    'marginTop': theme.spacing(3),
    '& > *': {
      color: '#ffff',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const { setAuthTokens } = useAuth();

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUser = event => {
    event.preventDefault();
    const { firstname, lastname, email, password } = user;
    if (firstname !== '' && lastname !== '' && email !== '' && password !== '') {
      const url = '/api/registerUser';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };

      fetch(url, options)
        .then(response => response.json())
        .then(response => {
          if (response.statusCode === 200) {
            setAuthTokens('docfolio');
          } else {
            setError({
              isError: true,
              message: 'An error occured',
            });
          }
        })
        .catch(console.error);
    } else {
      setError({
        isError: true,
        message: 'All fields are required',
      });
    }
  };

  const { firstname, lastname, email, password } = user;
  const { isError, message } = error;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name="firstname"
                label="First Name"
                variant="outlined"
                value={firstname}
                onChange={handleChange}
                helperText={isError && message}
                autoFocus
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name="lastname"
                label="Last Name"
                variant="outlined"
                value={lastname}
                onChange={handleChange}
                helperText={isError && message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="email"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={handleChange}
                helperText={isError && message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={handleChange}
                helperText={isError && message}
                type="password"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={registerUser}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
