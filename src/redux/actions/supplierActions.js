import 'dotenv/config';
import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../types';
import axios from 'axios';
const { REACT_APP_BACKEND } = process.env;

// Get my profile
export const getMyProfile = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/myprofile`)
		.then(res => {
      // console.log('ccchhhhhh', res.data);
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
export const updateMyProfile = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/supplier/myprofile`)
		.then(res => {
      // console.log('ccchhhhhh', res.data);
			dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_PROFILE_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

