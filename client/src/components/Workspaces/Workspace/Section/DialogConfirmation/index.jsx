import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: 18,
  },
  button: {
    margin: theme.spacing(0, 1),
  },
}));

const DialogConfirmation = ({ open, toggle, deleteSection }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={toggle} fullWidth>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent dividers className={classes.content}>
        The section will be deleted
      </DialogContent>
      <DialogActions>
        <Button
          onClick={deleteSection}
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
};

export default DialogConfirmation;
