import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  paper: {
    '& > *': {
      color: 'white',
      margin: theme.spacing(1, 0),
      padding: theme.spacing(2),
      backgroundColor: '#272c34',
    },
  },
  textarea: {
    color: 'white',
    fontSize: 17,
    backgroundColor: '#272c34',
    maxWidth: '100%',
    minWidth: '100%',
  },
  viewer: {
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

const Markdown = ({ content, updateContent, sendUpdate }) => {
  const classes = useStyles();
  const [isVisible, setVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);

  return (
    <Paper
      className={classes.paper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {isEditing ? (
        <div>
          <TextareaAutosize
            name="content"
            rowsMin={35}
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
          <ReactMarkdown source={content} />
          {isVisible && (
            <div className={classes.buttons}>
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </Paper>
  );
};

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
  updateContent: PropTypes.func.isRequired,
  sendUpdate: PropTypes.func.isRequired,
};

export default Markdown;
