import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as ReactLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DialogQuantity from './DialogQuantity';

const useStyles = makeStyles(theme => ({
	links: {
		textDecoration: 'none',
		color: 'inherit',
	},
	cardGrid: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		marginBottom: 40,
		borderRadius: '10px',
	},
	titleFeature: {
		marginTop: -50,
		padding:10
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		'&:hover': {
			background: '#e3e5e6',
		},
	},
	cardMedia: {
		paddingTop: '100%',
		padding: 5,
	},
	cardContent: {
		flexGrow: 1,
	},
	divContent: {
		marginLeft: 15,
		marginTop: -10,
	},
	spin: {
		margin: '50px auto',
		width: '50px !important',
		height: '50px !important',
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
			<Container className={classes.cardGrid} maxWidth='lg'>
				<Typography
					component='h3'
					variant='h5'
					align='center'
					color='textPrimary'
					className={classes.titleFeature}
					gutterBottom
				>
					Related Material items
				</Typography>
				<Grid container spacing={4}>
					{props.items !== undefined ? (
						props.items &&
						props.items.map(card => (
							<Grid item key={card} xs={12} sm={6} md={3}>
								<Card className={classes.card} elevation={3}>
									<ReactLink to={`/view/${card.id}`} className={classes.links}>
										<CardMedia
											className={classes.cardMedia}
											image={card.itemImage}
											title='Image title'
										/>
										<CardContent
											className={classes.cardContent}
											style={{ height: 98 }}
										>
											<div className={classes.divContent}>
												<Typography
													variant='body2'
													color='textPrimary'
													align='left'
													gutterBottom
												>
													{card.itemName}
												</Typography>
												<Grid
													container
													direction='row'
													spacing={1}
													alignItems='center'
												>
													<Grid item align='left'>
														<FormControl component='fieldset'>
															<span style={{ flex: 1 }}>
																<Fab
																	variant='extended'
																	size='medium'
																	color='primary'
																	aria-label='add'
																	// className={classes.btnOrder}
																	onClick={() => props.openDialog(card)}
																>
																	<AddShoppingCartIcon />
																	Add
																</Fab>
															</span>
														</FormControl>
													</Grid>
													<Grid item></Grid>
													<Grid item align='right'>
														{' '}
														<Button
															size='medium'
															color='primary'
															style={{ marginTop: -5 }}
														>
															RWF {card.itemPrice}
														</Button>
													</Grid>
												</Grid>
											</div>
										</CardContent>
									</ReactLink>
								</Card>
							</Grid>
						))
					) : (
						<CircularProgress className={classes.spin} />
					)}
				</Grid>
			</Container>
		</>
	);
};
export default RelatedItems;
