import { GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_SUCCESS } from '../types';

const initialState = {
	allOrders: [],
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
		default:
			return state;
	}
}
