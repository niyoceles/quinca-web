import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import NavBar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: theme.spacing(16),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: 12,
	},
	slide: {
		height: '400px',
		width: '100%',
		borderRadius: '10px',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '70%',
	},
	contain: {
		textAlign: 'center',
		width: '100%',
		marginBottom: 30,
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(3),
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	buttons: {
		width: '100%',
	},
	accordion: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const Slides = () => {
	const classes = useStyles();
	return (
		<Carousel autoPlay={9000} infinite slidesPerPage={1} slidesPerScroll={1}>
			{[
				{
					image:
						'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
					title: 'profile image',
				},
				{
					image:
						'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1011&q=80',
					title: 'profile image',
				},
				{
					image:
						'https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
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

export default () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<NavBar />
			<main>
				<Container className={classes.root} maxWidth='lg'>
					<Typography
						component='h2'
						variant='h4'
						align='center'
						color='textPrimary'
						className={classes.titleOrganization}
						gutterBottom
					>
						Car Name
					</Typography>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6} md={8}>
							<Slides />
						</Grid>
						<Grid item xs={6} sm={3} md={4}>
							<Card className={classes.card}>
								<Typography variant='body1' align='center' gutterBottom>
									Pick up time
								</Typography>
								<div className={classes.contain}>
									<TextField
										id='datetime-local'
										type='datetime-local'
										defaultValue='2017-05-24T10:30'
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</div>
								<Typography variant='body1' align='center' gutterBottom>
									Return time
								</Typography>
								<div className={classes.contain}>
									<TextField
										id='datetime-local'
										type='datetime-local'
										defaultValue='2017-05-24T10:30'
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</div>
								<div className={classes.contain}>
									<DialogSelect />
								</div>
								<div className={classes.contain}>
									<input type='checkbox' style={{ marginRight: '30px' }} />
									Prices: $6.7
								</div>
								<div className={classes.contain}>
									<Button
										className={classes.buttons}
										variant='contained'
										color='primary'
										size='medium'
									>
										Book Now
									</Button>
								</div>
							</Card>
						</Grid>
					</Grid>
					<div className={classes.accordion}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'
							>
								<Typography className={classes.heading}>Description</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel2a-content'
								id='panel2a-header'
							>
								<Typography className={classes.heading}>
									Privacy Policy
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
};

function DialogSelect() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [age, setAge] = React.useState('');

	const handleChange = event => {
		setAge(Number(event.target.value) || '');
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen}>Select Location</Button>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Pick your location</DialogTitle>
				<DialogContent>
					<form className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='demo-dialog-native'>
								Pickup location
							</InputLabel>
							<Select
								native
								value={age}
								onChange={handleChange}
								input={<Input id='demo-dialog-native' />}
							>
								<option aria-label='None' value='' />
								<option value={'Remera'}>Remera</option>
								<option value={'Nyabugogo'}>Nyabugogo</option>
								<option value={'Kicukiro'}>Kicukiro</option>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel id='demo-dialog-select-label'>
								Drop off location
							</InputLabel>
							<Select
								labelId='demo-dialog-select-label'
								id='demo-dialog-select'
								value={age}
								onChange={handleChange}
								input={<Input />}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={'Remera'}>Remera</MenuItem>
								<MenuItem value={'Nyabugogo'}>Nyabugogo</MenuItem>
								<MenuItem value={'Kicukiro'}>Kicukiro</MenuItem>
							</Select>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleClose} color='primary'>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
