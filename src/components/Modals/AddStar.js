import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { addStar, clearErrors } from '../../redux/actions';
import Validator from '../../utils/inputValidation';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import AddIcon from '@material-ui/icons/Add';

const styles = {
  button: {
    float: 'right',
    color: '#fff',
    fontSize: 14,
    marginRight: 50,
  },
};

class AddStar extends Component {
  state = {
    plain_orders_star_name: '',
    plain_orders_hidden_coordinates: '',
    plain_orders_hidden_id_constellation: '',
    starNameError: '',
    starCoordinatesError: '',
    starConstellationError: '',
    open: false,
    error: {},
  };

  static getDerivedStateFromProps(props) {
    if (props.UI.error) {
      return { error: props.UI.error };
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      error: {},
      plain_orders_star_name: '',
      plain_orders_hidden_coordinates: '',
      plain_orders_hidden_id_constellation: '',
      starNameError: '',
      starCoordinatesError: '',
      starConstellationError: '',
    });
  };

  handleChange = event => {
    this.props.clearErrors();
    this.setState({
      [event.target.name]: event.target.value,
      error: {},
      starNameError: '',
      starCoordinatesError: '',
      starConstellationError: '',
    });
  };

  handleSubmit = () => {
    const {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    } = this.state;

    this.clearValidationErrors();
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

    const addStarData = {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    };

    this.props.addStar(addStarData);
    setTimeout(() => {
      if (
        !(
          this.state.error.starName ||
          this.state.error.startCoordinates ||
          this.state.error.idConstellation
        )
      ) {
        this.handleClose();
      }
    }, 1000);
  };

  displayError = (error, key) => {
    this.setState({ [key]: error });
  };

  clearValidationErrors = () =>
    this.setState(prevState => ({
      ...prevState,
      starNameError: '',
      starCoordinatesError: '',
      starConstellationError: '',
      error: {},
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
      error: { starName, startCoordinates, idConstellation },
    } = this.state;

    return (
      <Fragment>
        <MyButton
          tip='Add Details'
          onClick={this.handleOpen}
          btnClassName={classes.button}
          title='add star'
        >
          <AddIcon />
          Add Star
        </MyButton>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>Add details star</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='plain_orders_star_name'
                tpye='text'
                label='star name'
                placeholder='add Plain order start name'
                helperText={starNameError || starName}
                error={starNameError || starName ? true : false}
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
                helperText={starCoordinatesError || startCoordinates}
                error={starCoordinatesError || startCoordinates ? true : false}
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
                helperText={starConstellationError || idConstellation}
                error={starConstellationError || idConstellation ? true : false}
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

AddStar.propTypes = {
  addStar: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addStar, clearErrors })(
  withStyles(styles)(AddStar)
);
