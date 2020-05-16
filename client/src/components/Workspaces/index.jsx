import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TopBar from '../TopBar';
import Wrapper from '../Wrapper';
import Project from './Project';

export default ({ openDrawer, handleOpenDrawer }) => {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:3000/api/workspaces';
    fetch(url)
      .then(response => response.json())
      .then(response => setWorkspaces(response.result))
      .catch(error => console.log(error));
  }, []);

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
      <Wrapper>
        {workspaces.map((workspace, index) => (
          <Project key={index} title={workspace.title} description={workspace.description} />
        ))}
      </Wrapper>
    </React.Fragment>
  );
};
