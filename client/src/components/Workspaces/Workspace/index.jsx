import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useSnackbar } from 'components/Hooks';
import Snackbar from 'components/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
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

export default () => {
  const classes = useStyles();
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [snackbar, toggleSnackbar] = useSnackbar();
  const [isEditing, setEditing] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const url = `/api/workspace/${workspaceId}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const result = response.result[0];
        setWorkspace(result);
      })
      .catch(error => console.log(error));
  }, [workspaceId]);

  const updateContent = event => {
    const { name, value } = event.target;
    setWorkspace(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        content: workspace.content,
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

  const { content } = workspace;

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
        <div className={classes.markdown}>
          <Markdown source={content} />
          {isVisible && (
            <div className={classes.buttons}>
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        text={snackbar.text}
        error={snackbar.error}
      />
    </Paper>
  );
};
