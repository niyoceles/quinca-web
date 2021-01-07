import React from 'react';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	cardContent: {
		flexGrow: 1,
	},

	textInput: {
		width: '100%',
		margin: '10px',
	},
}));

const DateWidget = props => {
	const classes = useStyles();
	return (
		<form noValidate onSubmit={props.onSubmitForm}>
			<CardContent className={classes.cardContent}>
				<TextField
					variant='outlined'
					margin='normal'
					required
					className={classes.textInput}
					name='names'
					label='Name'
					onChange={props.handleOnChange}
					id='names'
					value={props.checkValue.names}
					helperText={
						props.checkSubmitted && !props.checkHelperText.names
							? 'is required'
							: null
					}
					error={
						props.checkSubmitted && !props.checkHelperText.names
							? 'is required'
							: null
					}
					autoComplete='names'
					autoFocus
				/>

				<TextField
					variant='outlined'
					margin='normal'
					required
					className={classes.textInput}
					name='email'
					label='Email'
					onChange={props.handleOnChange}
					id='email'
					value={props.checkValue.email}
					helperText={
						props.checkSubmitted && !props.checkHelperText.email
							? 'is required'
							: null
					}
					error={
						props.checkSubmitted && !props.checkHelperText.email
							? 'is required'
							: null
					}
					autoComplete='email'
					autoFocus
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					className={classes.textInput}
					name='phoneNumber'
					label='Phone number'
					onChange={props.handleOnChange}
					id='phoneNumber'
					value={props.checkValue.phoneNumber}
					helperText={
						props.checkSubmitted && !props.checkHelperText.phoneNumber
							? 'is required'
							: null
					}
					error={
						props.checkSubmitted && !props.checkHelperText.phoneNumber
							? 'is required'
							: null
					}
					autoComplete='phoneNumber'
					autoFocus
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					className={classes.textInput}
					name='address'
					label='Address'
					onChange={props.handleOnChange}
					id='address'
					value={props.checkValue.address}
					helperText={
						props.checkSubmitted && !props.checkHelperText.address
							? 'is required'
							: null
					}
					error={
						props.checkSubmitted && !props.checkHelperText.address
							? 'is required'
							: null
					}
					autoComplete='address'
					autoFocus
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					className={classes.textInput}
					name='location'
					label='Location'
					onChange={props.handleOnChange}
					id='location'
					value={props.checkValue.location}
					helperText={
						props.checkSubmitted && !props.checkHelperText.location
							? 'is required'
							: null
					}
					error={
						props.checkSubmitted && !props.checkHelperText.location
							? 'is required'
							: null
					}
					autoComplete='location'
					autoFocus
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						utils={DateFnsUtils}
						disableToolbar
						className={classes.textInput}
						variant='outlined'
						format='MM/dd/yyyy'
						margin='normal'
						id='date-picker-inline'
						label='Need at'
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
						className={classes.textInput}
						variant='outlined'
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
