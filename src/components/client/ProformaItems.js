import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import ModalUi from '../../components/Modals/Modal';

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

const ProformaItems = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState({
		quantity: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleToggleModal = item => {
		setOpen(!open);
		setSelectedItem(item);
	};

	const handleClose = item => {
		setOpen(open);
		setSelectedItem(item);
	};
	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	return (
		<div>
			<Typography component='h3' variant='h5' align='left' color='textPrimary'>
				Availability items for proforma
			</Typography>
			<ModalUi open={open} close={handleClose} toggleModal={handleToggleModal}>
				<Grid container spacing={3}>
					{/* {selectedItem ? (
						<Grid item xs={12} sm={5} md={5}>
							<Card className={classes.card} elevation={3}>
								<img
									className={classes.img}
									alt='...'
									src={selectedItem.itemImage}
								/>
							</Card>
						</Grid>
					) : null} */}

					<Grid item xs={12} sm={7} md={7}>
						<form className={classes.form} noValidate>
							<TextField
								variant='outlined'
								margin='normal'
								required
								name='quantity'
								defaultValue={10}
								inputProps={{ min: '10' }}
								helperText={submitted && !user.quantity ? 'is invalid' : null}
								value={user.quantity}
								error={submitted && !user.quantity ? 'is-invalid' : null}
								onChange={handleChange}
								label='quantity'
								type='number'
								id='quantity'
							/>
							<hr />
							<CardActions style={{ position: 'relative', bottom: '0' }}>
								<Button
									color='primary'
									size='small'
									style={{
										backgroundColor: '#0080003a',
										width: '33%',
										color: 'green',
									}}
									onClick={e => props.addItem(e, selectedItem, user.quantity)}
								>
									Confirm cart
								</Button>
							</CardActions>
						</form>
					</Grid>
				</Grid>
			</ModalUi>
			{/* end modal----------------------------------------------------------- */}
			<div>
				{props.items &&
					props.items.map(item => (
						<Grid
							key={item.itemName}
							container
							spacing={3}
							className={classes.itemBox}
						>
							<Grid item xs={12} sm={12} md={4}>
								<ButtonBase className={classes.image}>
									<img className={classes.img} alt='...' src={item.itemImage} />
								</ButtonBase>
							</Grid>
							<Grid item xs={12} sm={6} md={8} style={{ display: 'flex' }}>
								<Grid
									item
									xs={8}
									sm={8}
									md={8}
									container
									direction='column'
									spacing={2}
								>
									<Typography gutterBottom variant='h5'>
										{item.itemName}
									</Typography>
									<Typography variant='body2'>
										<Fab
											variant='extended'
											size='small'
											color='tertiary'
											aria-label={item.itemPrice + 'Rwf'}
											className={classes.btnBooking}
										>
											{item.itemPrice + 'Rwf'}
										</Fab>
									</Typography>
									<br />
									<Typography variant='body2' gutterBottom>
										{item.itemDescription}
									</Typography>
								</Grid>
								<Grid
									item
									xs={4}
									sm={4}
									md={4}
									container
									direction='column'
									spacing={2}
								>
									<Typography
										component='h2'
										variant='h4'
										color='textPrimary'
										className={classes.titleOrganization}
										gutterBottom
									>
										<span style={{ flex: 1 }}>
											<Fab
												variant='extended'
												size='medium'
												color='primary'
												aria-label='add'
												// className={classes.btnOrder}
												onClick={() => handleToggleModal(item)}
											>
												<NavigationIcon />
												Add cart
											</Fab>
										</span>
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					))}
			</div>
		</div>
	);
};
export default ProformaItems;
