import 'dotenv/config';
import {
	GET_HOTELS_SUCCESS,
	GET_HOTELS_FAILURE,
	GET_TOURS_SUCCESS,
	GET_TOURS_FAILURE,
	GET_CARS_SUCCESS,
	GET_CARS_FAILURE,
	BOOKING,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

// Get my profile
export const getHotels = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/hotels`)
		.then(res => {
			dispatch({ type: GET_HOTELS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_HOTELS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Get my profile
export const getTours = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/tours`)
		.then(res => {
			dispatch({ type: GET_TOURS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_TOURS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Get my profile
export const getCars = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/cars`)
		.then(res => {
			dispatch({ type: GET_CARS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_CARS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Get my profile
export const updateMyProfile = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/myprofile`)
		.then(res => {
			dispatch({ type: GET_HOTELS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_HOTELS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Book hotel room(s), car or destination
export const hotelBooking = (itemId, bookingInfo) => dispatch => {
	axios
		.post(`${REACT_APP_BACKEND}/booking/${itemId}`, bookingInfo)
		.then(res => {
			dispatch({ type: BOOKING, payload: res.data.bookedItems });
			localStorage.removeItem('bookingSummary');
			localStorage.removeItem('totalPrice');
			toast.success(res.data.message);
		})
		.catch(err => {
			return err;
		});
};
