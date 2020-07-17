import 'dotenv/config';
import {
	DELETE_ITEM,
	SET_ERRORS,
	POST_ITEM,
	CLEAR_ERRORS,
	LOADING_UI,
} from '../types';
import axios from 'axios';
const { REACT_APP_BACKEND } = process.env;
// Post a item
export const addItem = newItem => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`${REACT_APP_BACKEND}/item`, newItem)
		.then(res => {
			console.log('that is Ok', res.data)
			dispatch({
				type: POST_ITEM,
				payload: res.data,
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data.error,
			});
		});
};

export const updateItem = (itemId, updateData) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.put(`http://localhost:3000/api/item/${itemId}`, updateData)
		.then(res => {
			dispatch({
				type: POST_ITEM,
				payload: res.data,
			});
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
		.delete(`http://localhost:3000/api/item/${itemId}`)
		.then(() => {
			dispatch({ type: DELETE_ITEM, payload: itemId });
		})
		.catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};
