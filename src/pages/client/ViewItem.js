import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import RelatedItems from '../../components/supplier/RelatedItems';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { viewItem, relatedItems, createOrder } from '../../redux/actions';
import { green } from '@material-ui/core/colors';
import ModalUi from '../../components/Modals/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import itemImage from '../../assets/images/construction.jpg';
import ClientLayout from '../../layouts/ClientLayout';
import DateWidget from '../../components/SidebarWidget/DateWidget';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(16),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: theme.spacing(2),
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
		position: 'sticky',
		zIndex: '100',
	},
	titleOrganization: {
		marginTop: -50,
		marginLeft: 10,
		display: 'flex',
	},
	areaStyle: {
		marginTop: -30,
		marginLeft: 25,
	},
	slide: {
		height: '340px',
		width: '100%',
	},
	image: {
		height: '100%',
		width: '100%',
	},
	sticky: {
		display: 'fixed',
	},
	btnSize: {
		margin: theme.spacing(1),
		width: '98%',
		color: 'white',
	},
	btnOrder: {
		color: '#1976D2',
		border: '1px solid #eee',
		background: 'white',
		position: 'fixed',
		zIndex: 10,
	},
	spin: {
		position: 'relative',
		top: '50%',
		left: '45%',
		boxSizing: 'border-box',
		margin: 'auto',
		width: '100px !important',
		height: '100px !important',
	},
}));

const ViewItem = props => {
	const classes = useStyles();
	const bookedItems = JSON.parse(localStorage.getItem('orderSummary'));

	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const profileSupplier1 = useSelector(state => state.supplier.supplier);
	const related = useSelector(state => state.item.relatedItems);
	// const metadata = useSelector(state => state.item.relatedItems);
	// const cont = useSelector(state => state.item.relatedItems);

	const dispatch = useDispatch();

	const [orderSummary, setOrderSummary] = useState(
		bookedItems !== null ? bookedItems : []
	);

	const handleToggleModal = item => {
		setOpen(!open);
		setSelectedItem(item);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddItemCart = (e, item, itemNumber) => {
		const tempTot = (localStorage.getItem('totalPrice') || 0) * 1;
		const tot = tempTot + item['itemPrice'] * 1;
		localStorage.setItem('totalPrice', tot);

		const { id, itemName, itemPrice } = item;
		const bookItem = {
			id,
			itemName,
			itemPrice: itemPrice * 1,
			itemNumber,
		};
		const booked = orderSummary.find(bk => bk.id === item.id);
		let updatedOrder = [...orderSummary, bookItem];
		if (booked) {
			updatedOrder = orderSummary.filter(bk => bk.id !== item.id);
			const updatedTotPrice = tempTot - item['itemPrice'] * 1;
			localStorage.setItem('totalPrice', updatedTotPrice);
		}
		setOrderSummary(updatedOrder);
		localStorage.setItem('orderSummary', JSON.stringify(updatedOrder));
		setOpen(false);
	};

	useEffect(() => {
		const lastPath = window.location.pathname;
		const id = lastPath.split('/');
		dispatch(viewItem(id[2]));
	}, [dispatch]);

	useEffect(() => {
		dispatch(relatedItems(profileSupplier1.category));
	}, [dispatch, profileSupplier1.category]);
	return (
		<ClientLayout>
			{profileSupplier1.id ? (
				<main key={profileSupplier1.id} container>
					{/* topBody unit */}
					<Divider />
					<Container item className={classes.cardGrid} maxWidth='lg'>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={6}>
								<Card className={classes.card} elevation={1}>
									{/* <Slides /> */}
									<CardMedia
										className={classes.cardMedia}
										image={profileSupplier1.itemImage}
										title={profileSupplier1.itemName}
									/>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={6}>
								<Card className={classes.card} elevation={1}>
									<CardContent className={classes.cardContent}>
										<Card style={{ marginTop: 10 }} elevation={0}>
											<Typography
												component='h2'
												variant='h4'
												align='left'
												color='textPrimary'
											>
												{profileSupplier1.itemName}
											</Typography>

											<CardHeader
												avatar={<VerifiedUserIcon color='primary' />}
												action={
													<IconButton aria-label='settings'>
														<MoreVertIcon />
													</IconButton>
												}
												subheader={`From ${profileSupplier1.owner.organization}`}
												title={`${profileSupplier1.itemPrice} RWF`}
											/>
											<CardContent>
												<Typography
													component='h3'
													variant='h6'
													align='left'
													color='textPrimary'
												>
													Product description
												</Typography>
												<br />
												<Typography
													variant='body1'
													color='textSecondary'
													component='p'
												>
													{profileSupplier1.itemDescription}
													<br />
													[removed later] This impressive paella is a perfect
													party dish and a fun meal to cook together with your
													guests. Add 1 cup of frozen peas along with the
													mussels, if you like. This impressive paella is a
													perfect party dish and a fun meal to cook together
													with your guests. Add 1 cup of frozen peas along with
													the mussels, if you like.
												</Typography>
											</CardContent>
										</Card>
										<hr />
									</CardContent>
								</Card>
							</Grid>
						</Grid>
						<br />
						<br />
						<Grid container spacing={4}>
							<Divider />
							<Grid item xs={12} sm={12} md={12}>
								<Typography
									component='h3'
									variant='h6'
									align='left'
									color='textPrimary'
								>
									Related material item
								</Typography>
								{/* Supplier items component --------------------------------------- */}
								<RelatedItems
									items={related ? related.relatedItems : null}
									addItemCart={handleAddItemCart}
									setDialog={open}
									openDialog={handleToggleModal}
									closeDialog={handleClose}
									selected={selectedItem}
								/>
							</Grid>
						</Grid>
					</Container>
					<Divider />
				</main>
			) : (
				<div style={{ margin: 'auto', width: '70vw', height: '70vh' }}>
					<CircularProgress className={classes.spin} />
				</div>
			)}
		</ClientLayout>
	);
};

export default ViewItem;
