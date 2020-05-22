import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackBar = ({ open, toggle, error }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={toggle}
      autoHideDuration={3000}
    >
      <Alert onClose={toggle} severity={error ? 'error' : 'success'}>
        {error ? 'Add Resource Failed :(' : 'Resource added successfully!'}
      </Alert>
    </Snackbar>
  );
};

SnackBar.defaultProps = {
  error: false,
};

SnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default SnackBar;
