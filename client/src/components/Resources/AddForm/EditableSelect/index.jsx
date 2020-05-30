import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { capitalize } from '#utils';

const EditableSelect = ({ name, list, value, handleChange, helper }) => {
  const [select, setSelect] = useState(false);

  const toggleSelect = () => {
    setSelect(!select);
  };

  return (
    <TextField
      fullWidth
      name={name}
      select={!select}
      value={value}
      onChange={handleChange}
      label={select ? `Create ${name}` : `Select ${name}`}
      variant="outlined"
      margin="dense"
      helperText={helper && `Click on left icon to toggle Select`}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleSelect}
              style={{ marginRight: -12 }}
            >
              <AddCircleIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    >
      {list.map(option => (
        <MenuItem key={option} value={option}>
          {capitalize(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

EditableSelect.propTypes = {
  name: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EditableSelect;
