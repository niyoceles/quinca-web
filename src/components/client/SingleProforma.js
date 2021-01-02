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
import { getSingleProforma } from '../../redux/actions';
import ClientLayout from '../../layouts/ClientLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

const SingleProforma = props => {
	const classes = useStyles();

	// const { id } = props.match.params;

	const myprofroma = useSelector(
		state => state.client.proformaItem.oneproforma
	);
	const items = useSelector(state => state.client.proformaItem.proformaItems);

	const dispatch = useDispatch();
	useEffect(() => {
		const lastPath = window.location.pathname;
		const id = lastPath.split('/');
		dispatch(getSingleProforma(id[2]));
	}, [dispatch]);

	return (
		<ClientLayout>
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
					View proforma
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={10} sm={5} md={4}>
						{myprofroma !== undefined ? (
							// <img
							// 	style={{
							// 		width: '80%',
							// 		height: '40vh',
							// 		margin: 'auto',
							// 		borderRadius: 10,
							// 	}}
							// 	alt='item image'
							// 	src={Imagebanner}
							// />
							<List className={classes.listItem}>
								<ListItem>
									<ListItemText primary='id' />
									<ListItemText primary={myprofroma.id} />
								</ListItem>
								<Divider variant='inset' component='li' />

								<ListItem>
									<ListItemText primary='Need date from' />
									<ListItemText primary={myprofroma.pickupDate} />
								</ListItem>
								<ListItem>
									<ListItemText primary='Need date from' />
									<ListItemText primary={myprofroma.deadline} />
								</ListItem>
								<Divider variant='inset' component='li' />

								<ListItem>
									<ListItemText primary='Status' />
									<ListItemText primary={myprofroma.status} />
								</ListItem>
								<Divider variant='inset' component='li' />

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
												Pay
											</Button>
										</CardActions>
									) : null}
								</ListItem>
							</List>
						) : null}
					</Grid>
					<Grid item xs={8} sm={4} md={4}>
						<TableContainer>
							<Table className={classes.table} aria-label='customized table'>
								<TableBody>
									{items !== undefined ? (
										items &&
										items.map(item => (
											<TableRow key={item.key}>
												<TableCell component='th' scope='row'>
													{item.itemDetails.itemName}
												</TableCell>
												<TableCell align='right'>
													{item.itemDetails.itemPrice} Rwf
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
										<TableCell align='right'>
											<strong>2</strong>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Container>
		</ClientLayout>
	);
};

export default SingleProforma;
