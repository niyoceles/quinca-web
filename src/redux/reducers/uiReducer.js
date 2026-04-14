import {
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	STOP_LOADING_UI,
	TOGGLE_SIDEBAR,
	SET_SIDEBAR_OPEN
} from '../types';

const initialState = {
	loading: false,
	error: null,
	isSidebarOpen: true
};

export default function (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return {
				...state,
				isSidebarOpen: !state.isSidebarOpen
			};
		case SET_SIDEBAR_OPEN:
			return {
				...state,
				isSidebarOpen: action.payload
			};
		case SET_ERRORS:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				error: null,
			};
		case LOADING_UI:
			return {
				...state,
				loading: true,
			};
		case STOP_LOADING_UI:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
