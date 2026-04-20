import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
} from '../types';
import { jwtDecode } from 'jwt-decode';

const initialState = {
	signupData: null,
	loginData: null,
	loginSuccess: null,
	loginFailure: null,
	signupFailure: null,
	signupSuccess: null,
	authenticated: false,
	credentials: {},
	user: {},
	forgotPasswordLoading: false,
	forgotPasswordSuccess: null,
	forgotPasswordFailure: null,
	resetPasswordLoading: false,
	resetPasswordSuccess: null,
	resetPasswordFailure: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_REQUEST:
			return {
				...state,
				signupData: action.payload,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				signupSuccess: action.payload,
				signupFailure: null,
				signupData: null,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				signupFailure: action.payload,
				signupSuccess: null,
				signupData: null,
			};
		case LOGIN_REQUEST:
			return {
				...state,
				loginData: action.payload,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loginSuccess: action.payload.message,
				loginFailure: null,
				loginData: null,
				authenticated: true,
				user: {...state.user, ...jwtDecode(action.payload.token)}
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loginFailure: action.payload,
				loginSuccess: null,
				loginData: null,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				forgotPasswordLoading: true,
				forgotPasswordSuccess: null,
				forgotPasswordFailure: null,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				forgotPasswordLoading: false,
				forgotPasswordSuccess: action.payload,
				forgotPasswordFailure: null,
			};
		case FORGOT_PASSWORD_FAILURE:
			return {
				...state,
				forgotPasswordLoading: false,
				forgotPasswordFailure: action.payload,
				forgotPasswordSuccess: null,
			};
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				resetPasswordLoading: true,
				resetPasswordSuccess: null,
				resetPasswordFailure: null,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordLoading: false,
				resetPasswordSuccess: action.payload,
				resetPasswordFailure: null,
			};
		case RESET_PASSWORD_FAILURE:
			return {
				...state,
				resetPasswordLoading: false,
				resetPasswordFailure: action.payload,
				resetPasswordSuccess: null,
			};
		default:
			return state; //or return initialState
	}
}
