import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/actions';

// import Validator from '../../utils/inputValidation';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	textField: {
		margin: '10px auto 10px auto',
	},
}));
const AddItem = () => {
	const classes = useStyles();
	const [item, setItem] = useState({
		itemName: '',
		itemImage: '',
		itemType: '',
		itemDescription: '',
		itemPrice: '',
		status: true,
	});

	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const itemSubmitted = useSelector(state => state.item.addItemSuccess);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setItem(item => ({ ...item, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		setSubmitted(true);
		if (item.itemName && item.itemDescription && item.itemPrice) {
			dispatch(addItem(item));
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	if (itemSubmitted) {
		setTimeout(() => {
			handleClose();
		}, 1000);
	}
	return (
		<Fragment>
			<Button variant='contained' color='primary' onClick={handleOpen}>
				<AddIcon />
				Add Item
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle>Add item details</DialogTitle>
				{itemSubmitted && <Alert severity='success'>{itemSubmitted}</Alert>}
				<DialogContent>
					<form>
						<TextField
							name='itemName'
							tpye='text'
							label='item name'
							placeholder='add Plain order start name'
							helperText={submitted && !item.itemName ? 'is invalid' : null}
							error={submitted && !item.itemName ? 'is invalid' : null}
							className={classes.textField}
							value={item.itemName}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name='itemType'
							tpye='text'
							label='item type'
							placeholder='Item type'
							className={classes.textField}
							helperText={submitted && !item.itemType ? 'is invalid' : null}
							error={submitted && !item.itemType ? 'is invalid' : null}
							value={item.itemType}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name='itemPrice'
							tpye='text'
							label='item price'
							placeholder='item price'
							className={classes.textField}
							helperText={submitted && !item.itemPrice ? 'is invalid' : null}
							error={submitted && !item.itemPrice ? 'is invalid' : null}
							value={item.itemPrice}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name='itemDescription'
							tpye='text'
							label='item description'
							placeholder='Item description'
							className={classes.textField}
							helperText={
								submitted && !item.itemDescription ? 'is invalid' : null
							}
							error={submitted && !item.itemDescription ? 'is invalid' : null}
							value={item.itemDescription}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name='itemImage'
							tpye='text'
							label='item Image'
							placeholder='Image'
							className={classes.textField}
							helperText={submitted && !item.itemImage ? 'is invalid' : null}
							error={submitted && !item.itemImage ? 'is invalid' : null}
							value={item.itemImage}
							onChange={handleChange}
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

AddItem.propTypes = {
	addItem: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

export default AddItem;
