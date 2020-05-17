import React from 'react';
import CardProject from '../CardProject';

export default ({ workspaces }) => {
  return (
    <React.Fragment>
      {workspaces.map(workspace => {
        const { id, title, description } = workspace;
        return <CardProject key={id} id={id} title={title} description={description} />;
      })}
    </React.Fragment>
  );
};
