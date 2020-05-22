import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Editable from './Editable';
import SaveButton from './SaveButton';
import Snackbar from '#snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      color: 'white',
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2),
      backgroundColor: '#272c34',
    },
  },
  head: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: 'white',
  },
}));

export default () => {
  const classes = useStyles();
  const { workspaceId } = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
  });
  const [workspace, setWorkspace] = useState({
    title: '',
    description: '',
  });
  // save initial workspace state to compare if there's any changes to display save button or not
  const [save, setSave] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const url = `http://localhost:3000/api/workspace/${workspaceId}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const result = response.result[0];
        setWorkspace(result);
        setSave(result);
      })
      .catch(error => console.log(error));
  }, []);

  const updateWorkspace = event => {
    const { name, value } = event.target;
    setWorkspace(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateSave = () => {
    setSave(workspace);
  };

  const checkChanges = () => {
    return workspace.title !== save.title || workspace.description !== save.description;
  };

  const toggleSnackbar = () => {
    setSnackbar(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  const { title, description } = workspace;
  const update = checkChanges();

  return (
    <div className={classes.root}>
      <Paper className={classes.head}>
        <Editable variant="h5" text={title} updateText={updateWorkspace} name="title" />
        <Editable
          variant="subtitle1"
          text={description}
          updateText={updateWorkspace}
          name="description"
        />
        {update && (
          <SaveButton data={workspace} updateSave={updateSave} setSnackbar={setSnackbar} />
        )}
      </Paper>
      <Paper>
        <Typography variant="h5" gutterBottom>
          Michelson
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Base smart contract language on Tezos
        </Typography>
        <Typography variant="body1">
          <a
            className={classes.link}
            href="https://gitlab.com/camlcase-dev/michelson-tutorial/tree/master"
          >
            https://gitlab.com/camlcase-dev/michelson-tutorial/tree/master
            <br />
            https://medium.com/tezoscommons/examples-of-netezos-usage-b6c24be3ce8a
            <br />
            https://medium.com/tezoscommons/netezos-forge-an-operation-locally-and-sign-it-using-ledger-e972b1ca0c7f
          </a>
        </Typography>
      </Paper>
      <Snackbar open={snackbar.open} toggle={toggleSnackbar} error={snackbar.error} />
    </div>
  );
};
