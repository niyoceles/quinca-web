import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthRoute = ({ children, authenticated }) => {
	const location = useLocation();

	return authenticated === true ? (
		children
	) : (
		<Navigate
			to="/login"
			state={{ from: location }}
			replace
		/>
	);
};

AuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
