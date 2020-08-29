import React from 'react';
import 'date-fns';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import CarSearch from './CarSearch';
import TourSearch from './TourSearch';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '80%',
    margin: '50px 0 0 10%',
    "& div": {
      borderBottom: 'none',
    }
  },
  search: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  customInputs: {
    border: 'none',
    outline: 'none',
  }
}));
function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          // margin="normal"
          id="date-picker-dialog"
          label={props.name}
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

function FullWidthGrid() {
  const classes = useStyles();
  const [name, setName] = React.useState('1 Adult, 2 Childs');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={classes.grid}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={3}>
          <InputBase
          className={classes.input}
          placeholder="Search by Hotel names"
          inputProps={{ 'aria-label': 'Search by hotel name' }}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <MaterialUIPickers name = "Checks in"/>
        </Grid>
        <Grid item xs={6} sm={2}>
          <MaterialUIPickers name="Checks out"/>
        </Grid>
        <Grid item xs={6} sm={3}>
        < form className={classes.frm} noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Number of peoples"
              value={name}
              onChange={handleChange}
              className = {classes.customInputs}
              // variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Button variant="contained" color="primary" margin="normal">
             <SearchIcon/> Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="hotels" {...a11yProps(0)} />
          <Tab label="cars" {...a11yProps(1)} />
          <Tab label="tours" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FullWidthGrid/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CarSearch/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TourSearch/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}