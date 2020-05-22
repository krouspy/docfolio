import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { capitalize } from '#utils';

const CustomNavLink = ({ route, children, ...rest }) => {
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

CustomNavLink.propTypes = {
  route: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default CustomNavLink;
