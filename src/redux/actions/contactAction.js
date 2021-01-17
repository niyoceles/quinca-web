import 'dotenv/config';
import {
	CONTACT_US_DATA,
	CONTACT_US_FAILURE,
	CONTACT_US_SUCCESS,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

export const sendContactEmail = contactData => dispatch => {
	dispatch({ type: CONTACT_US_DATA, payload: contactData });
	axios
		.post(`${REACT_APP_BACKEND}/contact`, contactData)
		.then(res => {
			dispatch({ type: CONTACT_US_SUCCESS, payload: res.data.message });
			toast.success(res.data.message);
		})
		.catch(err => {
			dispatch({
				type: CONTACT_US_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
