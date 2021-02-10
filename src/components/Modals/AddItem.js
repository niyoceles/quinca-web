import 'dotenv/config';
import React, { Fragment, useState } from 'react';
import axios from 'axios';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// Icons
import AddIcon from '@material-ui/icons/Add';

const {
	REACT_APP_CLOUDINARY_NAME,
	REACT_APP_CLOUDINARY_API_KEY,
	REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} = process.env;

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
const AddItem = () => {
	const classes = useStyles();
	const [item, setItem] = useState({
		itemName: '',
		category: '',
		itemDescription: '',
		itemPrice: '',
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
		const { itemName, category, itemDescription, itemPrice } = item;
		if (itemName && itemDescription && itemPrice && localStorage.imageUrl) {
			const itemData = {
				itemName,
				itemImage: localStorage.imageUrl,
				category,
				itemDescription,
				itemPrice,
				status: true,
			};
			dispatch(addItem(itemData));
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		window.location.reload();
	};

	if (itemSubmitted) {
		setTimeout(() => {
			handleClose();
			localStorage.removeItem('imageUrl');
		}, 1000);
	}

	const uploadFile = async ({ target: { files } }) => {
		let data = new FormData();
		data.append('file', files[0]);
		data.append('tags', `celestin, image`);
		data.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own
		data.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
		data.append('timestamp', (Date.now() / 1000) | 0);
		data.append('folder', 'QUINCAPARADI/ITEMS');

		const options = {
			onUploadProgress: progressEvent => {
				const { loaded, total } = progressEvent;
				let percent = Math.floor((loaded * 100) / total);
				console.log(`${loaded}kb of ${total}kb | ${percent}%`);
			},
		};

		await axios
			.post(
				`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/image/upload`,
				data,
				{
					headers: { 'X-Requested-With': 'XMLHttpRequest' },
				},
				options
			)
			.then(res => {
				console.log('UPLOADED', res.data.url);
				localStorage.setItem('imageUrl', res.data.url);
			});
	};

	const linkImage = localStorage.imageUrl;
	const isRequired = <Alert severity='error'>is required</Alert>;

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
							placeholder='add item name'
							helperText={submitted && !item.itemName ? isRequired : null}
							error={submitted && !item.itemName ? 'is invalid' : null}
							className={classes.textField}
							value={item.itemName}
							onChange={handleChange}
							fullWidth
						/>
						<FormControl className={classes.formControl}>
							<InputLabel id='select-label'>Item category</InputLabel>
							<Select
								name='category'
								labelId='select-label'
								id='select'
								helperText={submitted && !item.category ? isRequired : null}
								error={submitted && !item.category ? 'is invalid' : null}
								value={item.category}
								onChange={handleChange}
								fullWidth
							>
								<MenuItem value={'construction'}>construction</MenuItem>
								<MenuItem value={'electricity'}>electricity</MenuItem>
								<MenuItem value={'plumbing'}>plumbing</MenuItem>
							</Select>
						</FormControl>
						<TextField
							name='itemPrice'
							tpye='number'
							label='item price'
							placeholder='item price'
							className={classes.textField}
							helperText={submitted && !item.itemPrice ? isRequired : null}
							error={submitted && !item.itemPrice ? 'is invalid' : null}
							value={item.itemPrice}
							onChange={handleChange}
							fullWidth
						/>

						<div className='container' style={{ paddingBottom: 25 }}>
							<input
								type='file'
								accept='image/*'
								className='form-control profile-pic-uploader'
								onChange={uploadFile}
								required
							/>
							{submitted && !localStorage.imageUrl && (
								<Alert severity='error'>item image is required</Alert>
							)}
						</div>
						<div>
							<img
								width='300'
								height='150'
								src={linkImage ? linkImage : null}
								alt=''
								className='edit-img'
							/>
						</div>
						<TextField
							name='itemDescription'
							tpye='text'
							label='item description'
							multiline
							rows='3'
							placeholder='Item description'
							className={classes.textField}
							helperText={
								submitted && !item.itemDescription ? isRequired : null
							}
							error={submitted && !item.itemDescription ? 'is invalid' : null}
							value={item.itemDescription}
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
