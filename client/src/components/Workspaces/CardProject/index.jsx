import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    color: 'white',
    backgroundColor: '#314257',
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 18,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const CustomNavLink = ({ id, children, ...rest }) => {
  return (
    <NavLink
      to={`/workspace/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      activeStyle={{ color: 'teal' }}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export default ({ id, title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="inherit" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <CustomNavLink id={id}>View</CustomNavLink>
      </CardActions>
    </Card>
  );
};
