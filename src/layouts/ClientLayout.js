import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Divider, Container } from '../components/Ui/Layout';

const ClientLayout = props => {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Navbar />
			<main className="flex-grow">
				{props.children}
			</main>
			<Footer />
		</div>
	);
};

export default ClientLayout;
