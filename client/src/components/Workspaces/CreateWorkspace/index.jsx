import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const CreateWorkspace = ({ totalWorkspaces }) => {
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const createProject = () => {
    const { title, description } = data;
    if (title && description) {
      const postURL = 'http://localhost:3000/api/createProject';
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
          setOpen(false);
        })
        .catch(error => console.log(error));
    } else {
      alert('Add: issue in form');
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { title, description } = data;

  return (
    <React.Fragment>
      <Button onClick={handleOpen} size="large" color="inherit" startIcon={<AddCircleIcon />}>
        Add
      </Button>
      <Dialog open={open} onClose={handleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Create Project</DialogTitle>
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
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={createProject} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

CreateWorkspace.propTypes = {
  totalWorkspaces: PropTypes.number.isRequired,
};

export default CreateWorkspace;
