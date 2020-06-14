import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/ExitToApp';

export default () => {
  const logout = () => {
    const token = localStorage.getItem('docfolio-token');
    console.log(token);
    localStorage.removeItem('docfolio-token');
    window.location.href = '/';
  };

  return (
    <IconButton onClick={logout} color="inherit">
      <LogoutIcon />
    </IconButton>
  );
};
