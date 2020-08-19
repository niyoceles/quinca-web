import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../types';

const initialState = {
	profile: {},
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
		default:
			return state;
	}
}
