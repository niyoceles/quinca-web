import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import landingPage from './pages/client/landingPage';
import AuthRoute from './utils/AuthRoute';
import VerifiedAccount from './pages/Auth/VerifiedAccount';
import clients from './components/client';
import ItemPage from './pages/supplier/ItemPage';
import customersPage from './pages/supplier/CustomersPage';
import BookingsPage from './pages/supplier/BookingsPage';
import DashboardPage from './pages/supplier/DashboardPage';
import ReportPage from './pages/supplier/ReportPage';
import ProfilePage from './pages/supplier/ProfilePage';
// Auth
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

export const Routes = () => {
	return (
		<Router>
			<div className='container'>
				<Switch>
					<Route exact path='/' component={landingPage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/signup' component={SignupPage} />
					<AuthRoute exact path='/client' component={clients} />
					<Route exact path='/account/verified' component={VerifiedAccount} />
					<AuthRoute exact path='/account/supplier/items' component={ItemPage} />
					<AuthRoute exact path='/account/supplier/bookings' component={BookingsPage} />
					<AuthRoute exact path='/account/supplier/customers' component={customersPage} />
					<AuthRoute exact path='/account/supplier/dashboard' component={DashboardPage} />
					<AuthRoute exact path='/account/supplier/reports' component={ReportPage} />
					<AuthRoute exact path='/account/supplier/myaccount' component={ProfilePage} />
				</Switch>
			</div>
		</Router>
	);
};
