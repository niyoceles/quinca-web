import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
} from '../types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const { REACT_APP_BACKEND } = process.env;

export const loginUser = loginData => dispatch => {
	// dispatch({ type: LOADING_UI });
	dispatch({ type: LOGIN_REQUEST, payload: loginData });
	axios
		.post(`${REACT_APP_BACKEND}/user/login`, loginData)
		.then(res => {
			const token = res.data.token || (res.data.data && res.data.data.token);
			if (token) {
				setAuthorization(token);
				dispatch({ type: LOGIN_SUCCESS, payload: res.data });
			} else {
				dispatch({
					type: LOGIN_FAILURE,
					payload: 'Login successful but token missing from response',
				});
			}
		})
		.catch(err => {
			const data = err.response?.data;
			dispatch({
				type: LOGIN_FAILURE,
				payload: data?.error || err.message,
				code: data?.code || null,
			});
		});
};

export const signupUser = newUserData => dispatch => {
	dispatch({ type: REGISTER_REQUEST, payload: newUserData });
  
  // Conditionally set the endpoint based on userType
  const endpoint = newUserData.userType === 'supplier' ? '/user/supplier' : '/user';
  
	axios
		.post(`${REACT_APP_BACKEND}${endpoint}`, newUserData)
		.then(res => {
			const token = res.data.token || (res.data.data && res.data.data.token);
			if (token) {
				setAuthorization(token);
				dispatch({ type: SET_AUTHENTICATED });
			}
			dispatch({ type: REGISTER_SUCCESS, payload: res.data.message || 'Account successfully created!' });
		})
		.catch(err => {
			let errorMessage = 'Registration failed. Please try again.';
			if (err.response && err.response.data) {
				const data = err.response.data;
				if (Array.isArray(data.error)) {
					errorMessage = data.error.join('. ');
				} else if (typeof data.error === 'string') {
					errorMessage = data.error;
				} else if (data.message) {
					errorMessage = Array.isArray(data.message) ? data.message.join('. ') : data.message;
				}
			} else if (err.message) {
				errorMessage = err.message;
			}
			dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
		});
};

export const setAuthorization = token => {
	if (!token) return;
	const IdToken = `Bearer ${token}`;
	const userInfo = jwtDecode(token);
	localStorage.setItem('IdToken', IdToken);
	localStorage.setItem('userInfo', JSON.stringify(userInfo));
	//seting authorization to the header axios
	axios.defaults.headers.common['Authorization'] = IdToken;
};

export const logoutUser = () => dispatch => {
	// set logout on backend later
	localStorage.removeItem('IdToken');
	localStorage.removeItem('userInfo');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};
export const forgotPassword = emailData => dispatch => {
	dispatch({ type: FORGOT_PASSWORD_REQUEST });
	axios
		.post(`${REACT_APP_BACKEND}/user/reset`, emailData)
		.then(res => {
			dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({
				type: FORGOT_PASSWORD_FAILURE,
				payload: err.response ? err.response.data.error : err.message,
			});
		});
};

export const resetPassword = (token, passwordData) => dispatch => {
	dispatch({ type: RESET_PASSWORD_REQUEST });
	axios
		.post(`${REACT_APP_BACKEND}/user/reset/${token}`, passwordData)
		.then(res => {
			dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({
				type: RESET_PASSWORD_FAILURE,
				payload: err.response ? err.response.data.error : err.message,
			});
		});
};
