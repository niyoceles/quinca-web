import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(() => ({
  cardContent: {
    flexGrow: 1,
  },

  select: {
    width: "75%",
    margin: "10px",
    marginLeft: 0,
    display: "block",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: 5,
  },
  box: {
    marginTop: 0,
    marginBottom: 10,
    textAlign: "center",
    borderRadius: 10,
    border: "1px solid #eee",
    padding: 10,
  },
}));

const CarWidget = (props) => {
  const classes = useStyles();

  return (
    <form>
      <CardContent className={classes.cardContent}>
        <div className={classes.box}>
          <h5 style={{ textAlign: "left", padding: 0, margin: 5 }}>Pick up</h5>
          <Divider />
          <FormControl className={classes.formControl}>
            <InputLabel>Location</InputLabel>
            <Select
              name="pickup"
              className={classes.select}
              value="choose"
              onChange={props.handleOnChange}
            >
              <MenuItem value='Kigali'>Kigali</MenuItem>
              <MenuItem value='Musanze'>Musanze</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                style={{ width: "75%" }}
                value={props.checkInDate}
                onChange={(value) => {
                  props.onDateChange("startDate", value);
                }}
                label="Time"
                onError={console.log}
                minDate={new Date()}
                format="yyyy/MM/dd hh:mm a"
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>

        <div className={classes.box}>
          <h5 style={{ textAlign: "left", padding: 0, margin: 5 }}>Drop off</h5>
          <Divider />
          <FormControl className={classes.formControl}>
            <InputLabel>Location</InputLabel>
            <Select
              className={classes.select}
              value={props.location}
              onChange={props.handleOnChange}
              name="dropoff"
            >
               <MenuItem value='Kigali'>Kigali</MenuItem>
              <MenuItem value='Musanze'>Musanze</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                style={{ width: "75%" }}
                value={props.checkOutDate}
                onChange={(value) => {
                  props.onDateChange("endDate", value);
                }}
                label="Time"
                onError={console.log}
                minDate={props.checkInDate}
                format="yyyy/MM/dd hh:mm a"
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
      </CardContent>
    </form>
  );
};

export default CarWidget;
