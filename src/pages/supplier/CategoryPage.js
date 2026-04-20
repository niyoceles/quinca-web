import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SupplierLayout from '../../layouts/SupplierLayout';
import AllCategories from '../../components/Tables/AllCategories';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const CategoryPage = () => {
	const classes = useStyles();
	return (
		<SupplierLayout>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<AllCategories />
				</Paper>
			</Grid>
		</SupplierLayout>
	);
};
export default CategoryPage;
