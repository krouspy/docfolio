import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Editable from '../Editable';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Section = ({ title, content, updateSection }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Editable text={title} updateText={updateSection} name="title" variant="h5" />
      <Editable text={content} updateText={updateSection} name="content" variant="subtitle1" />
    </Paper>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Section;
