import 'dotenv/config';
import { GET_ALL_PROFORMA_FAILURE, GET_ALL_PROFORMA_SUCCESS } from '../types';
import axios from 'axios';
// import { toast } from 'react-toastify';
const { REACT_APP_BACKEND } = process.env;

export const getAllProforma = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/proforma`)
		.then(res => {
			dispatch({ type: GET_ALL_PROFORMA_SUCCESS, payload: res.data.allproforma });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_PROFORMA_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
