import React from 'react';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	cardContent: {
		flexGrow: 1,
	},

	standardNumber: {
		width: '72%',
		margin: '10px',
	},
}));

const DateWidget = props => {
	const classes = useStyles();
	return (
		<form>
			<CardContent className={classes.cardContent}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						utils={DateFnsUtils}
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						margin='normal'
						id='date-picker-inline'
						label='Pick up'
						value={props.checkInDate}
						onChange={value => {
							props.onDateChange('startDate', value);
						}}
						minDate={new Date()}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
					<KeyboardDatePicker
						utils={DateFnsUtils}
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						margin='normal'
						id='date-picker-inline'
						label='Deadline'
						value={props.checkOutDate}
						onChange={value => {
							props.onDateChange('endDate', value);
						}}
						minDate={props.checkInDate}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
			</CardContent>
		</form>
	);
};

export default DateWidget;
