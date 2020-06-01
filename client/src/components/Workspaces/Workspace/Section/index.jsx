import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useDialog } from '#customHooks';
import DialogConfirmation from './DialogConfirmation';

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
  markdown: {
    position: 'relative',
  },
  buttons: {
    'position': 'absolute',
    'top': 0,
    'right': 0,
    '& > *': {
      color: 'white',
    },
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

const Section = ({ workspaceId, section, toggleSnackbar, setData }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [open, toggleDialog] = useDialog();

  const updateSection = event => {
    const position = section.position;
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      sections: prevState.sections.map((element, pos) =>
        position === pos ? { ...element, [name]: value } : element
      ),
    }));
  };

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
        section: section,
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

  const deleteSection = () => {
    const position = section.position;
    const url = 'http://localhost:3000/api/deleteSection';
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        position: position,
      }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const statusCode = response.statusCode;
        toggleSnackbar('Delete section', statusCode !== 200);
        if (statusCode === 200) {
          setData(prevState => ({
            ...prevState,
            sections: prevState.sections.filter(element => {
              return element.position !== position;
            }),
          }));
        }
      })
      .catch(error => console.error(error));
  };

  const { content } = section;

  return (
    <Paper
      className={classes.root}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {isEditing ? (
        <div>
          <TextareaAutosize
            name="content"
            rowsMin={15}
            value={content}
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
        <div className={classes.markdown}>
          <Markdown source={content} />
          {isVisible && (
            <div className={classes.buttons}>
              <IconButton onClick={toggleDialog}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
            </div>
          )}
        </div>
      )}
      <DialogConfirmation open={open} toggle={toggleDialog} deleteSection={deleteSection} />
    </Paper>
  );
};

Section.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Section;
