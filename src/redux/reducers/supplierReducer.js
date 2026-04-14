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

const initialState = {
	profile: {},
	supplier: {},
	customers: [],
	allSuppliers: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE_SUCCESS:
			return {
				...state,
				profile: action.payload,
			};
		case GET_PROFILE_FAILURE:
			return {
				...state,
				profile: action.payload,
			};
		case GET_SUPPLIER_SUCCESS:
			return {
				...state,
				supplier: action.payload,
			};
		case GET_SUPPLIER_FAILURE:
			return {
				...state,
				supplier: action.payload,
			};
		case GET_CUSTOMERS_SUCCESS:
			return {
				...state,
				customers: action.payload,
			};
		case GET_CUSTOMERS_FAILURE:
			return {
				...state,
				customers: [],
			};
		case GET_ALL_SUPPLIERS_SUCCESS:
			return {
				...state,
				allSuppliers: action.payload,
			};
		case GET_ALL_SUPPLIERS_FAILURE:
			return {
				...state,
				allSuppliers: [],
			};
		default:
			return state;
	}
}
