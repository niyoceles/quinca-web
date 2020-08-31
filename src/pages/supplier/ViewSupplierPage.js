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
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Navbar from '../../components/Navbar';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import SupplierItems from '../../components/supplier/SupplierItems';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { useDispatch, useSelector } from 'react-redux';
import { getSupplier } from '../../redux/actions';

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
	slide: {
		height: '400px',
		width: '100%',
	},
	image: {
		height: '100%',
		width: '100%',
	},
}));

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

const Slides = () => {
	const classes = useStyles();
	return (
		<Carousel autoPlay={9000} infinite slidesPerPage={1} slidesPerScroll={1}>
			{[
				{
					image:
						'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
					title: 'profile image',
				},
				{
					image:
						'https://images.unsplash.com/photo-1516540438350-9db0f4e6552f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
					title: 'profile image',
				},
				{
					image:
						'https://images.unsplash.com/photo-1539947257641-0f0e9f213528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
					title: 'profile image',
				},
			].map(image => (
				<div className={classes.slide}>
					<img src={image.image} alt={image.title} />
				</div>

				// <CardMedia
				//   className={classes.cardMedia}
				//   image={image.image}
				//   title={image.title}
				// />
			))}
		</Carousel>
	);
};

export default function ViewSupplierPage() {
	const classes = useStyles();
	const profileSupplier = useSelector(state => state.supplier.supplier.profile);
	const dispatch = useDispatch();
	useEffect(() => {
		const lastPath = window.location.pathname;
		const id = lastPath.split('/');
		dispatch(getSupplier(id[2]));
	}, [dispatch]);
	console.log('supplier:', profileSupplier);
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			{profileSupplier &&
				profileSupplier.map(index => (
					<main key={index.id}>
						{/* topBody unit */}
						<Divider />
						<Container className={classes.cardGrid} maxWidth='lg'>
							<Typography
								component='h2'
								variant='h4'
								align='center'
								color='textPrimary'
								className={classes.titleOrganization}
								gutterBottom
							>
								{index.organization}
							</Typography>
							<Grid container spacing={4}>
								<Grid item xs={12} sm={6} md={8}>
									<Card className={classes.card} elevation={3}>
										<Slides />
										<CardContent className={classes.cardContent}>
											<Typography component='span'>
												<LocationOnIcon color='primary' />
												<p className={classes.areaStyle}>
													{index.location}, {index.state}, {index.country}
												</p>
											</Typography>
											<Card style={{ marginTop: 10 }} elevation={3}>
												<CardHeader
													avatar={<VerifiedUserIcon color='primary' />}
													action={
														<IconButton aria-label='settings'>
															<MoreVertIcon />
														</IconButton>
													}
													title={index.names}
													subheader={index.createdAt}
												/>
												<CardActions>
													<Button size='large'>
														More about {index.organization}
													</Button>
												</CardActions>
												<CardContent>
													<Typography
														variant='body1'
														color='textSecondary'
														component='p'
													>
														This impressive paella is a perfect party dish and a
														fun meal to cook together with your guests. Add 1
														cup of frozen peas along with the mussels, if you
														like. This impressive paella is a perfect party dish
														and a fun meal to cook together with your guests.
														Add 1 cup of frozen peas along with the mussels, if
														you like. This impressive paella is a perfect party
														dish and a fun meal to cook together with your
														guests. Add 1 cup of frozen peas along with the
														mussels, if you like. This impressive paella is a
														perfect party dish and a fun meal to cook together
														with your guests. Add 1 cup of frozen peas along
														with the mussels, if you like.
													</Typography>
												</CardContent>
											</Card>
										</CardContent>
										<CardActions>
											<Button size='large' color='primary'>
												Views
											</Button>
											<Button size='large' color='primary'>
												Share on Social media
											</Button>
											<Button size='small' color='primary'>
												<FacebookIcon fontSize='large' />
											</Button>
											<Button size='small' color='primary'>
												<InstagramIcon fontSize='large' />
											</Button>
											<Button size='small' color='primary'>
												<LinkedInIcon fontSize='large' />
											</Button>
											<Button size='small' color='primary'>
												<TwitterIcon fontSize='large' />
											</Button>
											<Button size='medium' color='primary'>
												<EmailIcon fontSize='large' />
											</Button>
										</CardActions>
									</Card>
								</Grid>
								<Grid item xs={6} sm={3} md={4}>
									<Card className={classes.card} elevation={3}>
										<CardMedia
											className={classes.cardMedia}
											image='https://source.unsplash.com/random'
											title='Image title'
										/>
										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant='h5' component='h2'>
												bra bra
											</Typography>
											<Typography component='span'>
												<LocationOnIcon color='primary' />
												<p className={classes.areaStyle}>
													bra b ra bkjd ajkdfa
												</p>
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
							</Grid>
						</Container>
						<Divider />
						<SupplierItems items={index.items} />
					</main>
				))}
			{/* Footer */}
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
			{/* End footer */}
		</React.Fragment>
	);
}
