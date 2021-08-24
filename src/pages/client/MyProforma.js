import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProforma } from '../../redux/actions/clientActions';
import moment from 'moment';
import ClientLayout from '../../layouts/ClientLayout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'id', label: 'Name', minWidth: 170 },
  { id: 'paymentType', label: 'Payment Type', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'isPaid',
    label: 'Paid',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'pickupDate',
    label: 'Needed from',
    minWidth: 100,
    align: 'center',
    format: (value) => moment(value).format('YYYY-MM-DD'),
  },
  {
    id: 'deadline',
    label: 'Deadline',
    minWidth: 100,
    align: 'center',
    format: (value) => moment(value).format('YYYY-MM-DD'),
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

const MyProforma = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const myprofroma = useSelector((state) => state.client.proformaItems);
  const error = useSelector((state) => state.client.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProforma());
  }, [dispatch]);

  const handleClickOpen = (id) => {
    let path = `/my-proforma/${id}`;
    history.push(path);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ClientLayout>
      <Paper className={classes.root}>
        <div>
          <Typography variant="h4" gutterBottom style={{ padding: 10 }}>
            My Proforma
          </Typography>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
              {myprofroma.length > 0 ? (
                myprofroma
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((proforma) => {
                    return (
                      <TableBody>
                        <TableRow
                          hover
                          role="link"
                          tabIndex={-1}
                          key={proforma.id}
                          className={classes.row}
                          onClick={() => handleClickOpen(proforma.id)}
                        >
                          {columns.map((column) => {
                            const value = proforma[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'items' && value !== undefined
                                  ? value.id
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
              ) : error.length !== 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography
                      component="p"
                      variant="p"
                      color="textPrimary"
                      gutterBottom
                      item
                      align="center"
                      style={{ marginTop: '20px' }}
                    >
                      Oops! You haven't any proforma yet!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={myprofroma.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </ClientLayout>
  );
};

export default MyProforma;
