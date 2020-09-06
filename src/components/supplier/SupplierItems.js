import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fab from "@material-ui/core/Fab";
import { Checkbox } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  titleOrganization: {
    marginTop: "50px",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: "10px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
  itemBox: {
    boxShadow: "0 2px 3px 0 #ccc",
    margin: "20px 0 0 0px",
    width: "90%",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
}));

const SupplierItems = (props) => {
  const classes = useStyles();
  const bookings = JSON.parse(localStorage.getItem("bookingSummary"));
  const [bookingSummary, setBookingSummary] = useState(
    bookings !== null ? bookings : []
  );

  const handleAddItem = (e, item) => {
    console.log(e.target.firstChild);
    const tempTot = (localStorage.getItem("totalPrice") || 0) * 1;
    const tot = tempTot + item["itemPrice"] * 1;
    localStorage.setItem("totalPrice", tot);

    const { id, itemName, itemPrice } = item;
    const bookItem = {
      id,
      itemName,
      itemPrice: itemPrice * 1,
    };
    const booked = bookingSummary.find((bk) => bk.id === item.id);
    let updatedBooking = [...bookingSummary, bookItem];
    if (booked) {
      updatedBooking = bookingSummary.filter((bk) => bk.id !== item.id);
      const updatedTotPrice = tempTot - item["itemPrice"] * 1;
      localStorage.setItem("totalPrice", updatedTotPrice);
    }
    setBookingSummary(updatedBooking);
    localStorage.setItem("bookingSummary", JSON.stringify(updatedBooking));
  };

  return (
    <div>
      <Typography
        component="h3"
        variant="h5"
        align="left"
        color="textPrimary"
        className={classes.titleOrganization}
        gutterBottom
      >
        Availability
      </Typography>

      <div>
        {props.items &&
          props.items.map((item) => (
            <Grid
              key={item.itemName}
              container
              spacing={3}
              item
              xs={12}
              sm={8}
              md={8}
              className={classes.itemBox}
            >
              <Grid container spacing={3}>
                <Grid item xs={4} sm={2} md={2}>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="..."
                      src={item.itemImage}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={9} md={9} style={{ display: "flex" }}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {item.itemName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {item.itemDescription}
                      </Typography>
                    </Grid>

                    <FormControl component="fieldset">
                      <FormGroup>
                        <FormControlLabel
                          value="Select"
                          control={
                            <Checkbox
                              color="primary"
                              onClick={(e) => handleAddItem(e, item)}
                            />
                          }
                          label="Select"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="add"
                        className={classes.btnBooking}
                      >
                        {item.itemPrice + "Rwf/Per night"}
                      </Fab>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </div>
    </div>
  );
};
export default SupplierItems;
