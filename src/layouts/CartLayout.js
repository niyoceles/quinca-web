import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavbarLogo from '../components/NavbarLogo';
import Divider from '@material-ui/core/Divider';
import Footer from '../components/Footer';

const ClientLayout = props => {
	return (
		<React.Fragment>
			<CssBaseline />
			<NavbarLogo />
			<main>
				{props.children}
				<Divider />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default ClientLayout;
