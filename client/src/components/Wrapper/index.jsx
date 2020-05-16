import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default ({ children }) => {
  const classes = useStyles();

  return (
    <main>
      <Container className={classes.cardGrid}>{children}</Container>
    </main>
  );
};
