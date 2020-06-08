import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useSnackbar } from 'components/Hooks';
import Snackbar from 'components/Snackbar';
import Links from './Links';
import Markdown from './Markdown';
import Headings from './Headings';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '93%',
    padding: theme.spacing(2, 2),
    display: 'flex',
  },
  grid: {
    display: 'flex',
    borderBottom: '1px solid grey',
  },
  markdown: {
    borderLeft: '1px solid grey',
    borderRight: '1px solid grey',
  },
}));

export default () => {
  const classes = useStyles();
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState({
    title: '',
    description: '',
    content: '',
    links: [],
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

  const updateLinks = link => {
    setWorkspace(prevState => ({
      ...prevState,
      links: prevState.links.concat(link),
    }));
  };

  const { content, links } = workspace;

  return (
    <div className={classes.root}>
      <Grid container justify="space-around" spacing={3} className={classes.grid}>
        <Grid item xs={2} md={2} lg={2}>
          <Headings content={content} workspaceId={workspaceId} />
        </Grid>
        <Grid item xs={7} md={7} lg={7} className={classes.markdown}>
          <Markdown
            content={content}
            updateContent={updateContent}
            workspaceId={workspaceId}
            toggleSnackbar={toggleSnackbar}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <Links
            urls={links}
            workspaceId={workspaceId}
            updateLinks={updateLinks}
            toggleSnackbar={toggleSnackbar}
          />
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
