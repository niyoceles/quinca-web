import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../redux/actions/clientActions';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import SingleBooking from './SingleBooking';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClientLayout from '../../layouts/ClientLayout';

const columns = [
	{ id: 'items', label: 'Name', minWidth: 170 },
	{ id: 'paymentType', label: 'Payment Type', minWidth: 100 },
	{
		id: 'status',
		label: 'Status',
		minWidth: 100,
		align: 'center',
		format: value => value.toLocaleString('en-US'),
	},
	{
		id: 'isPaid',
		label: 'Paid',
		minWidth: 100,
		align: 'center',
		format: value => value.toLocaleString('en-US'),
	},
	{
		id: 'startDate',
		label: 'Check in',
		minWidth: 100,
		align: 'center',
		format: value => moment(value).format('YYYY-MM-DD'),
	},
	{
		id: 'endDate',
		label: 'Check out',
		minWidth: 100,
		align: 'center',
		format: value => moment(value).format('YYYY-MM-DD'),
	},
	{
		id: 'amount',
		label: 'Amount',
		minWidth: 100,
		align: 'center',
	},
];

const useStyles = makeStyles({
	root: {
		width: '75%',
		margin: '100px auto',
	},
	container: {
		maxHeight: 500,
	},
	row: {
		cursor: 'pointer',
		'&:hover': {
			background: '#1976d26c !important',
			borderRadius: '12px !important',
			boxShadow: '0 2px 3px #ccc',
		},
	},
});

const Bookings = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [bookingDetails, setBookingDetails] = React.useState({});

	const handleClickOpen = bookingInfo => {
		setBookingDetails(bookingInfo);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const myBookings = useSelector(state => state.client.bookedItems);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBookings());
	}, [dispatch]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = async event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<ClientLayout>
			<SingleBooking close={handleClose} open={open} details={bookingDetails} />
      <Container item className={classes.cardGrid} maxWidth='lg'>
				<div>
					<Typography variant='h4' gutterBottom style={{ padding: 10 }}>
						Bookings
					</Typography>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									{columns.map(column => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							{myBookings.length > 0 ? (
								myBookings
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(booking => {
										return (
											<TableBody>
												<TableRow
													hover
													role='checkbox'
													tabIndex={-1}
													key={booking.itemId}
													className={classes.row}
													onClick={() => handleClickOpen(booking)}
												>
													{columns.map(column => {
														const value = booking[column.id];
														return (
															<TableCell key={column.id} align={column.align}>
																{column.id === 'items' && value !== undefined
																	? value.itemName
																	: column.format
																	? column.format(value)
																	: value}
															</TableCell>
														);
													})}
												</TableRow>
											</TableBody>
										);
									})
							) : (
								<TableRow>
									<TableCell colSpan={7} align='center'>
										<CircularProgress />
									</TableCell>
								</TableRow>
							)}
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={myBookings.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</div>
        </Container>
		</ClientLayout>
	);
};

export default Bookings;
