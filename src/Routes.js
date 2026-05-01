import React from 'react';
import { BrowserRouter as Router, Route, Routes as RouterRoutes } from 'react-router-dom';
import LandingPage from './pages/client/landingPage';
import CategoriesPage from './pages/client/Categories';
import AuthRoute from './utils/AuthRoute';
import VerifiedAccount from './pages/Auth/VerifiedAccount';
import Clients from './components/client/clients1';
import ItemPage from './pages/supplier/ItemPage';
import ProformaPage from './pages/supplier/ProformaPage';
import CustomersPage from './pages/supplier/CustomersPage';
import DashboardPage from './pages/supplier/DashboardPage';
import ReportPage from './pages/supplier/ReportPage';
import ProfilePage from './pages/supplier/ProfilePage';
import RequestProforma from './pages/client/RequestProforma';
import AdminInquiries from './pages/admin/AdminInquiries';
import ManageSuppliers from './pages/admin/ManageSuppliers';
import Bookings from './pages/client/Bookings';
import MyProforma from './pages/client/MyProforma';
import SingleProformaPage from './pages/client/SingleProformaPage';
import MyProfile from './pages/client/MyProfile';
// Auth
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import CategoryItems from './pages/client/CategoryItems';
import ViewItem from './pages/client/ViewItem';
import Cart from './pages/client/Cart';
import OrdersPage from './pages/supplier/OrdersPage';
import ContactUs from './pages/client/ContactUs';
import ViewProforma from './pages/supplier/ViewProforma';
import CategoryPage from './pages/supplier/CategoryPage';
import AboutUs from './pages/client/AboutUs';
import ViewOrder from './pages/supplier/ViewOrder';
import TermsConditions from './pages/client/TermsConditions';
import MessagesPage from './pages/supplier/MessagesPage';
import ScrollToTop from './utils/ScrollToTop';

export const Routes = () => {
	return (
		<Router>
			<ScrollToTop />
			<RouterRoutes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/categories' element={<CategoriesPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password/:token' element={<ResetPasswordPage />} />
				<Route path='/account/verified' element={<VerifiedAccount />} />
				<Route path='/view/:id' element={<ViewItem />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/contact-us' element={<ContactUs />} />
				<Route path='/about-us' element={<AboutUs />} />
				<Route path='/terms-and-conditions' element={<TermsConditions />} />
				<Route path='/request' element={<RequestProforma />} />
				<Route path='/category/:category' element={<CategoryItems />} />
				<Route
					path='/my-proforma'
					element={
						<AuthRoute>
							<MyProforma />
						</AuthRoute>
					}
				/>
				<Route path='/my-proforma/:id' element={<SingleProformaPage />} />
				<Route path='/proforma/:id' element={<ViewProforma />} />
				<Route path='/order/:id' element={<ViewOrder />} />
				<Route
					path='/client'
					element={
						<AuthRoute>
							<Clients />
						</AuthRoute>
					}
				/>
				<Route
					path='/bookings'
					element={
						<AuthRoute>
							<Bookings />
						</AuthRoute>
					}
				/>
				<Route
					path='/me'
					element={
						<AuthRoute>
							<MyProfile />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/proforma'
					element={
						<AuthRoute>
							<ProformaPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/items'
					element={
						<AuthRoute>
							<ItemPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/categories'
					element={
						<AuthRoute>
							<CategoryPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/orders'
					element={
						<AuthRoute>
							<OrdersPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/customers'
					element={
						<AuthRoute>
							<CustomersPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/dashboard'
					element={
						<AuthRoute>
							<DashboardPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/reports'
					element={
						<AuthRoute>
							<ReportPage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/myaccount'
					element={
						<AuthRoute>
							<ProfilePage />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/admin/inquiries'
					element={
						<AuthRoute>
							<AdminInquiries />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/admin/suppliers'
					element={
						<AuthRoute>
							<ManageSuppliers />
						</AuthRoute>
					}
				/>
				<Route
					path='/account/supplier/messages'
					element={
						<AuthRoute>
							<MessagesPage />
						</AuthRoute>
					}
				/>
			</RouterRoutes>
		</Router>
	);
};
