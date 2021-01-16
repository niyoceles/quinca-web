import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/client/landingPage';
import AuthRoute from './utils/AuthRoute';
import VerifiedAccount from './pages/Auth/VerifiedAccount';
import clients from './components/client/clients1';
import ItemPage from './pages/supplier/ItemPage';
import customersPage from './pages/supplier/CustomersPage';
import BookingsPage from './pages/supplier/BookingsPage';
import DashboardPage from './pages/supplier/DashboardPage';
import ReportPage from './pages/supplier/ReportPage';
import ProfilePage from './pages/supplier/ProfilePage';
import RequestProforma from './pages/client/RequestProforma';
//
import Bookings from './pages/client/Bookings';
import MyProforma from './pages/client/MyProforma';
import SingleProformaPage from './pages/client/SingleProformaPage';
import MyProfile from './pages/client/MyProfile';
// Auth
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import CategoryItems from './pages/client/CategoryItems';
import ViewItem from './pages/client/ViewItem';
import Cart from './pages/client/Cart';

export const Routes = () => {
	return (
		<Router>
			<div className='container'>
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/signup' component={SignupPage} />
					<Route exact path='/account/verified' component={VerifiedAccount} />
					<Route exact path='/view/:id' component={ViewItem} />
					<Route exact path='/cart' component={Cart} />
					<Route exact path='/request' component={RequestProforma} />
					<Route exact path='/category/:category' component={CategoryItems} />
					<AuthRoute exact path='/my-proforma' component={MyProforma} />
					<Route exact path='/my-proforma/:id' component={SingleProformaPage} />
					<AuthRoute exact path='/client' component={clients} />
					<AuthRoute exact path='/bookings' component={Bookings} />
					<AuthRoute exact path='/me' component={MyProfile} />
					<AuthRoute
						exact
						path='/account/supplier/items'
						component={ItemPage}
					/>
					<AuthRoute
						exact
						path='/account/supplier/bookings'
						component={BookingsPage}
					/>
					<AuthRoute
						exact
						path='/account/supplier/customers'
						component={customersPage}
					/>
					<AuthRoute
						exact
						path='/account/supplier/dashboard'
						component={DashboardPage}
					/>
					<AuthRoute
						exact
						path='/account/supplier/reports'
						component={ReportPage}
					/>
					<AuthRoute
						exact
						path='/account/supplier/myaccount'
						component={ProfilePage}
					/>
				</Switch>
			</div>
		</Router>
	);
};
