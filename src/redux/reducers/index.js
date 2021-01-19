import { combineReducers } from 'redux';
import auth from './authReducer';
import item from './itemReducer';
import supplier from './supplierReducer';
import client from './clientReducer';
import ui from './uiReducer';
import contact from './contactReducer';
import order from './orderReducer';
import proforma from './proformaReducer';


export default combineReducers({
	auth,
	item,
	ui,
	supplier,
	client,
	contact,
	order,
	proforma
});
