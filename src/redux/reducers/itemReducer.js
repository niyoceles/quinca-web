import { DELETE_ITEM, POST_ITEM, SET_ITEM } from '../types';

const initialState = {
	items: [],
	item: {},
	loading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
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
			};
		default:
			return state;
	}
}
