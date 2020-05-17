import React from 'react';
import { NavLink } from 'react-router-dom';

import { capitalize } from '#utils';

export default ({ route, children, ...rest }) => {
  return (
    <NavLink
      to={route}
      style={{ textDecoration: 'none', color: 'inherit' }}
      activeStyle={{ color: 'teal' }}
      {...rest}
    >
      {capitalize(children)}
    </NavLink>
  );
};
