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

export default () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

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
    } else {
      alert('Add: issue in form');
    }
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
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
        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
        <DialogContent dividers>
          <TextField
            value={title}
            onChange={handleTitle}
            label="Title"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
          />
          <TextField
            value={description}
            onChange={handleDescription}
            label="Description"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
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
