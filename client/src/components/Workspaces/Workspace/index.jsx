import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      color: 'white',
      padding: theme.spacing(3),
      margin: theme.spacing(1),
      backgroundColor: '#272c34',
    },
  },
  link: {
    color: 'white',
  },
}));

export default () => {
  const classes = useStyles();
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const url = `http://localhost:3000/api/workspace/${workspaceId}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const result = response.result[0];
        console.log(result);
        setWorkspace(result);
      })
      .catch(error => console.log(error));
  }, []);

  const { title, description } = workspace;

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1">{description}</Typography>
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
    </div>
  );
};
