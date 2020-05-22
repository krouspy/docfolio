import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CustomNavLink from '#customNavLink';

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

const CardWorkspace = ({ id, title, description }) => {
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
        <CustomNavLink route={`/workspaces/${id}`}>View</CustomNavLink>
      </CardActions>
    </Card>
  );
};

CardWorkspace.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardWorkspace;
