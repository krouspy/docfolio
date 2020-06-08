import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: ({ isEditing }) => ({
    'display': isEditing ? 'inline' : 'flex',
    'justifyContent': 'center',
    'height': '100%',
    '& > *': {
      color: 'white',
    },
  }),
  textarea: {
    color: 'white',
    fontSize: 17,
    backgroundColor: '#272c34',
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
  },
  viewer: {
    position: 'relative',
  },
  markdown: {
    fontSize: 17,
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

const Markdown = ({ content, updateContent, workspaceId, toggleSnackbar }) => {
  const [isVisible, setVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const classes = useStyles({ isEditing });

  const sendUpdate = () => {
    const url = `/api/updateContent`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        content: content,
      }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const statusCode = response.statusCode;
        toggleSnackbar('Update Content', statusCode !== 200);
        setEditing(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {isEditing ? (
        <div>
          <TextareaAutosize
            name="content"
            rowsMin={38}
            value={content}
            onChange={updateContent}
            className={classes.textarea}
          />
          <div>
            <IconButton onClick={sendUpdate} className={classes.checkButton}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setEditing(false)} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className={classes.viewer}>
          <ReactMarkdown source={content} className={classes.markdown} />
          {isVisible && (
            <div className={classes.buttons}>
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
  updateContent: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default Markdown;
