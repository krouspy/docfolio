import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  root: {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'height': 100,
    'border': '1px double grey',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5c677d',
    },
  },
  icon: {
    margin: theme.spacing(1),
  },
}));

const CreateSection = ({ workspaceId, sections, setSections, setSnackbar }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState({
    title: '',
    content: '',
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setSection(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createSection = () => {
    const url = 'http://localhost:3000/api/createSection';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        section,
      }),
    };
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          console.log(response);
          setSections(sections.concat([section]));
          // updateSave();
        }
        setOpen(false);
        setSnackbar({
          open: true,
          error: statusCode !== 200,
          messageSuccess: 'Section created',
          messageError: 'Section not created',
        });
      })
      .catch(error => console.log(error));
  };

  const { title, content } = section;

  return (
    <React.Fragment>
      <div onClick={toggleOpen} className={classes.root}>
        <AddCircleIcon fontSize="large" className={classes.icon} />
        <Typography variant="h6">Create Section</Typography>
      </div>
      <Dialog open={open} onClose={toggleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Create Section</DialogTitle>
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
            value={content}
            onChange={handleChange}
            name="content"
            label="Content"
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
          <Button onClick={createSection} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

CreateSection.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSections: PropTypes.func.isRequired,
};

export default CreateSection;
