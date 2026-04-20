import React, { useEffect, Fragment } from 'react';
import clsx from 'clsx';
import 'dotenv/config';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import { getAllOrders } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Title from '../../layouts/Title';
import RequestedOrder from './RequestedOrder';

const useStyles1 = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = event => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = event => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = event => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = event => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 700,
	},
	table: {
		minWidth: 500,
	},
	dashboard: {
		marginTop: 10,
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const AllOrders = () => {
	const classes = useStyles2();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const orders = useSelector(state => state.order.allOrders);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<Fragment>
			<div className={classes.dashboard}>
				<Paper className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Title>Requested orders</Title>
							</Paper>
						</Grid>
					</Grid>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									<StyledTableCell>Names</StyledTableCell>
									<StyledTableCell align='left'>Phone</StyledTableCell>
									<StyledTableCell align='right'>Email</StyledTableCell>
									<StyledTableCell align='right'>No orders</StyledTableCell>
									<StyledTableCell align='right'>Actions</StyledTableCell>
									<StyledTableCell align='right'>Created Time</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders === 'No Order Item found' ? (
									<TableRow>
										<TableCell colSpan={6} align='center' size='small'>
											{orders}
										</TableCell>
									</TableRow>
								) : (
									<>
										{(rowsPerPage > 0
											? orders.slice(
													page * rowsPerPage,
													page * rowsPerPage + rowsPerPage
											  )
											: orders
										).map(item => (
											<RequestedOrder key={item.id} oneRequest={item} />
										))}

										{emptyRows > 0 && (
											<TableRow style={{ height: 53 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</>
								)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											{ label: 'All', value: -1 },
										]}
										colSpan={3}
										count={orders.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: { 'aria-label': 'rows per page' },
											native: true,
										}}
										onChangePage={handleChangePage}
										onChangeRowsPerPage={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</Paper>
			</div>
		</Fragment>
	);
};

export default AllOrders;
