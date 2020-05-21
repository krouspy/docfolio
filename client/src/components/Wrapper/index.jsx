import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default ({ children }) => {
  const classes = useStyles();

  return (
    <main>
      <Container maxWidth="md" className={classes.root}>
        {children}
      </Container>
    </main>
  );
};
