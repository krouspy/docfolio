import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import AddForm from '../AddForm';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1e2732',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginRight: theme.spacing(2),
  },
  button: {
    position: 'absolute',
    right: 50,
  },
}));

export default () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const url = 'http://localhost:3000/api/categories';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setCategories(response.result);
      })
      .catch(error => console.error(error));
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar variant="regular" className={classes.toolbar}>
        {categories.map((category, index) => (
          <Typography className={classes.title} variant="h6" noWrap>
            <Link key={index} to={`/${category}`} style={{ color: 'inherit' }}>
              {category}
            </Link>
          </Typography>
        ))}
        <Button
          onClick={handleOpen}
          className={classes.button}
          size="large"
          color="inherit"
          startIcon={<AddCircleIcon />}
        >
          Add
        </Button>
        <AddForm open={open} handleOpen={handleOpen} />
      </Toolbar>
    </AppBar>
  );
};
