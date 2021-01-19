import 'dotenv/config';
import {
	DELETE_ITEM,
	UPDATE_ITEM,
	SET_ERRORS,
	POST_ITEM,
	CLEAR_ERRORS,
	LOADING_UI,
	GET_RELATED_FAILURE,
	GET_RELATED_SUCCESS,
	GET_ALL_ITEMS_FAILURE,
	GET_ALL_ITEMS_SUCCESS,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
const { REACT_APP_BACKEND } = process.env;
// Post a item
export const addItem = newItem => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`${REACT_APP_BACKEND}/item`, newItem)
		.then(res => {
			dispatch({
				type: POST_ITEM,
				payload: res.data,
			});
			toast.success(res.data.message);
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const updateItem = (itemId, updateData) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.put(`${REACT_APP_BACKEND}/item/${itemId}`, updateData)
		.then(res => {
			dispatch({
				type: UPDATE_ITEM,
				payload: res.data,
			});
			toast.success(res.data.message);
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data.error,
			});
		});
};

export const deleteItem = itemId => dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/item/delete/${itemId}`)
		.then(res => {
			dispatch({ type: DELETE_ITEM, payload: itemId });
		})
		.catch(err => console.log(err.response.data));
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

export const relatedItems = category => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/item/related/${category}`)
		.then(res => {
			dispatch({ type: GET_RELATED_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_RELATED_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getAllItems = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/item/all`)
		.then(res => {
			dispatch({ type: GET_ALL_ITEMS_SUCCESS, payload: res.data.allitems });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_ITEMS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
