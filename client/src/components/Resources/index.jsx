import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Wrapper from 'components/Wrapper';
import TopBar from 'components/TopBar';
import SignOut from 'components/Login/SignOut';
import TopicsBar from './TopicsBar';
import AddForm from './AddForm';
import Resource from './Resource';
import CustomNavLink from 'components/CustomNavLink';
import Snackbar from 'components/Snackbar';
import { useSnackbar } from 'components/Hooks';

const useStyles = makeStyles(theme => ({
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
  const [topics, setTopics] = useState([]);
  const [snackbar, toggleSnackbar] = useSnackbar();
  const { category, topic } = useParams();

  useEffect(() => {
    const url = '/api/categories';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setCategories(response.result);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const url = `/api/category/${category}/topics`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setTopics(['all'].concat(response.result));
      })
      .catch(error => console.error(error));
  }, [category]);

  useEffect(() => {
    const url = `/api/category/${category}/${topic}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setData(response.result);
      })
      .catch(error => console.error(error));
  }, [category, topic]);

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
        <div>
          <AddForm
            allCategories={categories}
            topics={topics.filter(topic => topic !== 'all')}
            setData={setData}
            toggleSnackbar={toggleSnackbar}
          />
          <SignOut />
        </div>
      </TopBar>
      <TopicsBar openDrawer={openDrawer}>
        <div className={classes.categories}>
          {topics.map((topic, index) => (
            <Typography key={index} className={classes.title} variant="subtitle1" noWrap>
              <CustomNavLink route={`${topic}`}>{topic}</CustomNavLink>
            </Typography>
          ))}
        </div>
      </TopicsBar>
      <Wrapper size="lg">
        <Grid container spacing={4}>
          {data.map((element, id) => (
            <Resource
              key={id}
              url={element.url}
              id={element._id}
              setData={setData}
              toggleSnackbar={toggleSnackbar}
            />
          ))}
        </Grid>
      </Wrapper>
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        text={snackbar.text}
        error={snackbar.error}
      />
    </React.Fragment>
  );
};

Resources.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Resources;
