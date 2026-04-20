import 'dotenv/config';
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import MyButton from '../../utils/MyButton';
import { makeStyles } from '@material-ui/core/styles';
// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { updateMyProfile } from '../../redux/actions';

// import Validator from '../../utils/inputValidation';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
// import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
const EditProfile = props => {
	const classes = useStyles();

	const [user, setUser] = useState({
		names: props.user.names,
		phoneNumber: props.user.phoneNumber,
		email: props.user.email,
		description: props.user.description,
		nationalId: props.user.nationalId,
		organization: props.user.organization,
		country: props.user.country,
		supplierType: props.user.supplierType,
		state: props.user.state,
		city: props.user.city,
		address: props.user.address,
		location: props.user.location,
		birthDate: props.user.birthDate,
	});

	const [submitted, setSubmitted] = useState(false);
	const registering = useSelector(state => state.auth.signupData);
	const registerFailure = useSelector(state => state.auth.signupFailure);
	const itemSubmitted = useSelector(state => state.item.addItemSuccess);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	console.log('this is user:', props.user);
	const handleSubmit = e => {
		e.preventDefault();

		setSubmitted(true);
		const {
			names,
			nationalId,
			phoneNumber,
			email,
			organization,
			country,
			description,
			supplierType,
			state,
			city,
			address,
			location,
			birthDate,
		} = user;
		if (names && description && names && localStorage.imageUrl) {
			const data = {
				names,
				nationalId,
				phoneNumber,
				email,
				organization,
				country,
				description,
				supplierType,
				state,
				city,
				address,
				location,
				birthDate,
			};
			dispatch(updateMyProfile(data));
		}
	};

	if (itemSubmitted) {
		setTimeout(() => {
			localStorage.removeItem('imageUrl');
		}, 1000);
	}

	const uploadFile = ({ target: { files } }) => {
		let data = new FormData();
		data.append('file', files[0]);
		data.append('tags', `celestin, image`);
		data.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own
		data.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
		data.append('timestamp', (Date.now() / 1000) | 0);

		const options = {
			onUploadProgress: progressEvent => {
				const { loaded, total } = progressEvent;
				let percent = Math.floor((loaded * 100) / total);
				console.log(`${loaded}kb of ${total}kb | ${percent}%`);
			},
		};

		axios
			.post(
				`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/image/upload`,
				data,
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
		<form className={classes.form} noValidate onSubmit={handleSubmit}>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				id='names'
				label='Full Name'
				name='names'
				value={user.names}
				helperText={submitted && !user.names ? 'is invalid' : null}
				error={submitted && !user.names ? 'is-invalid' : null}
				onChange={handleChange}
				autoComplete='names'
				autoFocus
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				id='phoneNumber'
				label='Phone number'
				name='phoneNumber'
				value={user.phoneNumber}
				helperText={submitted && !user.phoneNumber ? 'is invalid' : null}
				error={submitted && !user.phoneNumber ? 'is-invalid' : null}
				onChange={handleChange}
				autoComplete='phoneNumber'
				autoFocus
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				id='email'
				label='Email Address'
				name='email'
				value={user.email}
				helperText={submitted && !user.email ? 'is invalid' : null}
				error={submitted && !user.email ? 'is-invalid' : null}
				onChange={handleChange}
				autoComplete='email'
				autoFocus
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				name='organization'
				helperText={submitted && !user.organization ? 'is invalid' : null}
				value={user.organization}
				error={submitted && !user.organization ? 'is-invalid' : null}
				onChange={handleChange}
				label='organization'
				type='text'
				id='organization'
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				name='National Id'
				helperText={submitted && !user.nationalId ? 'is invalid' : null}
				value={user.nationalId}
				error={submitted && !user.nationalId ? 'is-invalid' : null}
				onChange={handleChange}
				label='nationalId'
				type='text'
				id='nationalId'
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				name='country'
				helperText={submitted && !user.country ? 'is invalid' : null}
				value={user.country}
				error={submitted && !user.country ? 'is-invalid' : null}
				onChange={handleChange}
				label='country'
				type='text'
				id='country'
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				name='state'
				helperText={submitted && !user.state ? 'is invalid' : null}
				value={user.state}
				error={submitted && !user.state ? 'is-invalid' : null}
				onChange={handleChange}
				label='state'
				type='text'
				id='state'
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				name='location'
				helperText={submitted && !user.location ? 'is invalid' : null}
				value={user.location}
				error={submitted && !user.location ? 'is-invalid' : null}
				onChange={handleChange}
				label='location'
				type='text'
				id='location'
			/>
			<TextField
				variant='outlined'
				margin='normal'
				required
				fullWidth
				name='address'
				helperText={submitted && !user.address ? 'is invalid' : null}
				value={user.address}
				error={submitted && !user.address ? 'is-invalid' : null}
				onChange={handleChange}
				label='address'
				type='text'
				id='address'
			/>
			<FormControl className={classes.formControl}>
				<InputLabel id='select-label'>Supplier type on</InputLabel>
				<Select
					name='supplierType'
					labelId='select-label'
					id='select'
					helperText={submitted && !user.supplierType ? isRequired : null}
					error={submitted && !user.supplierType ? 'is invalid' : null}
					value={user.supplierType}
					onChange={handleChange}
					fullWidth
				>
					<MenuItem value={'hotel'}>Hotel</MenuItem>
					<MenuItem value={'car'}>Transport car</MenuItem>
					<MenuItem value={'tour'}>Tour package</MenuItem>
				</Select>
			</FormControl>

			<div className='container' style={{ paddingBottom: 25 }}>
				<input
					type='file'
					accept='image/*'
					className='form-control profile-pic-uploader'
					onChange={uploadFile}
					required
				/>
				{submitted && !localStorage.imageUrl && (
					<Alert severity='error'>profile image is required</Alert>
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
				name='description'
				type='text'
				label='description organization'
				multiline
				rows='3'
				placeholder='Description of your organization'
				className={classes.textField}
				helperText={submitted && !user.description ? isRequired : null}
				error={submitted && !user.description ? 'is invalid' : null}
				value={user.description}
				onChange={handleChange}
				fullWidth
			/>
			<Button
				type='submit'
				fullWidth
				variant='contained'
				color='primary'
				className={classes.submit}
			>
				{registering && (
					<CircularProgress size={30} className={classes.progress} />
				)}
				Update profile
			</Button>
			{registerFailure && <Alert severity='error'>{registerFailure}</Alert>}
		</form>
	);
};

EditProfile.propTypes = {
	updateItem: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

export default EditProfile;
