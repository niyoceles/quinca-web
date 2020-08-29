import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(16),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: theme.spacing(2),
		'&:hover': {
			background: '#e3e5e6',
		},
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
	titleOrganization: {
		marginTop: -50,
	},
	areaStyle: {
		marginTop: -30,
		marginLeft: 25,
	},
}));

const SupplierItems = props => {
	const classes = useStyles();
	return (
		<Container className={classes.cardGrid} maxWidth='lg'>
			<Typography
				component='h3'
				variant='h5'
				align='center'
				color='textPrimary'
				className={classes.titleOrganization}
				gutterBottom
			>
				Availability
			</Typography>
			<Grid container spacing={4}>
				{props.items &&
					props.items.map(item => (
						<Grid item key={item.id} xs={12} sm={6} md={3}>
							<Card className={classes.card} elevation={3}>
								<CardMedia
									className={classes.cardMedia}
									image={item.itemImage}
									title={item.itemName}
								/>
								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant='h5' component='h2'>
										{item.itemName}
									</Typography>
									<Typography>{item.itemDescription}</Typography>
								</CardContent>
								<CardActions>
									<Button
										variant='contained'
										size='large'
										color='primary'
										disabled
									>
										<Typography variant='h5' component='h6' color='primary'>
											{item.itemPrice} Frw
										</Typography>
									</Button>
									<Button variant='contained' size='large' color='secondary'>
										Book
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	);
};
export default SupplierItems;
