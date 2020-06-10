import React, { useState } from 'react';
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

const AddForm = ({ allCategories, topics, setData, toggleSnackbar }) => {
  const [resource, setResource] = useState({
    categories: '',
    topic: '',
    url: '',
  });
  const [open, setOpen] = useState(false);

  const add = () => {
    const { categories, topic, url } = resource;
    if (categories && topic && url) {
      const postURL = '/api/addResource';
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
          const { statusCode, result } = response;
          setOpen(false);
          if (statusCode === 200) {
            setData(prevState => prevState.concat(result));
          }
          toggleSnackbar('Add resource', statusCode !== 200);
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

  const { categories, topic, url } = resource;

  return (
    <React.Fragment>
      <Button onClick={handleOpen} size="large" color="inherit" startIcon={<AddCircleIcon />}>
        Add
      </Button>
      {/* Dialog */}
      <Dialog open={open} onClose={handleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Add Resource</DialogTitle>
        <DialogContent dividers>
          {/* Categories */}
          <EditableSelect
            name="categories"
            list={allCategories}
            value={categories}
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
    </React.Fragment>
  );
};

AddForm.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
  setData: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default AddForm;
