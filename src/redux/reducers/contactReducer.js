import {
	CONTACT_US_DATA,
	CONTACT_US_SUCCESS,
	CONTACT_US_FAILURE,
} from '../types';

const initialState = {
	contactData: null,
	contactSuccess: null,
	contactFailure: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CONTACT_US_DATA:
			return {
				...state,
				contactData: action.payload,
			};
		case CONTACT_US_SUCCESS:
			return {
				...state,
				contactSuccess: action.payload,
				contactFailure: null,
				contactData: null,
			};
		case CONTACT_US_FAILURE:
			return {
				...state,
				contactSuccess: null,
				contactFailure: action.payload,
				contactData: null,
			};
		default:
			return state; //or return initialState
	}
}
