import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import ProformaItems from '../../components/client/ProformaItems';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '@brainhubeu/react-carousel/lib/style.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems, requestProforma } from '../../redux/actions';
import { green } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MuiAlert from '@material-ui/lab/Alert';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Spinner from '../../components/Ui/Spinner/Spinner';
import moment from 'moment';
import DateWidget from '../../components/SidebarWidget/DateWidget';
import CartLayout from '../../layouts/CartLayout';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	btnSize: {
		margin: theme.spacing(1),
		width: '98%',
		color: 'white',
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: green,
	},
});

const RequestProforma = props => {
	const classes = useStyles();
	const requestedItems = JSON.parse(localStorage.getItem('proformaSummary'));
	const totalPrice = (localStorage.getItem('totalPrice') || 0) * 1;
	const [selectedDate, setSelectedDate] = useState(moment());
	const [checkInDate, setCheckInDate] = useState(moment());
	const [checkOutDate, setCheckOutDate] = useState(moment());

	// const [open, setOpen] = useState(false);
	const [snack, setSnack] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [proformaInfo, setProformaInfo] = useState({
		pickupDate: selectedDate,
		deadline: selectedDate,
		names: '',
		email: '',
		phoneNumber: '',
		address: '',
		location: '',
	});
	const items = useSelector(state => state.item.allItems);
	// const metadata = useSelector(state => stateallItemsItems);
	// const cont = useSelector(state => state.item.relatedItems);
	console.log(items);

	const dispatch = useDispatch();

	const [proformaSummary, setProformaSummary] = useState(
		requestedItems !== null ? requestedItems : []
	);

	const handleAddItem = (e, item, itemNumber) => {
		const { id, itemName, itemPrice } = item;
		const requestItem = {
			id,
			itemName,
			itemPrice: itemPrice * 1,
			itemNumber,
		};
		if (itemNumber) {
			const requested = proformaSummary.find(bk => bk.id === item.id);
			let updatedProforma = [...proformaSummary, requestItem];
			if (requested) {
				updatedProforma = proformaSummary.filter(bk => bk.id === item.id);
			}
			setProformaSummary(updatedProforma);
			localStorage.setItem('proformaSummary', JSON.stringify(updatedProforma));
			setSnack(true);
		}
	};

	const handleRemoveItem = (e, item) => {
		if (item) {
			const requested = proformaSummary.find(bk => bk.id === item);
			let updatedProforma = [...proformaSummary, item];
			if (requested) {
				updatedProforma = proformaSummary.filter(bk => bk.id !== item);
			}
			setProformaSummary(updatedProforma);
			localStorage.setItem('proformaSummary', JSON.stringify(updatedProforma));
		}
	};

	useEffect(() => {
		dispatch(getAllItems());
	}, [dispatch]);

	const handleOnChange = e => {
		const updatedProformaInfo = { ...proformaInfo };
		updatedProformaInfo[e.target.name] = e.target.value;
		setProformaInfo(updatedProformaInfo);
	};

	const onDateChange = (name, dateValue) => {
		name === 'pickupDate'
			? setCheckInDate(dateValue)
			: setCheckOutDate(dateValue);

		const updatedProformaInfo = { ...proformaInfo };
		const realDate = moment(dateValue).format('YYYY-MM-DD HH:mm:ss');
		updatedProformaInfo[name] = realDate;
		setProformaInfo(updatedProformaInfo);
		return;
	};

	useEffect(() => {
		localStorage.setItem('proformaExtras', JSON.stringify(proformaInfo));
	}, [proformaInfo]);

	const handlePayLater = async () => {
		const tempProformaInfo = JSON.parse(
			localStorage.getItem('proformaSummary')
		);
		const tempProformaEtras = JSON.parse(
			localStorage.getItem('proformaExtras')
		);

		const requestInfo = {
			...tempProformaEtras,
			itemsArray: tempProformaInfo,
		};
		setSubmitted(true);
		await dispatch(requestProforma(requestInfo));
	};

	const handleCancelProforma = () => {
		localStorage.removeItem('proformaSummary');
		setProformaSummary([]);
	};

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnack(false);
	};

	const handleToggleModal = item => {
		setSubmitted(false);
		setSelectedItem(item);
	};

	const handleClose = () => {
		setSubmitted(false);
	};

	return (
		<CartLayout>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={snack}
				message='I love snacks'
				autoHideDuration={3000}
				onClose={handleCloseSnack}
				style={{ marginTop: 80 }}
			>
				<Alert onClose={handleCloseSnack} severity='success'>
					Item added on cart
				</Alert>
			</Snackbar>
			<br />
			{items && items.length ? (
				<Container item className={classes.cardGrid} maxWidth='lg'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={8}>
							<ProformaItems
								items={items ? items : null}
								addItem={handleAddItem}
								openDialog={handleToggleModal}
								closeDialog={handleClose}
								selected={selectedItem}
								checkSubmitted={submitted}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Typography
								component='h3'
								variant='h6'
								color='textPrimary'
								gutterBottom
								item
								md={12}
								align='center'
							>
								Your Proforma summary
							</Typography>
							<TableContainer>
								<Table className={classes.table} aria-label='customized table'>
									<TableBody>
										{requestedItems !== null && totalPrice !== 0 ? (
											requestedItems.map(item => (
												<TableRow key={item.key}>
													<TableCell component='th' scope='row'>
														{item.itemName}
													</TableCell>
													<TableCell component='th' scope='row'>
														{item.itemNumber} X
													</TableCell>
													<TableCell align='right'>
														{item.itemPrice} Rwf
													</TableCell>
													<TableCell align='right'>
														<Button color='secondary'>
															<CancelIcon
																onClick={e => handleRemoveItem(e, item.id)}
															/>
														</Button>
													</TableCell>
												</TableRow>
											))
										) : (
											<Typography
												component='h6'
												variant='body1'
												color='textPrimary'
												gutterBottom
												item
												md={12}
												align='center'
												style={{ marginTop: '20px' }}
											>
												Oops! You haven't requested anything yet!,
												<br /> Please add product item
											</Typography>
										)}
									</TableBody>
								</Table>
							</TableContainer>
							<hr />
							<DateWidget
								selectedDate={selectedDate}
								checkInDate={checkInDate}
								checkOutDate={checkOutDate}
								onDateChange={onDateChange}
								handleOnChange={handleOnChange}
								onSubmitForm={handlePayLater}
								checkValue={proformaInfo}
								checkHelperText={proformaInfo}
								checkSubmitted={submitted}
								error={proformaInfo}
							/>
							<hr />
							{requestedItems && totalPrice !== 0 ? (
								<CardActions style={{ position: 'relative', bottom: '0' }}>
									<ThemeProvider theme={theme}>
										<Button
											color='primary'
											variant='contained'
											className={classes.btnSize}
											onClick={() => handlePayLater()}
											onSubmit={() => handlePayLater()}
										>
											Request Now
										</Button>
									</ThemeProvider>
									<Button
										color='secondary'
										size='small'
										variant='contained'
										style={{ width: '33%' }}
										onClick={handleCancelProforma}
									>
										Cancel
									</Button>
								</CardActions>
							) : null}
						</Grid>
					</Grid>
				</Container>
			) : (
				<Spinner />
			)}
		</CartLayout>
	);
};

export default RequestProforma;
