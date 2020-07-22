import 'dotenv/config';
import {
  DELETE_ITEM,
  UPDATE_ITEM,
  SET_ERRORS,
  POST_ITEM,
  CLEAR_ERRORS,
  LOADING_UI,
} from '../types';
import axios from 'axios';
const { REACT_APP_BACKEND } = process.env;
// Post a item
export const addItem = (newItem) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${REACT_APP_BACKEND}/item`, newItem)
    .then((res) => {
      dispatch({
        type: POST_ITEM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data.error : null,
      });
    });
};

export const updateItem = (itemId, updateData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .put(`${REACT_APP_BACKEND}/item/${itemId}`, updateData)
    .then((res) => {
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(`${REACT_APP_BACKEND}/item/delete/${itemId}`)
    .then((res) => {
      dispatch({ type: DELETE_ITEM, payload: itemId });
    })
    .catch((err) => console.log(err.response.data));
};
// http://localhost:3000/api/item/ecb9e576-f430-4cab-94cf-e985917a4f29
// http://localhost:3000/api/item/b38e7ed8-64da-46fe-bc3b-f7f715e19273/activate
// http://localhost:3000/api/item/suspend/ecb9e576-f430-4cab-94cf-e985917a4f29
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
