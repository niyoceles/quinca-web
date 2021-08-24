/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../redux/actions';
import SupplierLayout from '../../layouts/SupplierLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		width: '75%',
		margin: '100px auto',
	},
	container: {
		maxHeight: 240,
	},
	row: {
		cursor: 'pointer',
		'&:hover': {
			background: '#1976d26c !important',
			borderRadius: '12px !important',
			boxShadow: '0 2px 3px #ccc',
		},
	},
	listItem: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	topCardGrid: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#fff',
		borderRadius: '10px',
	},
}));

const ViewOrder = props => {
	const history = useHistory();
	const classes = useStyles();
	const myprofroma = useSelector(
		state => state.order.orderItem.oneorder
	);
	const items = useSelector(state => state.order.orderItem.orderItems);

	const dispatch = useDispatch();
	useEffect(() => {
		const lastPath = window.location.pathname;
		const id = lastPath.split('/');
		dispatch(getSingleOrder(id[2]));
	}, [dispatch]);

	const handleClickOpen = () => {
		let path = `/account/supplier/orders`;
		history.push(path);
	};
	return (
		<SupplierLayout>
			{/* Recent Features */}
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Container
						className={[classes.topCardGrid, classes.topBodyButtons]}
						maxWidth='lg'
					>
						<Typography
							component='h4'
							variant='h4'
							color='textPrimary'
							gutterBottom
							item
							md={12}
							align='center'
							style={{ marginTop: '20px' }}
						>
							View order
						</Typography>
						<hr />
						<Grid container spacing={2}>
							<Grid item xs={10} sm={5} md={4}>
								{myprofroma !== undefined ? (
									<List className={classes.listItem}>
										<ListItem>
											<ListItemText primary='Names' />
											<ListItemText primary={myprofroma.client.names} />
										</ListItem>
										<ListItem>
											<ListItemText primary='Phone' />
											<ListItemText primary={myprofroma.client.phoneNumber} />
										</ListItem>
										<ListItem>
											<ListItemText primary='Email' />
											<ListItemText primary={myprofroma.client.email} />
										</ListItem>
										<Divider variant='inset' component='li' />

										<ListItem>
											<ListItemText primary='Need date from' />
											{/* <ListItemText primary={myprofroma.pickupDate} /> */}
											<ListItemText primary={moment(myprofroma.needDate).format('MMM Do YY, h:mm a')} />
										</ListItem>
										<ListItem>
											<ListItemText primary='Pick up date' />
											{/* <ListItemText primary={myprofroma.deadline} /> */}
											<ListItemText primary={moment(myprofroma.deadline).format('MMM Do YY, h:mm a')} />
										</ListItem>
										<Divider variant='inset' component='li' />

										<ListItem>
											<ListItemText primary='Status' />
											<ListItemText primary={myprofroma.status} />
										</ListItem>
										<Divider variant='inset' component='li' />
										<Divider />
										<ListItem>
											{!myprofroma.isPaid ? (
												<CardActions
													style={{
														position: 'relative',
														bottom: '0',
														width: '100%',
													}}
												>
													<Button
														color='secondary'
														size='small'
														variant='contained'
														style={{ width: '45%' }}
													>
														Cancel
													</Button>
													<Button
														color='primary'
														size='small'
														style={{
															backgroundColor: '#0080003a',
															width: '45%',
															color: 'green',
														}}
													>
														Approve
													</Button>
												</CardActions>
											) : null}
										</ListItem>
									</List>
								) : null}
							</Grid>
							<Grid item xs={8} sm={4} md={4}>
								<TableContainer>
									<Table
										className={classes.table}
										aria-label='customized table'
									>
										<TableBody>
											{items !== undefined ? (
												items &&
												myprofroma.itemsArray.map(item => (
													<TableRow key={item.key}>
														<TableCell component='th' scope='row'>
															{item.itemName}
														</TableCell>
														<TableCell align='right'>
															{item.itemPrice} Rwf
														</TableCell>
														<TableCell align='right'>
															{item.itemNumber}
														</TableCell>
														<TableCell align='right'>
															<b>{item.itemNumber * item.itemPrice}</b>
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
													Oops! You haven't requested anything yet!
												</Typography>
											)}
											<TableRow>
												<TableCell component='th' scope='row'>
													<strong>Total</strong>
												</TableCell>
												<TableCell></TableCell>
												<TableCell></TableCell>
												<TableCell align='right'>
													<strong>
														{items &&
															(() => {
																let sum = 0;
																myprofroma.itemsArray.forEach(item => {
																	sum += (item.itemNumber * item.itemPrice)
																})
																return sum;
															})()
														}
													</strong>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
								<Button
									color='primary'
									size='medium'
									style={{
										backgroundColor: '#0080003a',
										width: '100%',
										color: 'green',
									}}
									onClick={() => handleClickOpen()}
								>
									Back
								</Button>
							</Grid>
						</Grid>
					</Container>
				</Paper>
			</Grid>
		</SupplierLayout>
	);
};

export default ViewOrder;
