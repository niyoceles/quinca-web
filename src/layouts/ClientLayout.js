import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import Divider from '@material-ui/core/Divider';
import Footer from '../components/Footer';

const useStyles = makeStyles(theme => ({
	main: {
		backgroundColor: '#fff',
	},
}));

const ClientLayout = props => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<main className={classes.main}>
				{props.children}
				<Divider />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default ClientLayout;