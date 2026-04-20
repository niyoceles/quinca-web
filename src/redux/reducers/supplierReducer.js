import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,
	GET_SUPPLIER_SUCCESS,
	GET_SUPPLIER_FAILURE,
} from '../types';

const initialState = {
	profile: {},
	supplier: {},
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
		default:
			return state;
	}
}
