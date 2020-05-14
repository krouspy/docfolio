import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MicroLink from '@microlink/react';

import TopBar from '../TopBar';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#1e2732',
    overflow: 'auto',
  },
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
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const { category } = useParams();
  console.log(category);

  useEffect(() => {
    const url = `http://localhost:3000/api/category/${category}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const result = response.result;
        setData(result);
      })
      .catch(error => console.error(error));
  }, [category]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
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
    </div>
  );
};
