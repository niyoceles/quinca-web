import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,
	GET_SUPPLIER_SUCCESS,
	GET_SUPPLIER_FAILURE,
	GET_CUSTOMERS_SUCCESS,
	GET_CUSTOMERS_FAILURE,
	GET_ALL_SUPPLIERS_SUCCESS,
	GET_ALL_SUPPLIERS_FAILURE,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
const { REACT_APP_BACKEND } = process.env;

// Get all suppliers (Admin)
export const getAllSuppliers = () => dispatch => {
	return axios
		.get(`${REACT_APP_BACKEND}/supplier/all`)
		.then(res => {
			dispatch({ type: GET_ALL_SUPPLIERS_SUCCESS, payload: res.data.allsupplier });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_SUPPLIERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Get customers
export const getCustomers = () => dispatch => {
	return axios
		.get(`${REACT_APP_BACKEND}/supplier/customers`)
		.then(res => {
			dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: res.data.data });
		})
		.catch(err => {
			dispatch({
				type: GET_CUSTOMERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// Toggle supplier status (Admin)
export const toggleSupplierStatus = (id) => dispatch => {
	return axios
		.patch(`${REACT_APP_BACKEND}/user/status/${id}`, {})
		.then(res => {
			toast.success(res.data.message);
			dispatch(getAllSuppliers()); // Refresh the list
		})
		.catch(err => {
			toast.error(err.response ? err.response.data.error : 'Failed to toggle status');
		});
};

// Get my profile
export const getMyProfile = () => dispatch => {
	return axios
		.get(`${REACT_APP_BACKEND}/supplier/myprofile`)
		.then(res => {
			dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data.myprofile[0] });
		})
		.catch(err => {
			dispatch({
				type: GET_PROFILE_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

// update profile
export const updateMyProfile = (userData) => dispatch => {
	return axios
		.put(`${REACT_APP_BACKEND}/user/update`, userData)
		.then(res => {
			toast.success(res.data.message);
			dispatch(getMyProfile());
		})
		.catch(err => {
			toast.error(err.response ? err.response.data.error : 'Failed to update profile');
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
