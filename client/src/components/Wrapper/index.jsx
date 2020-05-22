import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default ({ children, size }) => {
  const classes = useStyles();

  return (
    <main>
      <Container maxWidth={size} className={classes.root}>
        {children}
      </Container>
    </main>
  );
};
