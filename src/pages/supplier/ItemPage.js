import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AllItems from '../../components/Tables/AllItems';
import SupplierLayout from '../../layouts/SupplierLayout';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const ItemPage = () => {
	const classes = useStyles();
	return (
		<SupplierLayout>
			{/* Recent Features */}
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<AllItems />
				</Paper>
			</Grid>
		</SupplierLayout>
	);
};
export default ItemPage;
