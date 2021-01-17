import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SupplierLayout from '../../layouts/SupplierLayout';
import AllOrders from '../../components/Tables/AllOrders';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const OrdersPage = () => {
	const classes = useStyles();
	return (
		<SupplierLayout>
			{/* Recent Features */}
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<AllOrders />
				</Paper>
			</Grid>
		</SupplierLayout>
	);
};
export default OrdersPage;
