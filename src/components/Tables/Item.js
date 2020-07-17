import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import MyButton from '../../utils/MyButton';
//MUI Styles
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DeleteStar from '../Modals/DeleteItem';
import EditStar from '../Modals/EditItem';

// import StarDialog from './StarDialog';
import { connect } from 'react-redux';

const styles = {};

class Stars extends Component {
	render() {
		dayjs.extend(relativeTime);
		const {
			star: {
				id,
				itemName,
				itemImage,
				// itemImage2,
				itemType,
				// itemOwnerId,
				// itemDescription,
				// status,
				itemPrice,
				createdAt,
			},
		} = this.props;

		return (
			<TableRow key={id}>
				<TableCell component='th' scope='row' size='small'>
					{itemName}
				</TableCell>
				<TableCell align='right' size='small'>
					{itemImage}
				</TableCell>
				<TableCell align='right' size='small'>
					{itemType}
				</TableCell>
				<TableCell align='right' size='small'>
					{itemPrice}
				</TableCell>
				<TableCell align='right' size='small'>
					{dayjs(createdAt).fromNow()}
				</TableCell>
				<TableCell align='right' size='small'>
					<DeleteStar
						starId={id}
						starName={itemName}
						starCoordinates={itemType}
					/>
					<EditStar
						starId={id}
						starName={itemName}
						starCoordinates={itemType}
						starConstellation={itemPrice}
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
