import {
	GET_HOTELS_SUCCESS,
	GET_HOTELS_FAILURE,
	GET_TOURS_SUCCESS,
	GET_TOURS_FAILURE,
	GET_CARS_SUCCESS,
	GET_CARS_FAILURE,
} from '../types';

const initialState = {
	hotels: {},
	tours: {},
	cars: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_HOTELS_SUCCESS:
			return {
				...state,
				hotels: action.payload,
			};
		case GET_HOTELS_FAILURE:
			return {
				...state,
				hotels: action.payload,
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
		default:
			return state;
	}
}
