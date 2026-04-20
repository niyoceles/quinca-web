import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { signupUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	progress: {
		position: 'absolute'
	}
}));

const Signup = props => {
	const classes = useStyles();
	const [user, setUser] = useState({
		names: '',
		phoneNumber: '',
		email: '',
		password: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const registering = useSelector(state => state.auth.signupData);
	const registerFailure = useSelector(state => state.auth.signupFailure);
	const registerSuccess = useSelector(state => state.auth.signupSuccess);
	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		setSubmitted(true);
		if (user.names && user.phoneNumber && user.email && user.password) {
			dispatch(signupUser(user));
		}
	};

	if (registerSuccess) {
		setTimeout(() => {
			return <Redirect to='/supplier' />;
		}, 3000);
	}

	return (
		<div className={classes.paper}>
			<Typography component='h1' variant='h5'>
				Create an Account
			</Typography>
			{registerSuccess && <Alert severity='success'>{registerSuccess}</Alert>}
			{registerSuccess && (
				<Alert severity='info'>
					Please check your Email to verify your account
				</Alert>
			)}
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
					name='password'
					helperText={submitted && !user.password ? 'is invalid' : null}
					value={user.password}
					error={submitted && !user.password ? 'is-invalid' : null}
					onChange={handleChange}
					label='Password'
					type='password'
					id='password'
				/>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					className={classes.submit}>
					{registering && (
						<CircularProgress size={30} className={classes.progress} />
					)}
					Sign Up
				</Button>
				{registerFailure && <Alert severity='error'>{registerFailure}</Alert>}
				<Grid container>
					<Grid item xs>
						<Link href='#' variant='body2'>
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href='/login' variant='body2'>
							{'Have an account? Sign in'}
						</Link>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Signup;
