import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import '@brainhubeu/react-carousel/lib/style.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import CartLayout from '../../layouts/CartLayout';
import PersonalInfoWidget from '../../components/SidebarWidget/PersonalInfoWidget';
// import MakePayment from '../../components/payment/MakePayment';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    marginBottom: 40,
    borderRadius: '10px',
    paddingLeft: '100px',
    paddingRight: '100px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
  },
  sticky: {
    display: 'fixed',
  },
  btnSize: {
    margin: theme.spacing(1),
    width: '98%',
    color: 'white',
  },
  title: {
    padding: 15,
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const bookedItems = JSON.parse(localStorage.getItem('orderSummary'));
  let [totalPrice, setTotalPrice] = useState(
    (localStorage.getItem('totalPrice') || 0) * 1
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment());

  const [open, setOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    needDate: selectedDate,
    deadline: selectedDate,
    names: '',
    email: '',
    phoneNumber: '',
    address: '',
    location: '',
  });

  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const [orderSummary, setOrderSummary] = useState(
    bookedItems !== null ? bookedItems : []
  );

  // const handleAddItem = (e, item, itemNumber) => {
  //   const { id, itemName, itemPrice } = item;
  //   const orderItem = {
  //     id,
  //     itemName,
  //     itemPrice: itemPrice * 1,
  //     itemNumber: itemNumber * 1,
  //   };
  //   const ordered = orderSummary.findIndex((order) => order.id === id);
  //   let updatedOrder = [...orderSummary];

  //   console.log('===ordered===>', ordered);

  //   if (ordered >= 0) {
  //     updatedOrder[ordered] = orderItem;
  //   } else updatedOrder = [...orderSummary, orderItem];

  //   setOrderSummary(updatedOrder);
  //   localStorage.setItem('orderSummary', JSON.stringify(updatedOrder));
  //   const finalOrder = JSON.parse(localStorage.getItem('orderSummary'));
  //   const totArray = finalOrder.map(
  //     (order) => order.itemPrice * order.itemNumber
  //   );
  //   const total = totArray.reduce((x, y) => x + y, 0);

  //   localStorage.setItem('totalPrice', total);
  //   setOpen(false);
  // };

  const handleRemoveItem = (e, item) => {
    if (item) {
      const requested = orderSummary.find((bk) => bk.id === item.id);
      let updatedOrder = [...orderSummary];
      if (requested) {
        updatedOrder = orderSummary.filter((bk) => bk.id !== item.id);
      }
      setOrderSummary(updatedOrder);
      if (updatedOrder.length === 0) {
        localStorage.removeItem('orderSummary');
      } else {
        localStorage.setItem('orderSummary', JSON.stringify(updatedOrder));
      }
    }
  };

  const handleOnChange = (e) => {
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
    const finalOrder = JSON.parse(localStorage.getItem('orderSummary'));
    if (finalOrder) {
      const totArray = finalOrder.map(
        (order) => order.itemPrice * order.itemNumber
      );
      const total = totArray.reduce((x, y) => x + y, 0);

      localStorage.setItem('totalPrice', total);
      setTotalPrice((localStorage.getItem('totalPrice') || 0) * 1);
    }
  }, [orderInfo, orderSummary]);

  const handlePayLater = async () => {
    const tempOrderInfo = JSON.parse(localStorage.getItem('orderSummary'));
    const tempOrderEtras = JSON.parse(localStorage.getItem('orderExtras'));
    const category =
      tempOrderInfo && tempOrderInfo.map((item) => item.category).toString();
    const bookInfo = {
      ...tempOrderEtras,
      itemsArray: tempOrderInfo,
      category,
    };
    setSubmitted(true);
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
    <CartLayout>
      <main container>
        {/* topBody unit */}
        <Divider />
        <Container item className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            color="textPrimary"
            gutterBottom
            item
            md={12}
            align="left"
          >
            Checkout
          </Typography>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={12} alignItems="center">
              <Card className={classes.card} elevation={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      component="h4"
                      variant="h6"
                      color="textPrimary"
                      gutterBottom
                      item
                      md={12}
                      align="left"
                      className={classes.title}
                    >
                      Review your order
                    </Typography>
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableBody>
                          {bookedItems !== null ? (
                            bookedItems.map((item) => (
                              <TableRow key={item.key}>
                                <TableCell component="th" scope="row">
                                  {item.itemName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {item.itemNumber}
                                </TableCell>
                                <TableCell align="right">
                                  {item.itemPrice}
                                </TableCell>
                                <TableCell align="right">
                                  <b>{item.itemPrice * item.itemNumber}</b> Rwf
                                </TableCell>
                                <TableCell align="right">
                                  <Button color="secondary">
                                    <CancelIcon
                                      onClick={(e) => handleRemoveItem(e, item)}
                                    />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <Typography
                              component="h4"
                              variant="h6"
                              color="textPrimary"
                              gutterBottom
                              item
                              md={12}
                              align="center"
                              style={{ marginTop: '20px' }}
                            >
                              Oops! You haven't added to cart anything!
                            </Typography>
                          )}
                          {bookedItems ? (
                            <TableRow>
                              <TableCell component="th" scope="row">
                                <strong>Total</strong>
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell align="right">
                                <strong>{totalPrice} FRW</strong>
                              </TableCell>
                            </TableRow>
                          ) : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Grid item xs={12} sm={12} md={12}>
                      <hr />
                      <Typography
                        component="h4"
                        variant="h6"
                        color="textPrimary"
                        gutterBottom
                        item
                        md={12}
                        align="left"
                        className={classes.title}
                      >
                        Shipping address
                      </Typography>
                      <PersonalInfoWidget
                        selectedDate={selectedDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        onDateChange={onDateChange}
                        handleOnChange={handleOnChange}
                        onSubmitForm={handlePayLater}
                        checkValue={orderInfo}
                        checkHelperText={orderInfo}
                        checkSubmitted={submitted}
                        error={orderInfo}
                      />
                      <hr />
                    </Grid>
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableBody>
                          {bookedItems && totalPrice !== 0 ? (
                            <>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  <strong>Items ({bookedItems.length})</strong>
                                </TableCell>
                                <TableCell align="right">
                                  <strong>{bookedItems.length}</strong>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  <strong>Total Amount to pay</strong>
                                </TableCell>
                                <TableCell align="right">
                                  <strong>{totalPrice} FRW</strong>
                                </TableCell>
                              </TableRow>
                            </>
                          ) : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <hr />
                    {bookedItems ? (
                      <CardActions
                        style={{ position: 'relative', bottom: '0' }}
                      >
                        <Button
                          color="primary"
                          size="medium"
                          variant="contained"
                          style={{
                            width: '80%',
                          }}
                          onClick={() => handlePayLater()}
                          disabled={isButtonDisabled}
                        >
                          Pay later
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          size="medium"
                          onClick={handleCancelOrder}
                        >
                          Cancel
                        </Button>
                      </CardActions>
                    ) : null}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/* 
						<Grid item xs={12} sm={12} md={4}>
							<Card elevation={1} className={classes.sticky}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12} md={12}>
										<Typography
											component='h4'
											variant='h6'
											color='textPrimary'
											gutterBottom
											item
											md={12}
											align='left'
											className={classes.title}
										>
											Order summary
										</Typography>
										<TableContainer>
											<Table
												className={classes.table}
												aria-label='customized table'
											>
												<TableBody>
													{bookedItems && totalPrice !== 0 ? (
														<>
															<TableRow>
																<TableCell component='th' scope='row'>
																	<strong>Items ({bookedItems.length})</strong>
																</TableCell>
																<TableCell align='right'>
																	<strong>{bookedItems.length}</strong>
																</TableCell>
															</TableRow>
															<TableRow>
																<TableCell component='th' scope='row'>
																	<strong>Total Amount to pay</strong>
																</TableCell>
																<TableCell align='right'>
																	<strong>{totalPrice} FRW</strong>
																</TableCell>
															</TableRow>
														</>
													) : null}
												</TableBody>
											</Table>
										</TableContainer> */}

            {/* <hr />
										{bookedItems && totalPrice !== 0 ? (
											<CardActions
												style={{ position: 'relative', bottom: '0' }}
											>
												<Button
													color='primary'
													variant='contained'
													size='medium'
													onClick={() => handlePayLater()}
													disabled={isButtonDisabled}
													style={{
														width: '70%',
													}}
												>
													Pay later
												</Button>
												<Button
													color='secondary'
													variant='outlined'
													size='medium'
													onClick={handleCancelOrder}
												>
													Cancel
												</Button>
											</CardActions>
										) : null}
										<hr /> */}
            {/* <CardActions style={{ position: 'relative', bottom: '0' }}>
											<MakePayment totalPrice={totalPrice} />
										</CardActions> */}
            {/* </Grid>
								</Grid>
							</Card>
						</Grid> */}
            {/* end */}
          </Grid>
          <br />
          <br />
        </Container>
        <Divider />
      </main>
    </CartLayout>
  );
};

export default Cart;
