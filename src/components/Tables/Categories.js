import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditCategory from '../Modals/EditCategory';
const Categories = props => {
	dayjs.extend(relativeTime);
	const {
		category: { id, name, status, createdAt },
	} = props;

	return (
		<TableRow key={id}>
			<TableCell component='th' scope='row' size='small'>
				{name}
			</TableCell>
			<TableCell align='right' size='small'>
				{status ? 'Active' : 'Desactive'}
			</TableCell>
			<TableCell align='right' size='small'>
				{dayjs(createdAt).fromNow()}
			</TableCell>
			<TableCell align='right' size='small'>
				{/* <DeleteCategory itemId={id} name={name} itemPrice={itemPrice} /> */}
				<EditCategory itemId={id} name={name} status={status} />
			</TableCell>
		</TableRow>
	);
};

Categories.propTypes = {
	user: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

export default Categories;
