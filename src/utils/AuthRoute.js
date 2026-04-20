import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authenticated === true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: '/login', state: { from: props.location } }}
				/>
			)
		}
	/>
);

AuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
