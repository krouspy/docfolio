import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import TopBar from '../TopBar';
import CreateWorkspace from './CreateWorkspace';
import Wrapper from '../Wrapper';
import Cards from './Cards';
import Workspace from './Workspace';

const Workspaces = ({ openDrawer, toggleDrawer }) => {
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
      <TopBar openDrawer={openDrawer} toggleDrawer={toggleDrawer}>
        <Typography variant="h6" noWrap>
          Workspaces
        </Typography>
        <CreateWorkspace totalWorkspaces={workspaces.length} />
      </TopBar>
      <Wrapper size="md">
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

Workspaces.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Workspaces;
