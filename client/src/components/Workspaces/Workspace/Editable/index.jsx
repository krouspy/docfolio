import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-flex',
  },
  text: {
    margin: theme.spacing(1),
  },
  textfield: {
    color: 'white',
    // width: 400,
  },
}));

const Editable = ({ text, updateText, name, variant }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const leaveTextField = () => {
    setEditing(false);
    setVisible(false);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <div>
          <TextField
            autoFocus
            name={name}
            value={text}
            onChange={updateText}
            autoComplete="off"
            type="text"
            size="small"
            variant="outlined"
            onBlur={leaveTextField}
            InputProps={{ className: classes.textfield }}
          />
        </div>
      ) : (
        <div
          className={classes.container}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <Typography className={classes.text} variant={variant} gutterBottom>
            {text}
          </Typography>
          {isVisible && (
            <IconButton color="inherit" onClick={() => setEditing(true)} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

Editable.propTypes = {
  text: PropTypes.string.isRequired,
  updateText: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Editable;
