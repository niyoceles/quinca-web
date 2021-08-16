import {
	GET_ALL_ORDERS_FAILURE,
	GET_ALL_ORDERS_SUCCESS,
	GET_SINGLE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_FAILURE,
} from '../types';

const initialState = {
	allOrders: [],
	orderItem: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ORDERS_SUCCESS:
			return {
				...state,
				allOrders: action.payload,
			};
		case GET_ALL_ORDERS_FAILURE:
			return {
				...state,
				allOrders: action.payload,
			};
		case GET_SINGLE_ORDER_SUCCESS:
			return {
				...state,
				orderItem: action.payload,
			};
		case GET_SINGLE_ORDER_FAILURE:
			return {
				...state,
				orderItem: action.payload,
			};
		default:
			return state;
	}
}
