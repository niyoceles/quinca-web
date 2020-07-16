import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { updateStar } from '../../redux/actions';
import Validator from '../../utils/inputValidation';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  editButton: {
    float: 'right',
  },
};

class EditStar extends Component {
  state = {
    plain_orders_star_name: this.props.starName,
    plain_orders_hidden_coordinates: this.props.starCoordinates,
    plain_orders_hidden_id_constellation: this.props.starConstellation,
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    } = this.state;

    this.clearErrors();
    const starNameError = Validator.validateStarName({
      plain_orders_star_name,
    });
    const starCoordinatesError = Validator.validateStarCoordinates({
      plain_orders_hidden_coordinates,
    });
    const starConstellationError = Validator.validateStarIdConstellation({
      plain_orders_hidden_id_constellation,
    });
    if (starNameError) {
      return this.displayError(starNameError, 'starNameError');
    }
    if (starCoordinatesError) {
      return this.displayError(starCoordinatesError, 'starCoordinatesError');
    }
    if (starConstellationError) {
      return this.displayError(
        starConstellationError,
        'starConstellationError'
      );
    }

    const updatedData = {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    };
    this.props.updateStar(this.props.starId, updatedData);
    this.handleClose();
  };

  displayError = (error, key) => {
    this.setState({ [key]: error });
  };

  clearErrors = () =>
    this.setState(prevState => ({
      ...prevState,
      starNameError: '',
      starCoordinatesError: '',
      starConstellationError: '',
    }));

  render() {
    const { classes } = this.props;
    const {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
      starNameError,
      starCoordinatesError,
      starConstellationError,
      open,
    } = this.state;
    return (
      <Fragment>
        <MyButton
          tip='Edit Details'
          onClick={this.handleOpen}
          btnClassName={classes.editButton}
        >
          <EditIcon color='primary' />
        </MyButton>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='plain_orders_star_name'
                tpye='text'
                label='star name'
                placeholder='edit Plain order start name'
                helperText={starNameError}
                error={starNameError ? true : false}
                className={classes.textField}
                value={plain_orders_star_name}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='plain_orders_hidden_coordinates'
                tpye='text'
                label='coordinates'
                placeholder='plain orders hidden coordinates'
                helperText={starCoordinatesError}
                error={starCoordinatesError ? true : false}
                className={classes.textField}
                value={plain_orders_hidden_coordinates}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='plain_orders_hidden_id_constellation'
                tpye='text'
                label='Hidden Id constellation'
                placeholder='plain orders hidden id constellation'
                helperText={starConstellationError}
                error={starConstellationError ? true : false}
                className={classes.textField}
                value={plain_orders_hidden_id_constellation}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditStar.propTypes = {
  updateStar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { updateStar })(
  withStyles(styles)(EditStar)
);
