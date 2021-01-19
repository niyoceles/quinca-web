import 'dotenv/config';
import { GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_SUCCESS } from '../types';
import axios from 'axios';
// import { toast } from 'react-toastify';
const { REACT_APP_BACKEND } = process.env;

export const getAllOrders = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/order`)
		.then(res => {
			dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: res.data.allorders });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_ORDERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
