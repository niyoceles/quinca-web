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
import itemImage from '../../assets/images/bg2.unsplash.jpg';

const useStyles = makeStyles((theme) => ({
  image: {
    width: 200,
    height: 150,
    marginRight: "10px",
    paddingRight:10,
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

const ProformaItems = (props) => {
  const classes = useStyles();
  console.log('zzzzz', props.items);

  return (
    <div>
      <Typography
        component="h3"
        variant="h5"
        align="left"
        color="textPrimary"
      >
        Availability for proforma
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
              sm={12}
              md={12}
              className={classes.itemBox}
            >
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} md={4}>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="..."
                      src={itemImage}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: "flex" }}>
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
                          control={
                            <Checkbox
                              color="primary"
                              onClick={(e) => props.addItem(e, item)}
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
                        {item.itemPrice + "Rwf"}
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
export default ProformaItems;
