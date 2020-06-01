import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  root: {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'height': 100,
    'border': '1px double grey',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5c677d',
    },
  },
  icon: {
    margin: theme.spacing(1),
  },
}));

const CreateSection = ({ createSection, workspaceId }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div onClick={createSection} className={classes.root}>
        <AddCircleIcon fontSize="large" className={classes.icon} />
        <Typography variant="h6">Create Section</Typography>
      </div>
    </React.Fragment>
  );
};

CreateSection.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  createSection: PropTypes.func.isRequired,
};

export default CreateSection;
