import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import MyButton from '../../utils/MyButton';
//MUI Styles
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteItem from '../Modals/DeleteItem';
import EditItem from '../Modals/EditItem';

const Requested = props => {
	dayjs.extend(relativeTime);
	const {
		oneRequest: {
			id,
			client: { names, email, phoneNumber, address, location },
			clientEmail,
			itemImage,
			itemImage2,
			category,
			// itemOwnerId,
			itemDescription,
			status,
			createdAt,
		},
	} = props;

	return (
		<TableRow key={id}>
			<TableCell component='th' scope='row' size='small'>
				{names}
			</TableCell>
			<TableCell align='right' size='small'>
				{phoneNumber}
			</TableCell>
			<TableCell align='right' size='small'>
				{email}
			</TableCell>
			<TableCell align='right' size='small'>
				{location}
			</TableCell>
			<TableCell align='right' size='small'>
				{dayjs(createdAt).fromNow()}
			</TableCell>
			<TableCell align='right' size='small'>
				<DeleteItem itemId={id} itemName={id} />
				<EditItem
					itemId={id}
					itemName={id}
					category={category}
					itemImage={itemImage}
					itemImage2={itemImage2}
					itemDescription={itemDescription}
					status={status}
				/>
			</TableCell>
		</TableRow>
	);
};

Requested.propTypes = {
	user: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

export default Requested;
