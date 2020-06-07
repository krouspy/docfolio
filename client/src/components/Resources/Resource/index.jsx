import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MicroLink from '@microlink/react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
  },
  deleteIcon: {
    'position': 'absolute',
    'zIndex': 1,
    'right': theme.spacing(2),
    '&:hover': {
      color: '#ef233c',
      backgroundColor: '#577590',
    },
  },
}));

const Resource = ({ url, id }) => {
  const classes = useStyles();
  const [isVisible, setVisible] = useState(false);

  const deleteResource = () => {
    const url = `/api/resource/delete/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    fetch(url, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      className={classes.card}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {isVisible && (
        <IconButton className={classes.deleteIcon} onClick={deleteResource}>
          <DeleteIcon />
        </IconButton>
      )}
      <MicroLink url={url} size="large" />
    </Grid>
  );
};

Resource.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Resource;
