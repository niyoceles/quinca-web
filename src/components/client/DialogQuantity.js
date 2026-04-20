import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function DialogQuantity(props) {
	const [submitted, setSubmitted] = useState(false);
	const [quantity, setQuantity] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
		setSubmitted(true);
	};
	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			aria-labelledby='alert-dialog-slide-title'
			aria-describedby='alert-dialog-slide-description'
			keepMounted
			close={props.close}
		>
			<form noValidate onSubmit={handleSubmit}>
				<DialogContent>
					<TextField
						variant='outlined'
						margin='normal'
						required
						name='quantity'
						defaultValue={'10'}
						// inputProps={{ min: '10' }}
						helperText={submitted && !quantity ? 'please add quantity' : null}
						value={quantity}
						error={submitted && !quantity ? 'is-invalid' : null}
						onChange={e => setQuantity(e.target.value)}
						label='quantity'
						type='number'
						id='quantity'
						autoComplete='quantity'
						autoFocus
					/>
				</DialogContent>
				<DialogActions>
					<Button
						type='submit'
						color='primary'
						size='small'
						style={{
							backgroundColor: '#0080003a',
							width: '80%',
							color: 'green',
						}}
						onClick={e => props.addcart(e, props.selected, quantity)}
					>
						Confirm add cart
					</Button>
					<Button onClick={props.close} color='secondary'>
						Cancel
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
