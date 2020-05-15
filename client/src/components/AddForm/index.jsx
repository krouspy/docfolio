import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

export default ({ open, handleOpen, categories }) => {
  const [url, setURL] = useState('');
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    setCategory(categories[0]);
  }, [categories]);

  const add = () => {
    if (url && category) {
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
          select
          autoFocus
          value={category}
          onChange={handleCategory}
          label="category"
          variant="outlined"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ViewModuleIcon />
              </InputAdornment>
            ),
          }}
        >
          {categories.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={url}
          onChange={handleURL}
          label="url"
          variant="outlined"
          type="text"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
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
