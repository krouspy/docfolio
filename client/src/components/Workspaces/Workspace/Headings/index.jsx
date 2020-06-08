import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  list: {
    '& > *': {
      color: 'white',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Headings = ({ workspaceId }) => {
  const classes = useStyles();
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const url = `/api/workspace/${workspaceId}/headings`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const { statusCode, result } = response;
        if (statusCode === 200) {
          setHeadings(result);
        }
      })
      .catch(error => console.error(error));
  }, [workspaceId]);

  return (
    <div className={classes.root}>
      <List
        component="nav"
        subheader={<ListSubheader>On this page</ListSubheader>}
        className={classes.list}
      >
        {headings.map((heading, index) => (
          <ListItem key={index} button>
            <ListItemText color="inherit" primary={heading} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Headings.propTypes = {
  workspaceId: PropTypes.string.isRequired,
};

export default Headings;
