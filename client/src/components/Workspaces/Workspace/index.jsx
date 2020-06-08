import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useSnackbar } from 'components/Hooks';
import Snackbar from 'components/Snackbar';
import Markdown from './Markdown';
import Headings from './Headings';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '90%',
    padding: theme.spacing(2, 4),
    display: 'flex',
  },
  grid: {
    display: 'flex',
    // justifyContent: 'center',
  },
  headings: {
    display: 'flex',
    // justifyContent: 'center',
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
        toggleSnackbar('Update Content', statusCode !== 200);
      })
      .catch(error => console.error(error));
  };

  const { content } = workspace;

  return (
    <div className={classes.root}>
      <Grid container justify="space-around" spacing={3} className={classes.grid}>
        <Grid item xs={3} md={3} lg={3}></Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Markdown content={content} updateContent={updateContent} sendUpdate={sendUpdate} />
        </Grid>
        <Grid item xs={3} md={3} lg={3} className={classes.headings}>
          <Headings content={content} workspaceId={workspaceId} />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        text={snackbar.text}
        error={snackbar.error}
      />
    </div>
  );
};
