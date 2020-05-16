import React, { useState, useEffect } from 'react';
import MicroLink from '@microlink/react';
import { NavLink, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddForm from '../AddForm';

import { capitalize } from '#utils';
import TopBar from '../TopBar';
import Wrapper from '../Wrapper';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#133262',
    color: 'white',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    margin: theme.spacing(0, 1),
  },
}));

const CustomNavLink = ({ category, children, ...rest }) => {
  return (
    <NavLink
      to={`/resources/${category}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      activeStyle={{ color: 'teal' }}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export default ({ openDrawer, handleOpenDrawer }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const url = 'http://localhost:3000/api/categories';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setCategories(response.result);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const url = `http://localhost:3000/api/category/${category}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setData(response.result);
      })
      .catch(error => console.error(error));
  }, [category]);

  return (
    <React.Fragment>
      <TopBar openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer}>
        <div className={classes.categories}>
          {categories.map((category, index) => (
            <Typography key={index} className={classes.title} variant="h6" noWrap>
              <CustomNavLink category={category}>{capitalize(category)}</CustomNavLink>
            </Typography>
          ))}
        </div>
        <AddForm categories={categories} />
      </TopBar>
      <Wrapper>
        <Grid container spacing={4}>
          {data.map((element, id) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <MicroLink url={element.url} size="large" />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
};
