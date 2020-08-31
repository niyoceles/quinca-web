import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Navbar from '../../components/Navbar';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels, getTours, getCars } from '../../redux/actions';
import SearchSection from '../../components/client/SearchSection';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	topBodyContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
		backgroundImage: `url(${require('../../assets/images/bg2.unsplash.jpg')})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	topBodyButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
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
	titleFeature: {
		marginTop: -50,
	},
}));

export default function LandingPage() {
	const classes = useStyles();
	const hotels = useSelector(state => state.client.hotels.allHotels);
	const tours = useSelector(state => state.client.tours.allTours);
	const cars = useSelector(state => state.client.cars.allCars);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getHotels());
		dispatch(getTours());
		dispatch(getCars());
	}, [dispatch]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<main>
				{/* topBody unit */}
				<div className={classes.topBodyContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom
						>
							Travels Up
						</Typography>
						<Typography
							variant='h3'
							align='center'
							style={{ fontWeight: 'bold', color: '#fff' }}
							paragraph
						>
							Let us help you in your Travel in Rwanda
						</Typography>
						<div className={classes.topBodyButtons}>
							<Grid container spacing={2} justify='center'>
								<Grid item>
									<Button variant='contained' color='primary'>
										Main call to action
									</Button>
								</Grid>
								<Grid item>
									<Button variant='outlined' color='primary'>
										Secondary action
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
					<SearchSection />
				</div>
				<Divider />
				<Container className={classes.cardGrid} maxWidth='lg'>
					<Typography
						component='h3'
						variant='h5'
						align='center'
						color='textPrimary'
						className={classes.titleFeature}
						gutterBottom
					>
						Featured Hotels
					</Typography>
					<Grid container spacing={4}>
						{hotels &&
							hotels.map(card => (
								<Grid item key={card} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<Link
											href={`/view/${card.id}`}
											underline='none'
											color='inherit'
										>
											<CardMedia
												className={classes.cardMedia}
												image='https://source.unsplash.com/random'
												title='Image title'
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant='h5' component='h2'>
													{card.names}
												</Typography>
												<Typography>
													<LocationOnIcon color='primary' />
													<div style={{ marginTop: -30, marginLeft: 25 }}>
														{card.location}, {card.state}, {card.country} and
														hosted by {card.organization}
													</div>
												</Typography>
											</CardContent>
											<CardActions>
												<Button size='small' color='primary'>
													View
												</Button>
												<Button size='small' color='primary'>
													Edit
												</Button>
											</CardActions>
										</Link>
									</Card>
								</Grid>
							))}
					</Grid>
				</Container>
				<Divider />
				<Container className={classes.cardGrid} maxWidth='lg'>
					<Typography
						component='h3'
						variant='h5'
						align='center'
						color='textPrimary'
						className={classes.titleFeature}
						gutterBottom
					>
						Featured Tours
					</Typography>
					<Grid container spacing={4}>
						{tours &&
							tours.map(card => (
								<Grid item key={card} xs={12} sm={6} md={3}>
									<Card className={classes.card} elevation={3}>
										<Link
											href={`/view/${card.id}`}
											underline='none'
											color='inherit'
										>
											<CardMedia
												className={classes.cardMedia}
												image='https://source.unsplash.com/random'
												title='Image title'
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant='h5' component='h2'>
													{card.names}
												</Typography>
												<Typography>
													<LocationOnIcon color='primary' />
													<div style={{ marginTop: -30, marginLeft: 25 }}>
														{card.location}, {card.state}, {card.country} and
														hosted by {card.organization}
													</div>
												</Typography>
											</CardContent>
											<CardActions>
												<Button size='small' color='primary'>
													View
												</Button>
												<Button size='small' color='primary'>
													Edit
												</Button>
											</CardActions>
										</Link>
									</Card>
								</Grid>
							))}
					</Grid>
				</Container>
				<Divider />
				<Container className={classes.cardGrid} maxWidth='lg'>
					<Typography
						component='h3'
						variant='h5'
						align='center'
						color='textPrimary'
						className={classes.titleFeature}
						gutterBottom
					>
						Featured Cars
					</Typography>
					<Grid container spacing={4}>
						{cars &&
							cars.map(card => (
								<Grid item key={card} xs={12} sm={6} md={3}>
									<Card className={classes.card} elevation={3}>
										<CardMedia
											className={classes.cardMedia}
											image='https://source.unsplash.com/random'
											title='Image title'
										/>
										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant='h5' component='h2'>
												{card.names}
											</Typography>
											<Typography>
												<LocationOnIcon color='primary' />
												<div style={{ marginTop: -30, marginLeft: 25 }}>
													{card.location}, {card.state}, {card.country} and
													hosted by {card.organization}
												</div>
											</Typography>
										</CardContent>
										<CardActions>
											<Button size='small' color='primary'>
												View
											</Button>
											<Button size='small' color='primary'>
												Edit
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<Footer />
			{/* End footer */}
		</React.Fragment>
	);
}

export const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Typography variant='h6' align='center' gutterBottom>
				Footer
			</Typography>
			<Typography
				variant='subtitle1'
				align='center'
				color='textSecondary'
				component='p'
			>
				Something here to give the footer a purpose!
			</Typography>
			<Copyright />
		</footer>
	);
};
