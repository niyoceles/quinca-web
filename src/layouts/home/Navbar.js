import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
}));

export default function ButtonAppBar() {
	const classes = useStyles();

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

	const list = anchor => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<List>
				<ListItem button>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary='TravelsUp' />
				</ListItem>
			</List>
			<Divider />
			<List>
				{['About Us', 'Contact Us'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						onClick={toggleDrawer('left', true)}
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor='left'
						open={state['left']}
						onClose={toggleDrawer('left', false)}>
						{list('left')}
					</Drawer>
					<Typography variant='h6' className={classes.title}>
						Travels Up
					</Typography>
					<Link href='/signup' style={{ padding: 10 }}>
						<Button variant='contained' color='primary'>
							Signup
						</Button>
					</Link>
					<Link href='/login' style={{ padding: 10 }}>
						<Button variant='contained' color='primary'>
							Login
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}
