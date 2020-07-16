import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import Login from '../../components/Auth/Login';

const LoginPage = props => {
	return (
		<AuthLayout>
			<Login />
		</AuthLayout>
	);
};

export default LoginPage;
