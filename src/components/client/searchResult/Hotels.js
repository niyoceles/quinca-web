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
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Navbar from '../../../components/Navbar';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Footer } from '../../../pages/client/landingPage';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
	product: {
		width: '100%',
		maxWidth: '98%',
		backgroundColor: theme.palette.background.paper,
		margin: 30,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	section1: {
		margin: theme.spacing(3, 2),
	},
	section2: {
		margin: theme.spacing(2),
	},
	section3: {
		margin: theme.spacing(3, 1, 1),
		alignItems: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	select: {
		marginTop: 20,
	},
}));
const product = [0, 1, 2, 3, 4, 5];
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
			))}
		</Carousel>
	);
};

export default function ViewSupplierPage() {
	const classes = useStyles();
	const [number, setNumber] = React.useState('');
	const handleChange = event => {
		setNumber(event.target.value);
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<main>
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
						Hotel Name
					</Typography>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6} md={8}>
							<Card className={classes.card} elevation={3}>
								<Slides />
								<CardContent className={classes.cardContent}>
									<Typography component='span'>
										<LocationOnIcon color='primary' />
										<p className={classes.areaStyle}>
											Near police station, Kigali ciy, Rwanda
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
											title='Suplier Name'
											subheader={Date.now()}
										/>
										<CardActions>
											<Button size='large'>More about Hotel</Button>
										</CardActions>
										<CardContent>
											<Typography
												variant='body1'
												color='textSecondary'
												component='p'
											>
												This impressive paella is a perfect party dish and a fun
												meal to cook together with your guests. Add 1 cup of
												frozen peas along with the mussels, if you like. This
												impressive paella is a perfect party dish and a fun meal
												to cook together with your guests. Add 1 cup of frozen
												peas along with the mussels, if you like. This
												impressive paella is a perfect party dish and a fun meal
												to cook together with your guests. Add 1 cup of frozen
												peas along with the mussels, if you like. This
												impressive paella is a perfect party dish and a fun meal
												to cook together with your guests. Add 1 cup of frozen
												peas along with the mussels, if you like.
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
										<p className={classes.areaStyle}>bra b ra bkjd ajkdfa</p>
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
				{product.map(product => (
					<div className={classes.product}>
						<div className={classes.section1}>
							<Grid container alignItems='center'>
								<Grid item xs>
									<Typography gutterBottom variant='h4'>
										Product Name
									</Typography>
								</Grid>
								<Grid item>
									<Typography gutterBottom variant='h6'>
										$4.50
									</Typography>
								</Grid>
							</Grid>
						</div>
						<Divider variant='middle' />
						<div className={classes.section2}>
							<Grid container>
								<Grid item xs={6} sm={3}>
									<img
										style={{
											width: '100%',
											height: '150px',
											borderRadius: '12px',
										}}
										src='https://source.unsplash.com/random'
										alt='product phot'
									/>
								</Grid>
								<Grid item xs={12} sm={8} style={{ marginLeft: '22px' }}>
									<Typography color='textSecondary' variant='body2'>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in culpa qui officia
										deserunt mollit anim id est laborum.
									</Typography>
									<Typography
										gutterBottom
										variant='body1'
										className={classes.select}
									>
										Select the availability
									</Typography>
									<div>
										<FormControl
											variant='outlined'
											className={classes.formControl}
										>
											<InputLabel id='demo-simple-select-outlined-label'>
												Number
											</InputLabel>
											<Select
												labelId='demo-simple-select-outlined-label'
												id='demo-simple-select-outlined'
												value={number}
												onChange={handleChange}
												label='Age'
											>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={1}>1</MenuItem>
												<MenuItem value={2}>2</MenuItem>
												<MenuItem value={3}>3</MenuItem>
												<MenuItem value={4}>4</MenuItem>
												<MenuItem value={5}>5</MenuItem>
												<MenuItem value={6}>6</MenuItem>
											</Select>
										</FormControl>
										<TextField
											id='date'
											label='Checks In'
											type='date'
											defaultValue='2017-05-24'
											className={classes.textField}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<TextField
											id='date'
											label='Checks out'
											type='date'
											defaultValue='2017-05-24'
											className={classes.textField}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</div>
								</Grid>
							</Grid>
						</div>
						<div className={classes.section3}>
							<Button variant='contained' color='primary' size='large'>
								Book Now
							</Button>
						</div>
					</div>
				))}
			</main>
			{/* Footer */}
			<Footer />
			{/* End footer */}
		</React.Fragment>
	);
}
