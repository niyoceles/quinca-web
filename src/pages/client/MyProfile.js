import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Profile from '../../components/supplier/Profile';
import SupplierLayout from '../../layouts/SupplierLayout';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import ClientLayout from '../../layouts/ClientLayout';
import { Container } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	cardGrid: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		marginBottom: 40,
		borderRadius: '10px',
	},
}));

const MyProfile = props => {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<ClientLayout>
			<Container item className={classes.cardGrid} maxWidth='lg'>
				<Paper style={{ width: '80%', margin: '0% auto', padding: 20 }}>
					<Profile />
				</Paper>
			</Container>
		</ClientLayout>
	);
};

export default MyProfile;
