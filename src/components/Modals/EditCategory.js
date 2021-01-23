import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import { makeStyles } from '@material-ui/core/styles';
// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../redux/actions';

// import Validator from '../../utils/inputValidation';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	textField: {
		margin: '10px auto 10px auto',
	},
	formControl: {
		margin: '10px auto 10px auto',
		minWidth: '100%',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
const EditCategory = props => {
	const classes = useStyles();
	const { name, itemId } = props;

	const [newName, setnewName] = useState('');
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const itemSubmitted = useSelector(state => state.item.updateItemSuccess);
	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();

		setSubmitted(true);
		if (name) {
			const itemData = {
				name,
			};
			console.log('send', itemData);
			dispatch(updateCategory(itemId, itemData));
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const isRequired = <Alert severity='error'>is required</Alert>;

	return (
		<Fragment>
			<MyButton
				tip='Edit item'
				onClick={handleOpen}
				btnClassName={classes.deleteButton}
			>
				<EditIcon color='primary' />
			</MyButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle>Update item details</DialogTitle>
				{itemSubmitted && <Alert severity='success'>{itemSubmitted}</Alert>}
				<DialogContent>
					<form>
						<TextField
							name='name'
							tpye='text'
							label='item name'
							placeholder='add item/ material'
							helperText={submitted && !name ? isRequired : null}
							error={submitted && !name ? 'is invalid' : null}
							className={classes.textField}
							value={name}
							onChange={e => setnewName(e.target.value)}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleSubmit} color='primary'>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

EditCategory.propTypes = {
	updateItem: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

export default EditCategory;
