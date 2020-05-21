import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default ({ open, handleOpen, error }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleOpen}
      autoHideDuration={3000}
    >
      <Alert onClose={handleOpen} severity={error ? 'error' : 'success'}>
        {error ? 'Add Resource Failed :(' : 'Resource added successfully!'}
      </Alert>
    </Snackbar>
  );
};
