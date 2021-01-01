import {
	DELETE_ITEM,
	POST_ITEM,
	SET_ITEM,
	UPDATE_ITEM,
	GET_RELATED_FAILURE,
	GET_RELATED_SUCCESS,
	GET_ALL_ITEMS_FAILURE,
	GET_ALL_ITEMS_SUCCESS,
} from '../types';

const initialState = {
	items: [],
	item: {},
	allItems: [],
	addItemSuccess: null,
	addItemFailure: null,
	updateItemSuccess: null,
	loading: false,
	relatedItems: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ITEMS_SUCCESS:
			return {
				...state,
				allItems: action.payload,
			};
		case GET_ALL_ITEMS_FAILURE:
			return {
				...state,
				allItems: action.payload,
			};
		case SET_ITEM:
			return {
				...state,
				item: action.payload,
			};
		case DELETE_ITEM:
			let index = state.items.findIndex(
				item => item.itemId === action.payload.itemId
			);
			index = state.items.findIndex(item => item.itemId === action.payload);
			state.items.splice(index, 1);
			return {
				...state,
			};
		case POST_ITEM:
			return {
				...state,
				items: [action.payload, ...state.items],
				item: action.payload.item,
				addItemSuccess: action.payload.message,
			};
		case UPDATE_ITEM:
			return {
				...state,
				items: [action.payload, ...state.items],
				item: action.payload.item,
				updateItemSuccess: action.payload.message,
			};
		case GET_RELATED_SUCCESS:
			return {
				...state,
				relatedItems: action.payload,
			};
		case GET_RELATED_FAILURE:
			return {
				...state,
				relatedItems: action.payload,
			};
		default:
			return state;
	}
}
