import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({ open, handleOpen }) => {
  const [url, setURL] = useState('');
  const [category, setCategory] = useState('');

  const add = () => {
    if (url && category) {
      console.log(url);
      const postURL = 'http://localhost:3000/api/add';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          category,
        }),
      };

      fetch(postURL, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.error(error));
    } else {
      alert('Add: issue in form');
    }
  };

  const handleURL = event => {
    setURL(event.target.value);
  };

  const handleCategory = event => {
    setCategory(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Source</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          value={url}
          onChange={handleURL}
          label="url"
          variant="outlined"
          type="text"
          fullWidth
          margin="dense"
        />
        <TextField
          value={category}
          onChange={handleCategory}
          label="category"
          variant="outlined"
          type="text"
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpen} color="primary">
          Cancel
        </Button>
        <Button onClick={add} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
