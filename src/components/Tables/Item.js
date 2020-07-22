import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import MyButton from '../../utils/MyButton';
//MUI Styles
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DeleteItem from '../Modals/DeleteItem';
import EditItem from '../Modals/EditItem';

// import ItemDialog from './ItemDialog';
import { connect } from 'react-redux';

const styles = {};

class Items extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      item: {
        id,
        itemName,
        itemImage,
        itemImage2,
        itemType,
        // itemOwnerId,
        itemDescription,
        status,
        itemPrice,
        createdAt,
      },
    } = this.props;

    return (
      <TableRow key={id}>
        <TableCell component="th" scope="row" size="small">
          {itemName}
        </TableCell>
        <TableCell align="right" size="small">
          <img
            width="100"
            height="60"
            src={itemImage}
            alt=""
            className="edit-img"
          />
        </TableCell>
        <TableCell align="right" size="small">
          {itemType}
        </TableCell>
        <TableCell align="right" size="small">
          {itemPrice}
        </TableCell>
        <TableCell align="right" size="small">
          {dayjs(createdAt).fromNow()}
        </TableCell>
        <TableCell align="right" size="small">
          <DeleteItem itemId={id} itemName={itemName} itemType={itemPrice} />
          <EditItem
            itemId={id}
            itemName={itemName}
            itemType={itemType}
            itemPrice={itemPrice}
            itemImage={itemImage}
            itemImage2={itemImage2}
            itemDescription={itemDescription}
            status={status}
          />
        </TableCell>
      </TableRow>
    );
  }
}

Items.propTypes = {
  user: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Items));
