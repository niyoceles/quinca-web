import 'dotenv/config';
import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,
	GET_SUPPLIER_SUCCESS,
	GET_SUPPLIER_FAILURE,
} from '../types';
import axios from 'axios';
const { REACT_APP_BACKEND } = process.env;

// Get my profile
export const getMyProfile = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/myprofile`)
		.then(res => {
			dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_PROFILE_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// update profile
export const updateMyProfile = () => dispatch => {
	// not working
	axios
		.get(`${REACT_APP_BACKEND}/supplier/myprofile`)
		.then(res => {
			dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_PROFILE_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Get my profile
export const viewItem = id => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/item/${id}`)
		.then(res => {
			dispatch({ type: GET_SUPPLIER_SUCCESS, payload: res.data.item });
		})
		.catch(err => {
			dispatch({
				type: GET_SUPPLIER_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
