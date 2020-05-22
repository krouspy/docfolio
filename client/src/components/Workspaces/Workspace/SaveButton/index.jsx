import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  saveButton: {
    width: 150,
    color: 'white',
    marginTop: theme.spacing(2),
    backgroundColor: '#264653',
  },
}));

const SaveButton = ({ data, updateSave, setSnackbar }) => {
  const classes = useStyles();

  const handleClick = () => {
    const url = 'http://localhost:3000/api/updateWorkspace';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          updateSave();
        }
        setSnackbar({
          open: true,
          error: statusCode !== 200,
        });
      })
      .catch(error => console.log(error));
  };

  return (
    <Button size="small" variant="contained" className={classes.saveButton} onClick={handleClick}>
      Save Changes
    </Button>
  );
};

SaveButton.propTypes = {
  data: PropTypes.object.isRequired,
  updateSave: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};

export default SaveButton;
