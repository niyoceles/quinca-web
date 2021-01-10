import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	image: {
		width: 200,
		height: 150,
		marginRight: '10px',
		paddingRight: 10,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
		objectFit: 'cover',
	},
	itemBox: {
		boxShadow: '0 2px 3px 0 #ccc',
		margin: '20px 0 0 0px',
		width: '90%',
		padding: '10px',
		backgroundColor: 'white',
		borderRadius: '8px',
	},
}));

const RelatedItems = props => {
	const classes = useStyles();
	// const [open, setOpen] = useState(false);
	const [user, setUser] = useState({
		quantity: '',
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};
	return (
		<>
			<Dialog
				open={props.setDialog}
				TransitionComponent={Transition}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
				keepMounted
				close={props.closeDialog}
			>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<form
							noValidate
							onSubmit={() => props.addItemCart(props.selected, user.quantity)}
						>
							<TextField
								variant='outlined'
								margin='normal'
								required
								name='quantity'
								defaultValue={10}
								inputProps={{ min: '10' }}
								helperText={
									props.checkSubmitted && !user.quantity ? 'is invalid' : null
								}
								value={user.quantity}
								error={
									props.checkSubmitted && !user.quantity ? 'is-invalid' : null
								}
								onChange={handleChange}
								label='quantity'
								type='number'
								id='quantity'
							/>
						</form>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color='primary'
						size='small'
						style={{
							backgroundColor: '#0080003a',
							width: '80%',
							color: 'green',
						}}
						onClick={e => props.addItemCart(e, props.selected, user.quantity)}
					>
						Confirm add cart
					</Button>
					<Button onClick={props.closeDialog} color='primary'>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
			{props.items &&
				props.items.map(item => (
					<Grid
						key={item.itemName}
						container
						spacing={3}
						item
						xs={12}
						sm={6}
						md={6}
						className={classes.itemBox}
					>
						<Grid container spacing={3}>
							<Grid item xs={4} sm={3} md={4}>
								<ButtonBase className={classes.image}>
									<img className={classes.img} alt='...' src={item.itemImage} />
								</ButtonBase>
							</Grid>
							<Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
								<Grid item xs container direction='column' spacing={2}>
									<Grid item xs>
										<Typography gutterBottom variant='subtitle1'>
											{item.itemName}
										</Typography>
										<Typography variant='body2' gutterBottom>
											{item.itemDescription}
										</Typography>
									</Grid>

									<FormControl component='fieldset'>
										<span style={{ flex: 1 }}>
											<Fab
												variant='extended'
												size='medium'
												color='primary'
												aria-label='add'
												// className={classes.btnOrder}
												onClick={() => props.openDialog(item)}
											>
												<AddShoppingCartIcon />
												Add cart
											</Fab>
										</span>
									</FormControl>
								</Grid>
								<Grid item>
									<Typography variant='subtitle1'>
										<Fab
											variant='extended'
											size='small'
											color='primary'
											aria-label='add'
											className={classes.btnBooking}
										>
											{item.itemPrice + 'Rwf'}
										</Fab>
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				))}
		</>
	);
};
export default RelatedItems;
