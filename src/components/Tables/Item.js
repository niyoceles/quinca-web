import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteItem from '../Modals/DeleteItem';
import EditItem from '../Modals/EditItem';
const Items = props => {
	dayjs.extend(relativeTime);
	const {
		item: {
			id,
			itemName,
			itemImage,
			itemImage2,
			category,
			// itemOwnerId,
			itemDescription,
			status,
			itemPrice,
			createdAt,
		},
	} = props;

	return (
		<TableRow key={id}>
			<TableCell component='th' scope='row' size='small'>
				{itemName}
			</TableCell>
			<TableCell align='right' size='small'>
				<img
					width='100'
					height='60'
					src={itemImage}
					alt=''
					className='edit-img'
				/>
			</TableCell>
			<TableCell align='right' size='small'>
				{category}
			</TableCell>
			<TableCell align='right' size='small'>
				{itemPrice}
			</TableCell>
			<TableCell align='right' size='small'>
				{dayjs(createdAt).fromNow()}
			</TableCell>
			<TableCell align='right' size='small'>
				<DeleteItem itemId={id} itemName={itemName} itemPrice={itemPrice} />
				<EditItem
					itemId={id}
					itemName={itemName}
					category={category}
					itemPrice={itemPrice}
					itemImage={itemImage}
					itemImage2={itemImage2}
					itemDescription={itemDescription}
					status={status}
				/>
			</TableCell>
		</TableRow>
	);
};

Items.propTypes = {
	user: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

export default Items;
