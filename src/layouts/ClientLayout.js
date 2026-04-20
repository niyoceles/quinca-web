import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../components/Navbar';
import Divider from '@material-ui/core/Divider';
import Footer from '../components/Footer';

const ClientLayout = props => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<main>
				{props.children}
				<Divider />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default ClientLayout;
