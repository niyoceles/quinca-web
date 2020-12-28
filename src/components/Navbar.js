import React, { Fragment } from 'react';
import './styles.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { logoutUser } from '../redux/actions';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import cartImage from '../assets/images/cart.svg';
import MenuIcon from '@material-ui/icons/Menu';
// import accountImage from '../assets/images/account.svg';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	leftNavMenu: {
		width: '45%',
		textAlign: 'right',
	},
	avatar: {
		display: 'inline-flex',
		margin: 7,
	},
	username: {
		display: 'inline-block',
	},
	links: {
		textDecoration: 'none',
		color: 'inherit',
		paddingLeft: '5px',
	},
	buttonFontSize: {
		fontSize: '12px',
		color: '#a1a1a1',
		// padding: '15px',
	},
	loginButton: {
		background: '#f5f5f5',
		color:'#333',
		borderRadius: '25px',
		padding: '6px 25px',

		'&:hover': {
			background: '#f2f6fb',
			boxShadow: '0px 1px 1px #888888',
			color:'#333'
		},
	},
	proformaButton: {
		background: '#e91e63',
		color: '#fff',
		borderRadius: '25px',
		padding: '6px 25px',

		'&:hover': {
			background: 'blue',
			boxShadow: '0px 2px 10px #888888',
		},
	},
	grow: {
		flexGrow: 1,
	},
	searchSection: {
		marginLeft: 0,
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();
	const isAuthenticated = useSelector(state => state.auth.authenticated);
	const user = useSelector(state => state.auth.user);

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	const list = anchor => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem button>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary='QuincaParadi' />
				</ListItem>
			</List>
			<Divider />
			<List>
				{[
					isAuthenticated
						? { title: 'Profile', path: '/me', icon: <AccountBoxIcon /> }
						: null,
					isAuthenticated
						? {
								title: 'My Bookings',
								path: '/bookings',
								icon: <FeaturedPlayListIcon />,
						  }
						: null,
					{ title: 'Contact Us', path: '/', icon: <ContactPhoneIcon /> },
					{ title: 'About Us', path: '/', icon: <InfoIcon /> },
				]
					.filter(e => e !== null)
					.map(link => (
						<ListItem button key={link.title}>
							<ListItemIcon>{link.icon}</ListItemIcon>
							<Link to={link.path} className={classes.links}>
								<ListItemText primary={link.title} />
							</Link>
						</ListItem>
					))}
				{isAuthenticated ? (
					<ListItem button onClick={handleLogout}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItem>
				) : null}
			</List>
		</div>
	);

	return (
		<Fragment>
			<AppBar
				component='div'
				color='default'
				position='sticky'
				indicatorColor='primary'
				style={{ backgroundColor: '#fff', backgroundSize: 'cover' }}
				elevation={0}
			>
				<Toolbar>
					<Typography variant='body2' color='textSecondary' align='center'>
						<CallIcon style={{ marginBottom: -5 }} /> +250 784 051 366
					</Typography>{' '}
					<Typography
						variant='body1'
						color='textPrimary'
						align='center'
						style={{ paddingLeft: 5, paddingRight: 5 }}
					>
						|
					</Typography>{' '}
					<Link to='/login' className={classes.links}>
						<Typography variant='body2' color='textSecondary' align='center'>
							Help
						</Typography>
					</Link>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{isAuthenticated ? (
							<Hidden>
								<Avatar
									className={classes.avatar}
									alt={user.names}
									src='/static/images/avatar/1.jpg'
								/>
								<Hidden xsDown>
									<h4 className={classes.username}>{user.names}</h4>
								</Hidden>
							</Hidden>
						) : (
							<>
								<Link to='/login' className={classes.links}>
									<Button
										color='inherit'
										className={[classes.buttonFontSize, classes.loginButton]}
									>
										Login
									</Button>
								</Link>
								<Link to='/signup' className={classes.links}>
									<Button
										color='inherit'
										className={[classes.buttonFontSize, classes.loginButton]}
									>
										Join
									</Button>
								</Link>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
			<AppBar
				component='div'
				color='default'
				style={{ backgroundColor: '#fff', backgroundSize: 'cover' }}
				position='sticky'
				elevation={2}
			>
				<Toolbar>
					<div className={classes.sectionMobile}>
						<IconButton
							onClick={toggleDrawer('left', true)}
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
						>
							<MenuIcon />
						</IconButton>
						<Drawer
							anchor='left'
							open={state['left']}
							onClose={toggleDrawer('left', false)}
						>
							{list('left')}
						</Drawer>
					</div>
					{/* <div className={classes.sectionDesktop}> */}
					<Typography variant='h6' className={classes.title}>
						Quinca Paradi
					</Typography>
					{/* <div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search…'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div> */}
					<div className={classes.sectionDesktop}>
						<Grid
							container
							direction='row'
							align='left'
							spacing={1}
							alignItems='left'
							style={{ marginRight: 0 }}
						>
							<Grid item>
								<Link to='/login' className={classes.links}>
									<Button
										color='inherit'
										className={[classes.buttonFontSize, classes.proformaButton]}
									>
										Request proforma
									</Button>
								</Link>
							</Grid>
							<Grid item>
								<img
									width='70'
									height='30'
									src={cartImage}
									alt=''
									className='edit-img'
								/>
							</Grid>
							<Grid item>
								{' '}
								{/* <img width='70' height='30' src={accountImage} alt='' /> */}
								<Link to='/login' className={classes.links}>
									<Button color='inherit' className={classes.buttonFontSize}>
										My Account
									</Button>
								</Link>
							</Grid>
						</Grid>
					</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}
