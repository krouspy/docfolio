import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackBar = ({ open, toggle, messageSuccess, messageError, error }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={toggle}
      autoHideDuration={3000}
    >
      <Alert onClose={toggle} severity={error ? 'error' : 'success'}>
        {error ? `Error: ${messageError}` : `Success: ${messageSuccess}`}
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
  messageSuccess: PropTypes.string.isRequired,
  messageError: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

export default SnackBar;
