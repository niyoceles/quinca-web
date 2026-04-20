import {
	CONTACT_US_DATA,
	CONTACT_US_FAILURE,
	CONTACT_US_SUCCESS,
	CONTACT_SUCCESS,
	CONTACT_FAILURE,
	CONTACT_REQUEST,
	FETCH_INQUIRIES_REQUEST,
	FETCH_INQUIRIES_SUCCESS,
	FETCH_INQUIRIES_FAILURE,
	MARK_INQUIRY_READ_SUCCESS,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

export const sendContactEmail = (user) => (dispatch) => {
	dispatch({ type: CONTACT_REQUEST });
	return axios
		.post(`${REACT_APP_BACKEND}/contact/`, user)
		.then((res) => {
			dispatch({
				type: CONTACT_SUCCESS,
				payload: res.data.message,
			});
			toast.success(res.data.message);
		})
		.catch((err) => {
			dispatch({
				type: CONTACT_FAILURE,
				payload: err.response?.data?.message || 'Failed to contact',
			});
		});
};

export const getInquiries = () => (dispatch) => {
	dispatch({ type: FETCH_INQUIRIES_REQUEST });
	return axios
		.get(`${REACT_APP_BACKEND}/contact/`)
		.then((res) => {
			dispatch({
				type: FETCH_INQUIRIES_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: FETCH_INQUIRIES_FAILURE,
				payload: err.response?.data?.message || 'Failed to fetch inquiries',
			});
		});
};

export const markInquiryRead = (id) => (dispatch) => {
	return axios
		.patch(`${REACT_APP_BACKEND}/contact/${id}/read`, {})
		.then(() => {
			dispatch({
				type: MARK_INQUIRY_READ_SUCCESS,
				payload: id,
			});
		})
		.catch((err) => {
			console.error('Failed to mark inquiry as read', err);
		});
};
