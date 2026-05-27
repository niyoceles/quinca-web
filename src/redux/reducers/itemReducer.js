import {
	DELETE_ITEM,
	POST_ITEM,
	SET_ITEM,
	UPDATE_ITEM,
	GET_ITEM_RELATED_FAILURE,
	GET_ITEM_RELATED_SUCCESS,
	GET_ALL_ITEMS_FAILURE,
	GET_ALL_ITEMS_SUCCESS,
	RESET_ITEM_STATUS,
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
	deletedItem: null,
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
			let index = state.allItems.findIndex(
				item => item.id === action.payload.id
			);
			index = state.allItems.findIndex(item => item.id === action.payload.id);
			state.allItems.splice(index, 1);
			return {
				...state,
				deletedItem: action.payload.id,
			};
		case POST_ITEM:
			return {
				...state,
				allItems: [action.payload.data, ...state.allItems],
				item: action.payload.data,
				addItemSuccess: action.payload.message,
			};
		case UPDATE_ITEM:
			const updatedItem = action.payload.data;
			return {
				...state,
				allItems: state.allItems.map(item => 
					item.id === updatedItem.id ? updatedItem : item
				),
				item: updatedItem,
				updateItemSuccess: action.payload.message,
			};
		case GET_ITEM_RELATED_SUCCESS:
			return {
				...state,
				relatedItems: action.payload,
			};
		case GET_ITEM_RELATED_FAILURE:
			return {
				...state,
				relatedItems: action.payload,
			};
		case RESET_ITEM_STATUS:
			return {
				...state,
				addItemSuccess: null,
				updateItemSuccess: null,
				deletedItem: null,
			};
		default:
			return state;
	}
}
