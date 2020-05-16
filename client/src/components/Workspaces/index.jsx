import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TopBar from '../TopBar';

export default ({ openDrawer, handleOpenDrawer }) => {
  return (
    <React.Fragment>
      <TopBar openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer}>
        <Typography variant="h6" noWrap>
          Workspaces
        </Typography>
        <Button size="large" color="inherit" startIcon={<AddCircleIcon />}>
          Add
        </Button>
      </TopBar>
      <h1 styles={{ marginTop: 300 }}>Workspaces page</h1>
    </React.Fragment>
  );
};
