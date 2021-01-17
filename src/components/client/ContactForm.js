/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { sendContactEmail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
	container: {
		margin: 0,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 15,
		paddingBottom: 15,
		flexGrow: 1,
	},
	button: {
		color: 'white',
		marginTop: 20,
		marginBottom: 20,
	},
}));

const ContactForm = () => {
	const classes = useStyles();
	const [validated, setValidated] = useState(false);
	const [user, setUser] = useState({
		names: '',
		email: '',
		subject: '',
		message: '',
	});
	const loading = useSelector(state => state.contact.contactData);
	const contactFailed = useSelector(state => state.contact.contactFailure);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const handleSubmit = e => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}
		e.preventDefault();
		setValidated(true);
		if (user.email && user.message) {
			dispatch(sendContactEmail(user));
		}
		if (!loading && contactFailed === null) {
			setTimeout(function () {
				setUser({
					names: '',
					email: '',
					subject: '',
					message: '',
				});
				setValidated(false);
			}, 1500);
		}
	};

	return (
		<Paper className={classes.container}>
			<form noValidate validated={validated} onSubmit={handleSubmit}>
				<Grid
					container
					direction='column'
					md={12}
					lg={12}
					spacing={2}
					justify='center'
				>
					<h2 style={{ marginBottom: 0 }}>Feel free to contact us</h2>
					<TextField
						id='names'
						label='NAME'
						margin='normal'
						name='names'
						value={user.names}
						required
						onChange={handleChange}
					/>
					<TextField
						id='email'
						label='EMAIL'
						margin='normal'
						name='email'
						type='email'
						required
						value={user.email}
						onChange={handleChange}
					/>
					<TextField
						id='subject'
						label='SUBJECT'
						margin='normal'
						name='subject'
						required
						value={user.subject}
						onChange={handleChange}
					/>
					<TextField
						id='message'
						label='MESSAGE'
						margin='normal'
						name='message'
						multiline
						rows={4}
						required
						value={user.message}
						onChange={handleChange}
					/>
					<div>
						{loading ? (
							<CircularProgress />
						) : (
							<>
								<Button
									variant='contained'
									color='primary'
									type='submit'
									fullWidth
									className={classes.button}
								>
									SEND MESSAGE
								</Button>
							</>
						)}
						{contactFailed && (
							<Alert className='alert-warning'>{contactFailed}</Alert>
						)}
					</div>
				</Grid>
			</form>
		</Paper>
	);
};

export default ContactForm;
