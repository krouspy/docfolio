import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Wrapper = ({ children, size }) => {
  const classes = useStyles();

  return (
    <main>
      <Container maxWidth={size} className={classes.root}>
        {children}
      </Container>
    </main>
  );
};

Wrapper.defaultProps = {
  size: 'lg',
};

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  size: PropTypes.string,
};

export default Wrapper;
