import { GET_ALL_PROFORMA_FAILURE, GET_ALL_PROFORMA_SUCCESS } from '../types';

const initialState = {
	allProforma: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PROFORMA_SUCCESS:
			return {
				...state,
				allProforma: action.payload,
			};
		case GET_ALL_PROFORMA_FAILURE:
			return {
				...state,
				allProforma: action.payload,
			};
		default:
			return state;
	}
}
