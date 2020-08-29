import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  select: {
    border: "none",
    outline: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} sm={3}>
        <select className={classes.select}>
          <option>Search by Listing or city name</option>
          <option>Muhanga</option>
          <option>Kigali</option>
          <option>Musanze</option>
        </select>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          id="date"
          //   label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <select className={classes.select}>
          <option>Guest</option>
          <option>1 Guest</option>
          <option>2 Guest</option>
        </select>
      </Grid>
      <Grid item xs={6} sm={2}>
        <select className={classes.select}>
          <option>Select</option>
          <option>Private</option>
          <option>Educational</option>
        </select>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Button variant="contained" color="primary" margin="normal" fullWidth>
          <SearchIcon /> Search
        </Button>
      </Grid>
    </Grid>
  );
};
