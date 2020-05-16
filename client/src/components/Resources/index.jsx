import React, { useState, useEffect } from 'react';
import MicroLink from '@microlink/react';
import { NavLink, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddForm from '../AddForm';

import { capitalize } from '#utils';
import TopBar from '../TopBar';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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
  const [addOpen, setAddOpen] = useState(false);
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

  const handleAddOpen = () => {
    setAddOpen(!addOpen);
  };

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
        <Button onClick={handleAddOpen} size="large" color="inherit" startIcon={<AddCircleIcon />}>
          Add
        </Button>
        <AddForm open={addOpen} handleOpen={handleAddOpen} categories={categories} />
      </TopBar>

      <main>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            {data.map((element, id) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <MicroLink url={element.url} size="large" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};
