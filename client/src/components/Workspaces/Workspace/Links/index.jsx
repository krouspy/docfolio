import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MicroLink from '@microlink/react';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useDialog } from 'components/Hooks';

const useStyles = makeStyles(theme => ({
  add: {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'margin': 3,
    'color': 'white',
    'height': 47,
    'border': '1px dashed grey',
    '& > *': {
      margin: theme.spacing(1),
    },
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'white',
    },
  },
}));

const Links = ({ urls, workspaceId, updateLinks, toggleSnackbar }) => {
  const classes = useStyles();
  const [link, setLink] = useState('');
  const [open, toggleOpen] = useDialog();

  const addSource = () => {
    const url = `/api/addSource`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        url: link,
      }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const statusCode = response.statusCode;
        if (statusCode === 200) {
          updateLinks(link);
        }
        toggleSnackbar('Add Source', statusCode !== 200);
        toggleOpen();
      })
      .catch(error => console.error(error));
  };

  const handleLink = event => {
    setLink(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1} direction="column">
        {urls.map((url, index) => (
          <Grid key={index} item>
            <MicroLink
              url={url}
              size="small"
              style={{ backgroundColor: 'black', color: 'white' }}
            />
          </Grid>
        ))}
        <Grid item onClick={toggleOpen} className={classes.add}>
          <AddIcon />
          Add source
        </Grid>
      </Grid>
      <Dialog open={open} onClose={toggleOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Add Source</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={link}
            onChange={handleLink}
            label="url"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} color="secondary">
            Discard
          </Button>
          <Button onClick={addSource} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Links.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  workspaceId: PropTypes.string.isRequired,
  updateLinks: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default Links;
