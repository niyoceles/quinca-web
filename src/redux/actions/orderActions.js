import 'dotenv/config';
import {
	GET_ALL_ORDERS_FAILURE,
	GET_ALL_ORDERS_SUCCESS,
	GET_SINGLE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_FAILURE,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
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

export const getSingleOrder = id => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/order/${id}`)
		.then(res => {
			console.log(res.data);
			dispatch({
				type: GET_SINGLE_ORDER_SUCCESS,
				payload: res.data,
			});
			toast.success(res.data.message);
		})
		.catch(err => {
			dispatch({
				type: GET_SINGLE_ORDER_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
