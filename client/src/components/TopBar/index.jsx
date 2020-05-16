import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuIcon from '@material-ui/icons/Menu';

import AddForm from '../AddForm';
import { capitalize } from '#utils';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1e2732',
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarOpen: {
    zIndex: theme.zIndex.drawer,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    margin: theme.spacing(0, 1),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const CustomNavLink = ({ category, children, ...rest }) => {
  return (
    <NavLink
      {...rest}
      to={`/resources/${category}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      activeStyle={{ color: 'teal' }}
    >
      {children}
    </NavLink>
  );
};

export default ({ open, handleOpen }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:3000/api/categories';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setCategories(response.result);
      })
      .catch(error => console.error(error));
  }, []);

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar
      position="sticky"
      className={clsx(classes.appBar, {
        [classes.appBarOpen]: open,
      })}
    >
      <Toolbar variant="regular" className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.categories}>
          {categories.map((category, index) => (
            <Typography key={index} className={classes.title} variant="h6" noWrap>
              <CustomNavLink category={category}>{capitalize(category)}</CustomNavLink>
            </Typography>
          ))}
        </div>
        <Button
          onClick={handleOpenDrawer}
          className={classes.addButton}
          size="large"
          color="inherit"
          startIcon={<AddCircleIcon />}
        >
          Add
        </Button>
        <AddForm open={openDrawer} handleOpen={handleOpenDrawer} categories={categories} />
      </Toolbar>
    </AppBar>
  );
};
