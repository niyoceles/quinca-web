import React from 'react';
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
import Navbar from '../../layouts/home/Navbar';
import Divider from '@material-ui/core/Divider';

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
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
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
	list: {
		width: 250,
	},
	titleFeature: {
		marginTop: -50,
	},
	fullList: {
		width: 'auto',
	},
}));

const hotels = [1, 2, 3, 4, 5, 6];
const tours = [1, 2, 3, 4];
const cars = [1, 2, 3, 4, 5, 6, 7, 8];

export default function LandingPage() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom>
							Travels Up
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Something short and leading about the collection below—its
							contents, the creator, etc. Make it short and sweet, but not too
							short so folks don&apos;t simply skip over it entirely.
						</Typography>
						<div className={classes.heroButtons}>
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
				</div>
				<Divider />
				<Container className={classes.cardGrid} maxWidth='lg'>
					<Typography
						component='h3'
						variant='h5'
						align='center'
						color='textPrimary'
						className={classes.titleFeature}
						gutterBottom>
						Featured Hotels
					</Typography>
					<Grid container spacing={4}>
						{hotels.map(card => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card} elevation={3}>
									<CardMedia
										className={classes.cardMedia}
										image='https://source.unsplash.com/random'
										title='Image title'
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant='h5' component='h2'>
											Heading
										</Typography>
										<Typography>
											This is a media card. You can use this section to describe
											the content.
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
				<Divider />
				<Container className={classes.cardGrid} maxWidth='lg'>
					<Typography
						component='h3'
						variant='h5'
						align='center'
						color='textPrimary'
						className={classes.titleFeature}
						gutterBottom>
						Featured Tours
					</Typography>
					<Grid container spacing={4}>
						{tours.map(card => (
							<Grid item key={card} xs={12} sm={6} md={3}>
								<Card className={classes.card} elevation={3}>
									<CardMedia
										className={classes.cardMedia}
										image='https://source.unsplash.com/random'
										title='Image title'
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant='h5' component='h2'>
											Heading
										</Typography>
										<Typography>
											This is a media card. You can use this section to describe
											the content.
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
				<Divider />
				<Container className={classes.cardGrid} maxWidth='lg'>
					<Typography
						component='h3'
						variant='h5'
						align='center'
						color='textPrimary'
						className={classes.titleFeature}
						gutterBottom>
						Featured Cars
					</Typography>
					<Grid container spacing={4}>
						{cars.map(card => (
							<Grid item key={card} xs={12} sm={6} md={3}>
								<Card className={classes.card} elevation={3}>
									<CardMedia
										className={classes.cardMedia}
										image='https://source.unsplash.com/random'
										title='Image title'
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant='h5' component='h2'>
											Heading
										</Typography>
										<Typography>
											This is a media card. You can use this section to describe
											the content.
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
			<footer className={classes.footer}>
				<Typography variant='h6' align='center' gutterBottom>
					Footer
				</Typography>
				<Typography
					variant='subtitle1'
					align='center'
					color='textSecondary'
					component='p'>
					Something here to give the footer a purpose!
				</Typography>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}
