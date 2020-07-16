import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { logoutUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function Logout() {
	// const auth = useSelector(state => state.auth.loginData);
	const dispatch = useDispatch();

	const handleSignout = () => {
		dispatch(logoutUser());
	};

	return <MenuItem onClick={handleSignout}>Logout</MenuItem>;
}
