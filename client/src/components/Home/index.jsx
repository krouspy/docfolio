import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MicroLink from '@microlink/react';

import TopBar from '../TopBar';
import Drawer from '../Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#1e2732',
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
  const [open, setOpen] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const url = `http://localhost:3000/api/category/${category}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setData(response.result);
      })
      .catch(error => console.error(error));
  }, [category]);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar open={open} handleOpen={handleOpen} />
      <Drawer open={open} handleOpen={handleOpen} />
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
