import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    flexGrow: 1,
  },

  standardNumber: {
    width: "72%",
    margin: "10px",
  },
}));

const TourWidget = (props) => {
  const classes = useStyles();
  return (
    <form>
      <CardContent className={classes.cardContent}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            utils={DateFnsUtils}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Day"
            value={props.checkInDate}
            onChange={(value) => {
              props.onDateChange("startDate", value);
            }}
            minDate={new Date()}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
         </MuiPickersUtilsProvider>
        <TextField
          className={classes.standardNumber}
          name="adult"
          label="Adults"
          type="number"
          defaultValue={1}
          inputProps={{ min: "0", max: "30" }}
          onChange={props.handleOnChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          className={classes.standardNumber}
          label="Children"
          name="child"
          type="number"
          defaultValue={0}
          inputProps={{ min: "0", max: "13" }}
          onChange={props.handleOnChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </CardContent>
    </form>
  );
};

export default TourWidget;
