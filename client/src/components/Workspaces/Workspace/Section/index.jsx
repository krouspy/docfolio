import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 250,
  },
  textarea: {
    color: 'white',
    fontSize: 17,
    backgroundColor: '#272c34',
    maxWidth: '100%',
    minWidth: '100%',
  },
  content: {
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
  },
  checkButton: {
    'color': 'white',
    'float': 'right',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  closeButton: {
    'color': 'white',
    'float': 'right',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}));

const Section = ({ workspaceId, data, updateSection, toggleSnackbar }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);

  const sendUpdate = () => {
    const url = `http://localhost:3000/api/updateOneSection`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        section: data,
      }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const statusCode = response.statusCode;
        toggleSnackbar('Update Section', statusCode !== 200);
        setEditing(statusCode !== 200);
      })
      .catch(error => console.error(error));
  };

  return (
    <Paper className={classes.root}>
      {isEditing ? (
        <div>
          <TextareaAutosize
            name="content"
            rowsMin={15}
            value={data.content}
            onChange={updateSection}
            className={classes.textarea}
          />
          <IconButton onClick={sendUpdate} className={classes.checkButton}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={() => setEditing(false)} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
      ) : (
        <div className={classes.content}>
          <Markdown source={data.content} />
          <IconButton onClick={() => setEditing(true)} className={classes.editButton}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </Paper>
  );
};

Section.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  updateSection: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default Section;
