import { combineReducers } from 'redux';
import auth from './authReducer';
import item from './itemReducer';
import ui from './uiReducer';

export default combineReducers({
	auth,
	item,
	ui,
});
