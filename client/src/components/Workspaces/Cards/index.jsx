import React from 'react';
import PropTypes from 'prop-types';
import CardWorkspace from '../CardWorkspace';

const Cards = ({ workspaces }) => {
  return (
    <React.Fragment>
      {workspaces.map(workspace => {
        const { id, title, description } = workspace;
        return <CardWorkspace key={id} id={id} title={title} description={description} />;
      })}
    </React.Fragment>
  );
};

Cards.propTypes = {
  workspaces: PropTypes.arrayOf(PropTypes.object),
};

export default Cards;
