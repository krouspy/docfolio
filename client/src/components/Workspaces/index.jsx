import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import TopBar from '../TopBar';
import CreateWorkspace from './CreateWorkspace';
import Wrapper from '../Wrapper';
import Cards from './Cards';
import Workspace from './Workspace';

export default ({ openDrawer, handleOpenDrawer }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const { path } = useRouteMatch();

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
        <CreateWorkspace totalWorkspaces={workspaces.length} />
      </TopBar>
      <Wrapper>
        <Switch>
          <Route exact path={path}>
            <Cards workspaces={workspaces} />
          </Route>
          <Route path={`${path}/:workspaceId`}>
            <Workspace />
          </Route>
        </Switch>
      </Wrapper>
    </React.Fragment>
  );
};
