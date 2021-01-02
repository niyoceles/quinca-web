import 'dotenv/config';
import {
	GET_HOME_ITEMS_SUCCESS,
	GET_HOME_ITEMS_FAILURE,
	GET_CATEGORY_ITEMS_SUCCESS,
	GET_CATEGORY_ITEMS_FAILURE,
	GET_TOURS_SUCCESS,
	GET_TOURS_FAILURE,
	GET_CARS_SUCCESS,
	GET_CARS_FAILURE,
	GET_MY_PROFORMA_FAILURE,
	GET_MY_PROFORMA_SUCCESS,
	REQUEST_PROFORMA_FAILURE,
	REQUEST_PROFORMA_SUCCESS,
	BOOKING,
	GET_CLIENT_BOOKINGS,
	GET_SINGLE_PROFORMA_SUCCESS,
	GET_SINGLE_PROFORMA_FAILURE,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

// Get my profile
export const getHomeItems = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/item/home`)
		.then(res => {
			dispatch({ type: GET_HOME_ITEMS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_HOME_ITEMS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getCategoryItems = category => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/category/${category}`)
		.then(res => {
			console.log('hhhhhhhhhhhh', res.data);
			dispatch({ type: GET_CATEGORY_ITEMS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			console.log('eee', err.response ? err.response.data : null);
			dispatch({
				type: GET_CATEGORY_ITEMS_FAILURE,
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
			dispatch({ type: GET_HOME_ITEMS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_HOME_ITEMS_FAILURE,
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

// Request proforma
export const requestProforma = proformaInfo => dispatch => {
	axios
		.post(`${REACT_APP_BACKEND}/proforma`, proformaInfo)
		.then(res => {
			dispatch({ type: REQUEST_PROFORMA_SUCCESS, payload: res.data });
			localStorage.removeItem('bookingSummary');
			localStorage.removeItem('totalPrice');
			toast.success(res.data.message);
		})
		.catch(err => {
			dispatch({
				type: REQUEST_PROFORMA_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getMyProforma = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/proforma/my`)
		.then(res => {
			dispatch({ type: GET_MY_PROFORMA_SUCCESS, payload: res.data.myproforma });
			localStorage.removeItem('bookingSummary');
			localStorage.removeItem('totalPrice');
			toast.success(res.data.message);
		})
		.catch(err => {
			dispatch({
				type: GET_MY_PROFORMA_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getSingleProforma = id => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/proforma/${id}`)
		.then(res => {
			dispatch({
				type: GET_SINGLE_PROFORMA_SUCCESS,
				payload: res.data,
			});
			toast.success(res.data.message);
		})
		.catch(err => {
			dispatch({
				type: GET_SINGLE_PROFORMA_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
// get client bookings
export const getBookings = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/booking/`)
		.then(res => {
			dispatch({ type: GET_CLIENT_BOOKINGS, payload: res.data.mybooked });
			console.log('\n\n\n\n Bookings:', res.data.mybooked);
			// toast.success(res.data.message);
		})
		.catch(err => {
			console.log('\n\n\n\n Bookings:', err);
			return err;
		});
};
