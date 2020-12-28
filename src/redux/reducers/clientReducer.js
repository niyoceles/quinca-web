import {
	GET_HOME_ITEMS_SUCCESS,
	GET_HOME_ITEMS_FAILURE,
	GET_CATEGORY_ITEMS_SUCCESS,
	GET_CATEGORY_ITEMS_FAILURE,
	GET_TOURS_SUCCESS,
	GET_TOURS_FAILURE,
	GET_CARS_SUCCESS,
	GET_CARS_FAILURE,
	BOOKING,

} from '../types';

const initialState = {
	homeItems: {},
	categoryItems: {},
	tours: {},
	cars: {},
	bookedItems: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_HOME_ITEMS_SUCCESS:
			return {
				...state,
				homeItems: action.payload,
			};
		case GET_HOME_ITEMS_FAILURE:
			return {
				...state,
				homeItems: action.payload,
			};
		case GET_CATEGORY_ITEMS_SUCCESS:
			return {
				...state,
				categoryItems: action.payload,
			};
		case GET_CATEGORY_ITEMS_FAILURE:
			return {
				...state,
				categoryItems: action.payload,
			};
		case GET_TOURS_SUCCESS:
			return {
				...state,
				tours: action.payload,
			};
		case GET_TOURS_FAILURE:
			return {
				...state,
				tours: action.payload,
			};
		case GET_CARS_SUCCESS:
			return {
				...state,
				cars: action.payload,
			};
		case GET_CARS_FAILURE:
			return {
				...state,
				cars: action.payload,
			};
		case BOOKING:
			return {
				...state,
				bookedItems: [...state.bookedItems, ...action.payload],
			};
		default:
			return state;
	}
}
