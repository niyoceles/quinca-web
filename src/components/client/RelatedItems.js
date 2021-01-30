import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as ReactLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DialogQuantity from './DialogQuantity';

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
	links: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));

const RelatedItems = props => {
	const classes = useStyles();
	return (
		<>
			<DialogQuantity
				open={props.setDialog}
				close={props.closeDialog}
				addcart={props.addItemCart}
				selected={props.selected}
			/>
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
								<ReactLink to={`/view/${item.id}`} className={classes.links}>
									{' '}
									<ButtonBase className={classes.image}>
										<img
											className={classes.img}
											alt='...'
											src={item.itemImage}
										/>
									</ButtonBase>
								</ReactLink>
							</Grid>
							<Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
								<Grid item xs container direction='column' spacing={2}>
									<Grid item xs>
										<Typography gutterBottom variant='subtitle1'>
											{item.itemName}
										</Typography>
										{/* <Typography variant='body2' gutterBottom>
											{item.itemDescription}
										</Typography> */}
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
												Add
											</Fab>
										</span>
									</FormControl>
								</Grid>
								<Grid item>
									<Typography variant='subtitle1'>
										<Fab
											variant='extended'
											size='small'
											color='tertiary'
											aria-label='price'
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
