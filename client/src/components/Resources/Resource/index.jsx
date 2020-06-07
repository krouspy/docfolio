import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MicroLink from '@microlink/react';
import Grid from '@material-ui/core/Grid';

import DeleteResource from './DeleteResource';

const useStyles = makeStyles({
  card: {
    position: 'relative',
  },
});

const Resource = ({ url, id, setData, toggleSnackbar }) => {
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
      .then(response => {
        const statusCode = response.statusCode;
        if (statusCode === 200) {
          setData(prevState => prevState.filter(element => element._id !== id));
        }
        toggleSnackbar('Delete resource', response.statusCode !== 200);
      })
      .catch(error => console.error(error));
  };

  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        className={classes.card}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {isVisible && <DeleteResource deleteResource={deleteResource} />}
        <MicroLink url={url} size="large" />
      </Grid>
    </React.Fragment>
  );
};

Resource.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Resource;
