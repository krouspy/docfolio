import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDialog } from 'components/Hooks';

const useStyles = makeStyles(theme => ({
  deleteIcon: {
    'position': 'absolute',
    'zIndex': 1,
    'right': theme.spacing(3),
    'bottom': 22,
    '&:hover': {
      color: '#e63946',
    },
  },
}));

const DeleteResource = ({ deleteResource }) => {
  const classes = useStyles();
  const [open, toggleOpen] = useDialog();

  return (
    <React.Fragment>
      <IconButton size="small" className={classes.deleteIcon} onClick={toggleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>The Resource will be deleted. Are you sure ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} color="primary">
            Discard
          </Button>
          <Button onClick={deleteResource} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

DeleteResource.propTypes = {
  deleteResource: PropTypes.func.isRequired,
};

export default DeleteResource;
