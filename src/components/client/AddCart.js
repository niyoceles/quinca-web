import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		padding: 5,
		marginRight: 10,
	},
	links: {
		textDecoration: 'none !important',
		color: 'inherit',
		padding: 2,
	},
}));

const AddCart = props => {
	const classes = useStyles();
	const [submitted, setSubmitted] = useState(false);
	const [quantity, setQuantity] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<form className={classes.form} noValidate onSubmit={handleSubmit}>
			<TextField
				variant='outlined'
				margin='normal'
				required
				type='number'
				id='quantity'
				label='Quantity'
				name='quantity'
				defaultValue={'10'}
				helperText={
					submitted && !quantity ? 'please add quantity you want' : null
				}
				value={quantity}
				error={submitted && !quantity ? 'is-invalid' : null}
				onChange={e => setQuantity(e.target.value)}
				autoComplete='quantity'
				autoFocus
			/>
			<br />
			<Button
				type='submit'
				variant='contained'
				color='primary'
				size='medium'
				style={{ width: '40%' }}
				className={classes.submit}
				onClick={e => props.addItemCart1(e, props.selected1, quantity)}
			>
				Add Cart
			</Button>
			<Link href='/cart' variant='body2' className={classes.links}>
				<Button
					variant='contained'
					color='secondary'
					size='medium'
					style={{ width: '33%' }}
					className={classes.submit}
				>
					Buy Now
				</Button>
			</Link>
		</form>
	);
};

export default AddCart;
