import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AllProforma from '../../components/Tables/AllProforma';
import SupplierLayout from '../../layouts/SupplierLayout';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const ProformaPage = () => {
	const classes = useStyles();
	return (
		<SupplierLayout>
			{/* Recent Features */}
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<AllProforma />
				</Paper>
			</Grid>
		</SupplierLayout>
	);
};
export default ProformaPage;
