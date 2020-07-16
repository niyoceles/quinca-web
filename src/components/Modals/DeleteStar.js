import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';

//Mui staff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteStar } from '../../redux/actions';

const styles = {
  deleteButton: {
    float: 'right',
  },
};

class DeleteStar extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  deleteStar = () => {
    this.props.deleteStar(this.props.starId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip='Delete Star'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Are you sure you want to delete this star?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Star name: {this.props.starName} <br />
              Star Coordinates:{this.props.starCoordinates}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.deleteStar} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteStar.propTypes = {
  deleteStar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  starId: PropTypes.number.isRequired,
};

export default connect(null, { deleteStar })(withStyles(styles)(DeleteStar));
