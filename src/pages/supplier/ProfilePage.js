import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slides from '../../components/Slides';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Typography } from '@material-ui/core';
import Profile from '../../components/supplier/Profile';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const ProfilePage = () => {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<SupplierLayout>
			{/* Slides */}
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					<Profile />
				</Paper>
			</Grid>
			{/* Recent Deposits */}
			<Grid item xs={12} md={4} lg={3}>
				<Paper className={fixedHeightPaper}>
					<Slides />
				</Paper>
			</Grid>
			{/* Recent Features */}
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Typography>Reports page</Typography>
				</Paper>
			</Grid>
		</SupplierLayout>
	);
};
export default ProfilePage;
