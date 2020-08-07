import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';

//Mui staff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    float: 'right',
  },
}));

const DeleteItem = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // submitted(false);
  };

  const handleSubmit = (e) => {
    setSubmitted(true);
    if (props.itemId) {
      dispatch(deleteItem(props.itemId));
    }
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Item"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Item name: {props.itemName} <br />
            Item price: {props.itemPrice}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteItem.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default DeleteItem;
