import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import Signup from '../../components/Auth/Signup';

const LoginPage = props => {
	return (
		<AuthLayout>
			<Signup />
		</AuthLayout>
	);
};

export default LoginPage;
