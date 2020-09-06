import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Navbar from "../../components/Navbar";
import Divider from "@material-ui/core/Divider";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import SupplierItems from "../../components/supplier/SupplierItems";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { useDispatch, useSelector } from "react-redux";
import { getSupplier } from "../../redux/actions";
import { green } from "@material-ui/core/colors";
import ModalUi from "../../components/Modals/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Spinner from "../../components/Ui/Spinner/Spinner";
import moment from "moment";
import { hotelBooking } from "../../redux/actions/clientActions";
import { connect } from "react-redux";
import HotelWidget from "../../components/SidebarWidget/HotelWidget";
import TourWidget from "../../components/SidebarWidget/TourWidget";
import CarWidget from "../../components/SidebarWidget/CarWidget";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#f2f6fb",
    marginBottom: 40,
    borderRadius: "10px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: theme.spacing(2),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    position: "sticky",
    zIndex: "100",
  },
  titleOrganization: {
    marginTop: -50,
    marginLeft: 10,
    display: "flex",
  },
  areaStyle: {
    marginTop: -30,
    marginLeft: 25,
  },
  slide: {
    height: "400px",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  sticky: {
    display: "fixed",
  },
  btnSize: {
    margin: theme.spacing(1),
    width: "98%",
    color: "white",
  },
  btnBooking: {
    color: "#1976D2",
    border: "1px solid #eee",
    background: "white",
    position: "fixed",
    zIndex: 10,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Slides = () => {
  const classes = useStyles();
  return (
    <Carousel autoPlay={9000} infinite slidesPerPage={1} slidesPerScroll={1}>
      {[
        {
          image:
            "https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          title: "profile image 1",
        },
        {
          image:
            "https://images.unsplash.com/photo-1516540438350-9db0f4e6552f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          title: "profile image 2",
        },
        {
          image:
            "https://images.unsplash.com/photo-1539947257641-0f0e9f213528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          title: "profile image 3",
        },
      ].map((image) => (
        <div key={image.title} className={classes.slide}>
          <img src={image.image} alt={image.title} />
        </div>
      ))}
    </Carousel>
  );
};

const ViewSupplierPage = (props) => {
  const bookingItems = JSON.parse(localStorage.getItem("bookingSummary"));
  const totalPrice = (localStorage.getItem("totalPrice") || 0) * 1;
  const [location, setLocation] = useState("choose");

  const [selectedDate, setSelectedDate] = useState(moment());
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment());

  const [open, setOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    startDate: selectedDate,
    endDate: selectedDate,
    adult: 0,
    child: 0,
  });
  const classes = useStyles();
  const profileSupplier = useSelector(
    (state) => state.supplier.supplier.profile
  );
  const toggleModal = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const lastPath = window.location.pathname;
    const id = lastPath.split("/");
    dispatch(getSupplier(id[2]));
  }, [dispatch]);

  const handleOnChange = (e) => {
    const updatedBookingInfo = { ...bookingInfo };
    updatedBookingInfo[e.target.name] = e.target.value;
    setBookingInfo(updatedBookingInfo);
  };

  const onDateChange = (name, dateValue) => {
    name === "startDate"
      ? setCheckInDate(dateValue)
      : setCheckOutDate(dateValue);

    const updatedBookingInfo = { ...bookingInfo };
    const realDate = moment(dateValue).format("YYYY-MM-DD HH:mm:ss");
    updatedBookingInfo[name] = realDate;
    setBookingInfo(updatedBookingInfo);
    return;
  };

  useEffect(() => {
    localStorage.setItem("bookingExtras", JSON.stringify(bookingInfo));
  }, [bookingInfo]);

  const handlePayLater = async (itemId) => {
    const tempBookingInfo = JSON.parse(localStorage.getItem("bookingSummary"));
    const tempBookingEtras = JSON.parse(localStorage.getItem("bookingExtras"));
    const items = [...tempBookingInfo.map((item) => item.id)];
    const bookInfo = {
      ...tempBookingEtras,
      itemsArray: items,
    };
    await props.hotelBooking(itemId, bookInfo);
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      {profileSupplier ? (
        profileSupplier.map((index) => (
          <main key={index.id} container>
            {/* topBody unit */}
            <Divider />
            <Container item className={classes.cardGrid} maxWidth="lg">
              <Typography
                component="h2"
                variant="h4"
                color="textPrimary"
                className={classes.titleOrganization}
                gutterBottom
              >
                <span style={{ flex: 4 }}>{index.organization}</span>
                <span style={{ flex: 1 }}>
                  <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    className={classes.btnBooking}
                    onClick={toggleModal}
                  >
                    <NavigationIcon />
                    My booking summary
                  </Fab>
                </span>
              </Typography>
              <Typography component="span">
                <LocationOnIcon color="primary" />
                <p className={classes.areaStyle}>
                  {index.location}, {index.state}, {index.country}
                </p>
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={8}>
                  <Card className={classes.card} elevation={3}>
                    <Slides />
                    <CardContent className={classes.cardContent}>
                      <Card style={{ marginTop: 10 }} elevation={3}>
                        <CardHeader
                          avatar={<VerifiedUserIcon color="primary" />}
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={index.names}
                          subheader={index.createdAt}
                        />
                        <CardActions>
                          <Button size="large">
                            More about {index.organization}
                          </Button>
                        </CardActions>
                        <CardContent>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                          >
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like. This impressive paella is a perfect party dish
                            and a fun meal to cook together with your guests.
                            Add 1 cup of frozen peas along with the mussels, if
                            you like. This impressive paella is a perfect party
                            dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the
                            mussels, if you like. This impressive paella is a
                            perfect party dish and a fun meal to cook together
                            with your guests. Add 1 cup of frozen peas along
                            with the mussels, if you like.
                          </Typography>
                        </CardContent>
                      </Card>
                    </CardContent>
                    <CardActions>
                      <Button size="large" color="primary">
                        Views
                      </Button>
                      <Button size="large" color="primary">
                        Share on Social media
                      </Button>
                      <Button size="small" color="primary">
                        <FacebookIcon fontSize="large" />
                      </Button>
                      <Button size="small" color="primary">
                        <InstagramIcon fontSize="large" />
                      </Button>
                      <Button size="small" color="primary">
                        <LinkedInIcon fontSize="large" />
                      </Button>
                      <Button size="small" color="primary">
                        <TwitterIcon fontSize="large" />
                      </Button>
                      <Button size="medium" color="primary">
                        <EmailIcon fontSize="large" />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Card
                    className={classes.card}
                    elevation={3}
                    style={{
                      top: "70",
                      bottom: "200",
                      height: "48%",
                      overflow: "auto",
                      textAlign: "center",
                    }}
                  >
                    {/* sidebar widgets -------------------------------------------- */}
                    {profileSupplier[0].supplierType === "Hotel" ? (
                      <HotelWidget
                        selectedDate={selectedDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        onDateChange={onDateChange}
                        handleOnChange={handleOnChange}
                      />
                    ) : profileSupplier[0].supplierType === "Tour" ? (
                      <TourWidget
                        selectedDate={selectedDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        onDateChange={onDateChange}
                        handleOnChange={handleOnChange}
                      />
                    ) : (
                      <CarWidget
                        selectedDate={selectedDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        onDateChange={onDateChange}
                        handleOnChange={handleOnChange}
                        location={location}
                      />
                    )}
                  </Card>
                </Grid>
              </Grid>

              {/* Supplier items component --------------------------------------- */}
              <SupplierItems items={index.items} />

              {/* Booking summary modal ----------------------------------------------*/}
              <ModalUi open={open} toggleModal={toggleModal}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5} md={5}>
                    <Card className={classes.card} elevation={3}>
                      <Typography
                        component="h1"
                        variant="h3"
                        color="textPrimary"
                        gutterBottom
                        item
                        md={12}
                        align="center"
                        style={{ margin: "30px" }}
                      >
                        {index.organization}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Typography
                      component="h2"
                      variant="h4"
                      color="textPrimary"
                      gutterBottom
                      item
                      md={12}
                      align="center"
                    >
                      Your booking summary
                    </Typography>
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableBody>
                          {bookingItems !== null ? (
                            bookingItems.map((item) => (
                              <TableRow key={item.key}>
                                <TableCell component="th" scope="row">
                                  {item.itemName}
                                </TableCell>
                                <TableCell align="right">
                                  {item.itemPrice}
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
                              style={{ marginTop: "20px" }}
                            >
                              Oops! You haven't booked anything yet!
                            </Typography>
                          )}
                          {bookingItems && (
                            <TableRow>
                              <TableCell component="th" scope="row">
                                <strong>Total</strong>
                              </TableCell>
                              <TableCell align="right">
                                <strong>{totalPrice}</strong>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <hr />
                    {bookingItems && (
                      <CardActions
                        style={{ position: "relative", bottom: "0" }}
                      >
                        <Button
                          color="primary"
                          size="small"
                          style={{
                            backgroundColor: "#0080003a",
                            width: "50%",
                            color: "green",
                          }}
                          onClick={() => handlePayLater(index.id)}
                        >
                          Pay later
                        </Button>

                        <Button
                          color="primary"
                          size="small"
                          style={{ backgroundColor: "#1976d23f", width: "50%" }}
                        >
                          Continue to checkout
                        </Button>
                      </CardActions>
                    )}
                  </Grid>
                </Grid>
              </ModalUi>
              {profileSupplier[0].items.length > 0 ? (
                <Grid item xs={12} sm={8} md={8}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btnSize}
                      onClick={toggleModal}
                    >
                      Book now
                    </Button>
                  </ThemeProvider>
                </Grid>
              ) : null}
            </Container>
            <Divider />
          </main>
        ))
      ) : (
        <Spinner />
      )}
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default connect(null, { hotelBooking })(ViewSupplierPage);
