import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { capitalize } from '#utils';

const useStyles = makeStyles({
  categoryButton: {
    marginRight: -12,
  },
});

export default ({ categories }) => {
  const classes = useStyles();
  const [url, setURL] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const add = () => {
    if (url && category) {
      const postURL = 'http://localhost:3000/api/addResource';
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

  const handleNewCategory = () => {
    setNewCategory(!newCategory);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} size="large" color="inherit" startIcon={<AddCircleIcon />}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleOpen}
        maxWidth="xs"
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Source</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            fullWidth
            select={!newCategory}
            value={category}
            onChange={handleCategory}
            label={newCategory ? 'Create Category' : 'Select Category'}
            variant="outlined"
            margin="dense"
            helperText="Click on left icon to Select or Create a category"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleNewCategory}
                    className={classes.categoryButton}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >
            {categories.map(option => (
              <MenuItem key={option} value={option}>
                {capitalize(option)}
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
    </React.Fragment>
  );
};
