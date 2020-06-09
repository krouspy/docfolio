import React, { useState } from 'react';
import { useSnackbar } from 'components/Hooks';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Snackbar from 'components/Snackbar';

const CreateWorkspace = ({ totalWorkspaces }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [snackbar, toggleSnackbar] = useSnackbar('Create workspace');

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createWorkspace = () => {
    const { title, description } = data;
    if (title && description) {
      const postURL = '/api/createWorkspace';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: totalWorkspaces,
          title,
          description,
        }),
      };

      fetch(postURL, options)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          const { statusCode } = response;
          setOpen(false);
          toggleSnackbar('Create workspace', statusCode !== 200);
        })
        .catch(error => console.log(error));
    } else {
      alert('Add: issue in form');
    }
  };

  const { title, description } = data;

  return (
    <React.Fragment>
      <Button onClick={toggleOpen} size="large" color="inherit" startIcon={<AddCircleIcon />}>
        Add
      </Button>
      <Dialog open={open} onClose={toggleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Create Workspace</DialogTitle>
        <DialogContent dividers>
          <TextField
            value={title}
            onChange={handleChange}
            name="title"
            label="Title"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
          />
          <TextField
            value={description}
            onChange={handleChange}
            name="description"
            label="Description"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={createWorkspace} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        text={snackbar.text}
        error={snackbar.error}
      />
    </React.Fragment>
  );
};

CreateWorkspace.propTypes = {
  totalWorkspaces: PropTypes.number.isRequired,
};

export default CreateWorkspace;
