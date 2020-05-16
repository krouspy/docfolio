import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

export default ({ title, description }) => {
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
        <Button color="inherit" size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};
