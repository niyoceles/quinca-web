import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router-dom';
// import MyButton from '../../utils/MyButton';
//MUI Styles
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteItem from '../Modals/DeleteItem';
import EditItem from '../Modals/EditItem';

const RequestedProforma = props => {
	const history = useHistory();
	dayjs.extend(relativeTime);
	const {
		oneRequest: {
			id,
			client: { names, email, phoneNumber, address, location },
			itemsArray,
			category,
			// itemOwnerId,
			itemDescription,
			status,
			createdAt,
		},
	} = props;

	const handleClickOpen = id => {
		let path = `/proforma/${id}`;
		history.push(path);
	};

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
				{itemsArray.length}
			</TableCell>
			<TableCell align='right' size='small'>
				<DeleteItem itemId={id} itemName={id} />
				<Button onClick={() => handleClickOpen(id)}>View</Button>
				<EditItem
					itemId={id}
					itemName={id}
					category={category}
					itemDescription={itemDescription}
					status={status}
				/>
			</TableCell>
			<TableCell align='right' size='small'>
				{dayjs(createdAt).fromNow()}
			</TableCell>
		</TableRow>
	);
};

RequestedProforma.propTypes = {
	user: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

export default RequestedProforma;
