import 'dotenv/config';
import {
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	SET_ERRORS,
	POST_CATEGORY,
	CLEAR_ERRORS,
	LOADING_UI,
	GET_ALL_CATEGORIES_FAILURE,
	GET_ALL_CATEGORIES_SUCCESS,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
const { REACT_APP_BACKEND } = process.env;
// Post a category
export const addCategory = category => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`${REACT_APP_BACKEND}/category`, category)
		.then(res => {
			dispatch({
				type: POST_CATEGORY,
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

export const updateCategory = (categoryId, updateData) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.put(`${REACT_APP_BACKEND}/category/${categoryId}`, updateData)
		.then(res => {
			dispatch({
				type: UPDATE_CATEGORY,
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

export const deleteCategory = categoryId => dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/category/delete/${categoryId}`)
		.then(res => {
			dispatch({ type: DELETE_CATEGORY, payload: categoryId });
		})
		.catch(err => console.log(err.response.data));
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

export const getAllCategories = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/category/all`)
		.then(res => {
			dispatch({
				type: GET_ALL_CATEGORIES_SUCCESS,
				payload: res.data.allcategories,
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_CATEGORIES_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
