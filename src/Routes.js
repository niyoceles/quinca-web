import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import landingPage from './pages/client/landingPage';
import AuthRoute from './utils/AuthRoute';
import VerifiedAccount from './pages/Auth/VerifiedAccount';
import clients from './pages/client/clients';
import suppliers from './pages/supplier/suppliers';
import admins from './pages/admin/admins';
// Auth
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import dashboard from './pages/dashboard';

export const Routes = () => {
	return (
		<Router>
			<div className='container'>
				<Switch>
					<Route exact path='/' component={landingPage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/signup' component={SignupPage} />
					<AuthRoute exact path='/client' component={clients} />
					<AuthRoute exact path='/dashboard' component={dashboard} />
					<Route exact path='/account/verified' component={VerifiedAccount} />
					<AuthRoute exact path='/supplier' component={suppliers} />
					<AuthRoute exact path='/admin' component={admins} />
				</Switch>
			</div>
		</Router>
	);
};
