import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default ({ open, toggle, error }) => {
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
