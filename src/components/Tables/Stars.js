import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import MyButton from '../../utils/MyButton';
//MUI Styles
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DeleteStar from '../Modals/DeleteStar';
import EditStar from '../Modals/EditStar';

// import StarDialog from './StarDialog';
import { connect } from 'react-redux';

const styles = {};

class Stars extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      star: {
        order_id,
        plain_orders_star_name,
        plain_orders_hidden_coordinates,
        plain_orders_hidden_id_constellation,
        createdAt,
      },
    } = this.props;

    return (
      <TableRow key={order_id}>
        <TableCell component='th' scope='row' size='small'>
          {plain_orders_star_name}
        </TableCell>

        <TableCell align='right' size='small'>{plain_orders_hidden_coordinates}</TableCell>
        <TableCell align='right' size='small'>
          {plain_orders_hidden_id_constellation}
        </TableCell>
        <TableCell align='right' size='small'>{dayjs(createdAt).fromNow()}</TableCell>
        <TableCell align='right' size='small'>
          <DeleteStar
            starId={order_id}
            starName={plain_orders_star_name}
            starCoordinates={plain_orders_hidden_coordinates}
          />
          <EditStar
            starId={order_id}
            starName={plain_orders_star_name}
            starCoordinates={plain_orders_hidden_coordinates}
            starConstellation={plain_orders_hidden_id_constellation}
          />
        </TableCell>
      </TableRow>
    );
  }
}

Stars.propTypes = {
  user: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Stars));
