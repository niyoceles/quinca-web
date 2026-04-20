import 'dotenv/config';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions';

// import Validator from '../../utils/inputValidation';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

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
const AddCategory = () => {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const categorySubmitted = useSelector(
		state => state.category.addCategorySuccess
	);

	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();

		setSubmitted(true);
		if (name) {
			const categoryData = {
				name,
			};
			dispatch(addCategory(categoryData));
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		window.location.reload();
	};

	const isRequired = <Alert severity='error'>is required</Alert>;

	return (
		<Fragment>
			<Button variant='contained' color='primary' onClick={handleOpen}>
				<AddIcon />
				Add Category
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle>Add category name</DialogTitle>
				{categorySubmitted && (
					<Alert severity='success'>{categorySubmitted}</Alert>
				)}
				<DialogContent>
					<form>
						<TextField
							name='name'
							type='text'
							label='category name'
							placeholder='add category name'
							helperText={submitted && !name ? isRequired : null}
							error={submitted && !name ? 'is invalid' : null}
							className={classes.textField}
							value={name}
							onChange={e => setName(e.target.value)}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Cancel
					</Button>
					{!categorySubmitted ? (
						<Button onClick={handleSubmit} color='primary'>
							Save
						</Button>
					) : null}
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

AddCategory.propTypes = {
	addCategory: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

export default AddCategory;
