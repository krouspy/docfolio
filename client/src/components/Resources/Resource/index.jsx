import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactTinyLink } from 'react-tiny-link';
import Grid from '@material-ui/core/Grid';

import DeleteResource from './DeleteResource';

const style = {
  position: 'relative',
};

const Resource = ({ url, id, setData, toggleSnackbar }) => {
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
        style={style}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {isVisible && <DeleteResource deleteResource={deleteResource} />}
        <ReactTinyLink showGraphic={true} maxLine={2} minLine={1} cardSize="large" url={url} />
      </Grid>
    </React.Fragment>
  );
};

Resource.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default Resource;
