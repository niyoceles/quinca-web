import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import Signup from '../../components/Auth/Signup';

const SignupPage = props => {
	return (
		<AuthLayout>
			<Signup />
		</AuthLayout>
	);
};

export default SignupPage;
