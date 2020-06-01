import React, { useState } from 'react';
import { useSnackbar } from '#customHooks';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import EditableSelect from './EditableSelect';
import Snackbar from '#snackbar';
import { capitalize } from '#utils';

const AddForm = ({ categories, topics }) => {
  const [resource, setResource] = useState({
    category: '',
    topic: '',
    url: '',
  });
  const [open, setOpen] = useState(false);
  const [snackbar, toggleSnackbar] = useSnackbar('Add Resource');

  const add = () => {
    const { category, topic, url } = resource;
    if (category && topic && url) {
      const postURL = 'http://localhost:3000/api/addResource';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resource),
      };

      fetch(postURL, options)
        .then(response => response.json())
        .then(response => {
          setOpen(false);
          toggleSnackbar('Add Resource', response.statusCode !== 200);
        })
        .catch(error => console.error(error));
    } else {
      alert('Add: issue in form');
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setResource(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { category, topic, url } = resource;

  return (
    <React.Fragment>
      <Button onClick={handleOpen} size="large" color="inherit" startIcon={<AddCircleIcon />}>
        Add
      </Button>
      {/* Dialog */}
      <Dialog open={open} onClose={handleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Add Resource</DialogTitle>
        <DialogContent dividers>
          {/* Category */}
          <EditableSelect
            name="category"
            list={categories}
            value={category}
            handleChange={handleChange}
            helper
          />

          {/* Topic */}
          <EditableSelect name="topic" list={topics} value={topic} handleChange={handleChange} />

          {/* url */}
          <TextField
            name="url"
            value={url}
            onChange={handleChange}
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
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        text={snackbar.text}
        error={snackbar.error}
      />
    </React.Fragment>
  );
};

AddForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
};

export default AddForm;
