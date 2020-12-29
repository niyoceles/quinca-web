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
	BOOKING,
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
