import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Navbar from '../../components/Navbar';
import Divider from '@material-ui/core/Divider';
import ProformaItems from '../../components/client/ProformaItems';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../redux/actions';
import { green } from '@material-ui/core/colors';
import ModalUi from '../../components/Modals/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Spinner from '../../components/Ui/Spinner/Spinner';
import moment from 'moment';
import { requestProforma } from '../../redux/actions/clientActions';
import { connect } from 'react-redux';
import HotelWidget from '../../components/SidebarWidget/HotelWidget';
import itemImage from '../../assets/images/bg2.unsplash.jpg';
import ClientLayout from '../../layouts/ClientLayout';

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
	btnBooking: {
		color: '#1976D2',
		border: '1px solid #eee',
		background: 'white',
		position: 'fixed',
		zIndex: 10,
		alignItems: 'right',
		right: 35,
		// top:90,
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
			].map(image => (
				<div key={image.title} className={classes.slide}>
					<img src={image.image} alt={image.title} />
				</div>
			))}
		</Carousel>
	);
};

const RequestProforma = props => {
	const classes = useStyles();
	const bookedItems = JSON.parse(localStorage.getItem('bookingSummary'));
	const totalPrice = (localStorage.getItem('totalPrice') || 0) * 1;
	const [location, setLocation] = useState('choose');
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [selectedDate, setSelectedDate] = useState(moment());
	const [checkInDate, setCheckInDate] = useState(moment());
	const [checkOutDate, setCheckOutDate] = useState(moment());

	const [open, setOpen] = useState(false);
	const [bookingInfo, setBookingInfo] = useState({
		pickupDate: selectedDate,
		deadline: selectedDate,
	});
	const items = useSelector(state => state.item.allItems);
	console.log('ddddddddddddd', items);
	// const metadata = useSelector(state => stateallItemsItems);
	// const cont = useSelector(state => state.item.relatedItems);

	const handleToggleModal = () => {
		setOpen(!open);
	};
	const dispatch = useDispatch();

	const [bookingSummary, setBookingSummary] = useState(
		bookedItems !== null ? bookedItems : []
	);

	const handleAddItem = (e, item) => {
		const tempTot = (localStorage.getItem('totalPrice') || 0) * 1;
		const tot = tempTot + item['itemPrice'] * 1;
		localStorage.setItem('totalPrice', tot);
		if (tot > 0) setIsButtonDisabled(false);

		const { id, itemName, itemPrice } = item;
		const bookItem = {
			id,
			itemName,
			itemPrice: itemPrice * 1,
		};
		const booked = bookingSummary.find(bk => bk.id === item.id);
		let updatedBooking = [...bookingSummary, bookItem];
		if (booked) {
			updatedBooking = bookingSummary.filter(bk => bk.id !== item.id);
			const updatedTotPrice = tempTot - item['itemPrice'] * 1;
			localStorage.setItem('totalPrice', updatedTotPrice);
			if (updatedTotPrice === 0) setIsButtonDisabled(true);
		}
		setBookingSummary(updatedBooking);
		localStorage.setItem('bookingSummary', JSON.stringify(updatedBooking));
	};

	useEffect(() => {
		dispatch(getAllItems());
	}, [dispatch]);

	console.log('dddddddddddddddddd', items.allitems);

	const handleOnChange = e => {
		const updatedBookingInfo = { ...bookingInfo };
		updatedBookingInfo[e.target.name] = e.target.value;
		setBookingInfo(updatedBookingInfo);
	};

	const onDateChange = (name, dateValue) => {
		name === 'pickupDate'
			? setCheckInDate(dateValue)
			: setCheckOutDate(dateValue);

		const updatedBookingInfo = { ...bookingInfo };
		const realDate = moment(dateValue).format('YYYY-MM-DD HH:mm:ss');
		updatedBookingInfo[name] = realDate;
		setBookingInfo(updatedBookingInfo);
		return;
	};

	useEffect(() => {
		localStorage.setItem('bookingExtras', JSON.stringify(bookingInfo));
	}, [bookingInfo]);

	const handlePayLater = async itemId => {
		const tempBookingInfo = JSON.parse(localStorage.getItem('bookingSummary'));
		const tempBookingEtras = JSON.parse(localStorage.getItem('bookingExtras'));
		const items = [...tempBookingInfo.map(item => item.id)];

		const bookInfo = {
			...tempBookingEtras,
			itemsArray: items,
		};
		await props.requestProforma(bookInfo);
		setOpen(!open);
	};

	const handleCancelBooking = () => {
		localStorage.removeItem('bookingSummary');
		localStorage.removeItem('totalPrice');
		setBookingSummary([]);
		setOpen(!open);
	};

	return (
		<ClientLayout>
			{items.allitems ? (
				<main key={items.allitems} container>
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
									className={classes.btnBooking}
									onClick={handleToggleModal}
								>
									<NavigationIcon />
									My proforma summary
								</Fab>
							</span>
						</Typography>

						<Grid container spacing={1}>
							<Grid item xs={4} sm={4} md={8}>
								<ProformaItems
									items={items.allitems ? items.allitems : null}
									addItem={handleAddItem}
								/>
							</Grid>
							<Grid item xs={4} sm={3} md={4}>
								<HotelWidget
									selectedDate={selectedDate}
									checkInDate={checkInDate}
									checkOutDate={checkOutDate}
									onDateChange={onDateChange}
									handleOnChange={handleOnChange}
								/>
							</Grid>
						</Grid>
						{/* Supplier items component --------------------------------------- */}

						{/* Booking summary modal ----------------------------------------------*/}
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
											{/* {profileSupplier1.organization} */}
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
										Your booking summary
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
														Oops! You haven't booked anything yet!
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
												onClick={() => handlePayLater()}
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
												onClick={handleCancelBooking}
											>
												Cancel
											</Button>
										</CardActions>
									) : null}
								</Grid>
							</Grid>
						</ModalUi>
						{items ? (
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
				<Spinner />
			)}
		</ClientLayout>
	);
};

export default connect(null, { getAllItems, requestProforma })(RequestProforma);
