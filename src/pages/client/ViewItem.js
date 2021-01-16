import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import RelatedItems from '../../components/client/RelatedItems';
import { useDispatch, useSelector } from 'react-redux';
import { viewItem, relatedItems } from '../../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClientLayout from '../../layouts/ClientLayout';
import AddCart from '../../components/client/AddCart';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	card: {
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '77%',
	},
	cardContent: {
		flexGrow: 1,
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
	const [snack, setSnack] = useState(false);
	const [submitted, setSubmitted] = useState(false);
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
		setSubmitted(false);
		setOpen(!open);
		setSelectedItem(item);
	};

	const handleClose = () => {
		setSubmitted(false);
		setOpen(false);
	};

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnack(false);
	};
	const handleAddItemCart = (e, item, itemNumber) => {
		// setSubmitted(true);
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
		if (itemNumber) {
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
			setSnack(true);
		}
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
					<Box style={{ padding: 15, marginLeft: 30 }}>
						<Breadcrumbs aria-label='breadcrumb'>
							<Link color='inherit' href='/'>
								Home
							</Link>
							<Link
								color='inherit'
								href={`/category/${profileSupplier1.category}`}
							>
								{profileSupplier1.category}
							</Link>
							<Link
								color='textPrimary'
								href={`/view/${profileSupplier1.id}`}
								aria-current='page'
							>
								{profileSupplier1.itemName}
							</Link>
						</Breadcrumbs>
					</Box>
					<Container item className={classes.cardGrid} maxWidth='lg'>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={6}>
								<Card className={classes.card} elevation={1}>
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
												<AddCart
													addItemCart1={handleAddItemCart}
													selected1={profileSupplier1}
													checkSubmitted1={submitted}
												/>
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
												</Typography>
											</CardContent>
										</Card>
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
								{/* Related items component --------------------------------------- */}
								<RelatedItems
									items={related ? related.relatedItems : null}
									addItemCart={handleAddItemCart}
									setDialog={open}
									openDialog={handleToggleModal}
									closeDialog={handleClose}
									selected={selectedItem}
									checkSubmitted={submitted}
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
