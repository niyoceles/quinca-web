import React, { Fragment, useState } from 'react';
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
import EmailIcon from '@material-ui/icons/Email';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { logoutUser } from '../redux/actions';
import Grid from '@material-ui/core/Grid';
import cartImage from '../assets/images/cart.svg';
import Quinca_logo from '../assets/images/quinca-logo.jpeg';
import userImage from '../assets/images/account.svg';
import MenuIcon from '@material-ui/icons/Menu';
import SearchItems from '../pages/client/SearchItems';
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
		margin: 0,
		width: 20,
		height: 20,
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
		fontSize: '11px',
		color: '#a1a1a1',
	},
	loginButton: {
		background: '#f5f5f5',
		color: '#333',
		borderRadius: '25px',
		padding: '4px 20px',

		'&:hover': {
			background: '#f2f6fb',
			boxShadow: '0px 1px 1px #888888',
			color: '#333',
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
		height: 10,
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
	logo: {
		maxWidth: 200,
		marginRight: '10px',
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();
	const [openSearch, setOpenSearch] = useState(false);
	const orderedItems = JSON.parse(localStorage.getItem('orderSummary'));
	const isAuthenticated = useSelector(state => state.auth.authenticated);
	// const user = useSelector(state => state.auth.user);
	const userinformation = JSON.parse(localStorage.getItem('userInfo'));
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

	// const token = localStorage.IdToken;

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	const handleClickOpenSearch = () => {
		setOpenSearch(true);
	};

	const handleCloseSearch = () => {
		setOpenSearch(false);
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
								title: 'My Proforma',
								path: '/my-proforma',
								icon: <FeaturedPlayListIcon />,
						  }
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

	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		}
	}

	function handleClose() {
		setAnchorEl(null);
	}
	
	return (
		<Fragment>
			<AppBar
				component='div'
				color='default'
				position='sticky'
				indicatorColor='primary'
				style={{ backgroundColor: '#fff', backgroundSize: 'cover', height: 40 }}
				elevation={0}
			>
				<Toolbar style={{ marginTop: -15 }}>
					<Link to='/' className={classes.links}>
						<Typography variant='body2' color='textSecondary' align='center'>
							Home
						</Typography>
					</Link>
					<Typography
						variant='body1'
						color='textPrimary'
						align='center'
						style={{ paddingLeft: 5, paddingRight: 5 }}
					>
						|
					</Typography>{' '}
					<Link to='/contact-us' className={classes.links}>
						<Typography variant='body2' color='textSecondary' align='center'>
							Help
						</Typography>
					</Link>
					<Typography
						variant='body1'
						color='textPrimary'
						align='center'
						style={{ paddingLeft: 5, paddingRight: 5 }}
					>
						|
					</Typography>{' '}
					<Typography variant='body2' color='textSecondary' align='center'>
						<CallIcon style={{ marginBottom: -8 }} /> +250 788 550 184
					</Typography>{' '}
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{isAuthenticated ? (
							<>
								<Typography
									variant='body2'
									color='textSecondary'
									align='center'
								>
									<EmailIcon style={{ marginBottom: -8 }} />{' '}
									{userinformation.email}
								</Typography>
								<Typography
									variant='body1'
									color='textPrimary'
									align='center'
									style={{ paddingLeft: 5, paddingRight: 5 }}
								>
									|
								</Typography>{' '}
								<Typography
									variant='body2'
									color='textSecondary'
									align='center'
								>
									{userinformation.names}
								</Typography>
							</>
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
						<Link to='/' className={classes.links}>
							<img
								src={Quinca_logo}
								alt='Quinca Paradi'
								className={classes.logo}
							/>
						</Link>
					</Typography>
					<div className={classes.search}>
						{/* search icons */}
						<SearchItems
							handleOpenSearch={handleClickOpenSearch}
							openSearch={openSearch}
							closeSearch={handleCloseSearch}
						/>
					</div>
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
								<Link to='/request' className={classes.links}>
									<Button
										color='inherit'
										className={[classes.buttonFontSize, classes.proformaButton]}
									>
										Request proforma
									</Button>
								</Link>
							</Grid>
							<Grid item>
								<Link to='/cart' className={classes.links}>
									<img
										width='50'
										height='25'
										src={cartImage}
										alt=''
										className='edit-img'
									/>
									<span
										style={{
											marginLeft: -13,
											backgroundColor: '#e91e63',
											color: '#fff',
											fontWeight: 'bold',
											fontSize: 18,
											padding: 5,
											borderRadius: '25px',
										}}
									>
										{orderedItems && orderedItems.length}
									</span>
								</Link>
							</Grid>
							<Grid item>
								{isAuthenticated ? (
									<div>
										<Button
											aria-owns={anchorEl ? 'simple-menu' : undefined}
											aria-haspopup='true'
											onClick={handleClick}
											onMouseOver={handleClick}
											className={classes.buttonFontSize}
											color='inherit'
											style={{ marginTop: -5 }}
										>
											<img
												width='50'
												height='25'
												src={userImage}
												alt=''
												className='edit-img'
											/>
											My Account
										</Button>
										<Menu
											id='simple-menu'
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={handleClose}
											MenuListProps={{ onMouseLeave: handleClose }}
										>
											<MenuItem
												onClick={handleClose}
												style={{ backgroundColor: '#fff' }}
											></MenuItem>
											<List>
												{[
													{
														title: 'my profile',
														path: '/me',
														icon: <AccountBoxIcon />,
													},
													{
														title: 'My Proforma',
														path: '/my-proforma',
														icon: <FeaturedPlayListIcon />,
													},
													{
														title: 'My Bookings',
														path: '/bookings',
														icon: <FeaturedPlayListIcon />,
													},
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
												<ListItem button onClick={handleLogout}>
													{/* <ListItemIcon> */}
													<ExitToAppIcon />
													{/* </ListItemIcon> */}{' '}
													<ListItemText primary='Logout' />
												</ListItem>
											</List>
										</Menu>
									</div>
								) : null}
							</Grid>
						</Grid>
					</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}
