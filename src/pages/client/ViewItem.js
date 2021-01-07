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
import itemImage from '../../assets/images/bg2.unsplash.jpg';
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

const theme = createMuiTheme({
	palette: {
		primary: green,
	},
});

export const Slides = () => {
	const classes = useStyles();
	return (
		<Carousel autoPlay={9000} infinite slidesPerPage={1} slidesPerScroll={1}>
			{[
				{
					image: itemImage,
					title: 'profile image 1',
				},
				// {
				//   image:
				//     "https://images.unsplash.com/photo-1516540438350-9db0f4e6552f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
				//   title: "profile image 2",
				// },
				// {
				//   image:
				//     "https://images.unsplash.com/photo-1539947257641-0f0e9f213528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
				//   title: "profile image 3",
				// },
			].map(image => (
				<div key={image.title} className={classes.slide}>
					<img src={image.image} alt={image.title} />
				</div>
			))}
		</Carousel>
	);
};

const ViewItem = props => {
	const classes = useStyles();
	const bookedItems = JSON.parse(localStorage.getItem('orderSummary'));
	const totalPrice = (localStorage.getItem('totalPrice') || 0) * 1;
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [selectedDate, setSelectedDate] = useState(moment());
	const [checkInDate, setCheckInDate] = useState(moment());
	const [checkOutDate, setCheckOutDate] = useState(moment());

	const [open, setOpen] = useState(false);
	const [orderInfo, setOrderInfo] = useState({
		needDate: selectedDate,
		deadline: selectedDate,
		adult: 0,
	});

	const profileSupplier1 = useSelector(state => state.supplier.supplier);

	const profileSupplier = [{ names: 'celestin' }];
	const related = useSelector(state => state.item.relatedItems);
	// const metadata = useSelector(state => state.item.relatedItems);
	// const cont = useSelector(state => state.item.relatedItems);

	const handleToggleModal = () => {
		setOpen(!open);
	};
	const dispatch = useDispatch();

	const [orderSummary, setOrderSummary] = useState(
		bookedItems !== null ? bookedItems : []
	);

	const handleAddItem = (e, item, itemNumber) => {
		const tempTot = (localStorage.getItem('totalPrice') || 0) * 1;
		const tot = tempTot + item['itemPrice'] * 1;
		localStorage.setItem('totalPrice', tot);
		if (tot > 0) setIsButtonDisabled(false);

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
			if (updatedTotPrice === 0) setIsButtonDisabled(true);
		}
		setOrderSummary(updatedOrder);
		localStorage.setItem('orderSummary', JSON.stringify(updatedOrder));
	};

	useEffect(() => {
		const lastPath = window.location.pathname;
		const id = lastPath.split('/');
		dispatch(viewItem(id[2]));
	}, [dispatch]);

	useEffect(() => {
		dispatch(relatedItems(profileSupplier1.category));
	}, [dispatch, profileSupplier1.category]);

	const handleOnChange = e => {
		const updatedOrderInfo = { ...orderInfo };
		updatedOrderInfo[e.target.name] = e.target.value;
		setOrderInfo(updatedOrderInfo);
	};

	const onDateChange = (name, dateValue) => {
		name === 'needDate'
			? setCheckInDate(dateValue)
			: setCheckOutDate(dateValue);

		const updatedOrderInfo = { ...orderInfo };
		const realDate = moment(dateValue).format('YYYY-MM-DD HH:mm:ss');
		updatedOrderInfo[name] = realDate;
		setOrderInfo(updatedOrderInfo);
		return;
	};

	useEffect(() => {
		localStorage.setItem('orderExtras', JSON.stringify(orderInfo));
	}, [orderInfo]);

	const handlePayLater = async () => {
		const tempOrderInfo = JSON.parse(localStorage.getItem('orderSummary'));
		const tempOrderEtras = JSON.parse(localStorage.getItem('orderExtras'));
		const items = [...tempOrderInfo.map(item => item.id)];
		const category =
			tempOrderInfo && tempOrderInfo.map(item => item.category).toString();
		const bookInfo = {
			...tempOrderEtras,
			itemsArray: items,
			category,
		};
		await dispatch(createOrder(bookInfo));
		setOpen(!open);
	};

	const handleCancelOrder = () => {
		localStorage.removeItem('orderSummary');
		localStorage.removeItem('totalPrice');
		setOrderSummary([]);
		setOpen(!open);
	};

	return (
		<ClientLayout>
			{profileSupplier1.id ? (
				<main key={profileSupplier1.id} container>
					{/* topBody unit */}
					<Divider />
					<Container item className={classes.cardGrid} maxWidth='lg'>
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
									className={classes.btnOrder}
									onClick={handleToggleModal}
								>
									<NavigationIcon />
									My order summary
								</Fab>
							</span>
						</Typography>
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
									addItem={handleAddItem}
								/>
							</Grid>
						</Grid>

						{/* Order summary modal ----------------------------------------------*/}
						<ModalUi open={open} toggleModal={handleToggleModal}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={5} md={5}>
									<Card className={classes.card} elevation={3}>
										<Typography
											component='h1'
											variant='h3'
											color='textPrimary'
											gutterBottom
											item
											md={12}
											align='center'
											style={{ margin: '30px' }}
										>
											{profileSupplier1.organization}
										</Typography>
									</Card>
								</Grid>
								<Grid item xs={12} sm={7} md={7}>
									<Typography
										component='h2'
										variant='h4'
										color='textPrimary'
										gutterBottom
										item
										md={12}
										align='center'
									>
										Your order summary
									</Typography>
									<TableContainer>
										<Table
											className={classes.table}
											aria-label='customized table'
										>
											<TableBody>
												{bookedItems !== null && totalPrice !== 0 ? (
													bookedItems.map(item => (
														<TableRow key={item.key}>
															<TableCell component='th' scope='row'>
																{item.itemName}
															</TableCell>
															<TableCell align='right'>
																{item.itemPrice} Rwf
															</TableCell>
															<TableCell align='right'>
																<Button color='secondary'>
																	<CancelIcon
																		onClick={e => handleAddItem(e, item)}
																	/>
																</Button>
															</TableCell>
														</TableRow>
													))
												) : (
													<Typography
														component='h4'
														variant='h6'
														color='textPrimary'
														gutterBottom
														item
														md={12}
														align='center'
														style={{ marginTop: '20px' }}
													>
														Oops! You haven't added to cart anything!
													</Typography>
												)}
												{bookedItems && totalPrice !== 0 ? (
													<TableRow>
														<TableCell component='th' scope='row'>
															<strong>Total</strong>
														</TableCell>
														<TableCell align='right'>
															<strong>{totalPrice}</strong>
														</TableCell>
													</TableRow>
												) : null}
											</TableBody>
										</Table>
									</TableContainer>
									<hr />
									{bookedItems && totalPrice !== 0 ? (
										<CardActions style={{ position: 'relative', bottom: '0' }}>
											<Button
												color='primary'
												size='small'
												style={{
													backgroundColor: '#0080003a',
													width: '33%',
													color: 'green',
												}}
												onClick={() => handlePayLater(profileSupplier1.id)}
												disabled={isButtonDisabled}
											>
												Pay later
											</Button>

											<Button
												color='primary'
												size='small'
												style={{ backgroundColor: '#1976d23f', width: '33%' }}
												disableRipple={false}
											>
												Checkout
											</Button>
											<Button
												color='secondary'
												size='small'
												variant='contained'
												style={{ width: '33%' }}
												onClick={handleCancelOrder}
											>
												Cancel
											</Button>
										</CardActions>
									) : null}
								</Grid>
							</Grid>
						</ModalUi>
						{profileSupplier[0].length > 0 ? (
							<Grid item xs={12} sm={8} md={8}>
								<ThemeProvider theme={theme}>
									<Button
										variant='contained'
										color='primary'
										className={classes.btnSize}
										onClick={handleToggleModal}
									>
										Book now
									</Button>
								</ThemeProvider>
							</Grid>
						) : null}
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
