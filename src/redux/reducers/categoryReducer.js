import {
	DELETE_CATEGORY,
	POST_CATEGORY,
	SET_CATEGORY,
	UPDATE_CATEGORY,
	GET_RELATED_FAILURE,
	GET_RELATED_SUCCESS,
	GET_ALL_CATEGORIES_FAILURE,
	GET_ALL_CATEGORIES_SUCCESS,
} from '../types';

const initialState = {
	categories: [],
	category: {},
	allCategories: [],
	addCategorySuccess: null,
	addCategoryFailure: null,
	updateCategorySuccess: null,
	loading: false,
	relatedCategories: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_CATEGORIES_SUCCESS:
			return {
				...state,
				allCategories: action.payload,
			};
		case GET_ALL_CATEGORIES_FAILURE:
			return {
				...state,
				allCategories: action.payload,
			};
		case SET_CATEGORY:
			return {
				...state,
				category: action.payload,
			};
		case DELETE_CATEGORY:
			let index = state.categories.findIndex(
				category => category.categoryId === action.payload.categoryId
			);
			index = state.categories.findIndex(
				category => category.categoryId === action.payload
			);
			state.categories.splice(index, 1);
			return {
				...state,
			};
		case POST_CATEGORY:
			return {
				...state,
				categories: [action.payload, ...state.categories],
				category: action.payload.category,
				addCategorySuccess: action.payload.message,
			};
		case UPDATE_CATEGORY:
			return {
				...state,
				categories: [action.payload, ...state.categories],
				category: action.payload.category,
				updateCategorySuccess: action.payload.message,
			};
		case GET_RELATED_SUCCESS:
			return {
				...state,
				relatedCategories: action.payload,
			};
		case GET_RELATED_FAILURE:
			return {
				...state,
				relatedCategories: action.payload,
			};
		default:
			return state;
	}
}
