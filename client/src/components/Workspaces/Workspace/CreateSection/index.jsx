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

const CreateSection = ({ workspaceId, setSnackbar }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const createSection = () => {
    const url = 'http://localhost:3000/api/createSection';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        section,
      }),
    };
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          console.log(response);
          // setSections(sections.concat([section]));
          // updateSave();
        }
        setOpen(false);
        setSnackbar({
          open: true,
          error: statusCode !== 200,
          messageSuccess: 'Section created',
          messageError: 'Section not created',
        });
      })
      .catch(error => console.log(error));
  };

  return (
    <React.Fragment>
      <div onClick={toggleOpen} className={classes.root}>
        <AddCircleIcon fontSize="large" className={classes.icon} />
        <Typography variant="h6">Create Section</Typography>
      </div>
    </React.Fragment>
  );
};

CreateSection.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  // setSections: PropTypes.func.isRequired,
};

export default CreateSection;
