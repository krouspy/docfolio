import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MicroLink from '@microlink/react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TopBar from '../TopBar';
import AddForm from './AddForm';
import Wrapper from '../Wrapper';
import CustomNavLink from '#customNavLink';

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

const Resources = ({ openDrawer, toggleDrawer }) => {
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
      <TopBar openDrawer={openDrawer} toggleDrawer={toggleDrawer}>
        <div className={classes.categories}>
          {categories.map((category, index) => (
            <Typography key={index} className={classes.title} variant="h6" noWrap>
              <CustomNavLink route={`/resources/${category}`}>{category}</CustomNavLink>
            </Typography>
          ))}
        </div>
        <AddForm categories={categories} />
      </TopBar>
      <Wrapper size="lg">
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

Resources.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Resources;
