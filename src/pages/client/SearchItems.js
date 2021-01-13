import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../../redux/actions';
import { Link as ReactLink } from 'react-router-dom';
import itemImage from '../../assets/images/home/construction.jpeg';
import materials from '../../assets/images/home/material.jpeg';
import { HomeSlide } from '../../components/client';
import ClientLayout from '../../layouts/ClientLayout';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	main: {
		backgroundColor: '#fff',
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	topCardGrid: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#fff',
		borderRadius: '10px',
	},
	topCard: {
		// height: '70%',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 5,
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
	divContent: {
		marginLeft: 15,
		marginTop: -10,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
	titleFeature: {
		marginTop: -50,
	},
	links: {
		textDecoration: 'none',
		color: 'inherit',
	},
	spin: {
		margin: '50px auto',
		width: '50px !important',
		height: '50px !important',
	},
	form:{
		width: '60%'
	}
}));

export default function SearchItems() {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const results = useSelector(state => state.client.searchResults);
	const dispatch = useDispatch();
	const doSomethingWith = e => {
		console.log('Search is working!');
		e.preventDefault();

		setSubmitted(true);
		if (searchValue) {
			dispatch(searchItems(searchValue));
		}
	};

	return (
		<ClientLayout>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Open full-screen dialog
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						{/* <Grid item>
							<SearchBar
								value={searchValue}
								onChange={newValue => setSearchValue(newValue)}
								onRequestSearch={() => doSomethingWith(searchValue)}
							/>
						</Grid>
						<Grid item>
							<Button
								color='inherit'
								className={[classes.buttonFontSize, classes.proformaButton]}
								onClick={() => doSomethingWith(searchValue)}
							>
								<SearchIcon />
								{'Search'}
							</Button>
						</Grid> */}
						<form
							className={classes.form}
							noValidate
							onSubmit={doSomethingWith}
						>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='searchValue'
								label='search item'
								name='searchValue'
								onChange={e => setSearchValue(e.target.value)}
								autoComplete='searchValue'
								autoFocus
							/>
							<Button
								type='submit'
								color='inherit'
								className={[classes.buttonFontSize, classes.proformaButton]}
								onClick={doSomethingWith}
								style={{ marginTop: 25 }}
							>
								<SearchIcon />
								{'Search'}
							</Button>
						</form>
						<Button autoFocus color='secondary' onClick={handleClose}>
							Cancel
						</Button>
					</Toolbar>
				</AppBar>
				<Container className={classes.cardGrid} maxWidth='lg'>
					{submitted && results === undefined ? (
						<CircularProgress className={classes.spin} />
					) : (
						<Grid container spacing={4}>
							<Typography
								component='h3'
								variant='h5'
								align='center'
								color='textPrimary'
								className={classes.titleFeature}
								gutterBottom
							>
								search results for {searchValue}
							</Typography>
							{results !== undefined ? (
								results.map(card => (
									<Grid item key={card} xs={12} sm={6} md={3}>
										<Card className={classes.card} elevation={3}>
											<ReactLink
												to={`/view/${card.id}`}
												className={classes.links}
											>
												<CardMedia
													className={classes.cardMedia}
													image={card.itemImage}
													title='Image title'
												/>
												<CardContent
													className={classes.cardContent}
													style={{ height: 70 }}
												>
													<div className={classes.divContent}>
														<Typography
															variant='body1'
															color='textPrimary'
															align='left'
															gutterBottom
														>
															{card.itemName}
														</Typography>
														<Grid
															container
															direction='row'
															spacing={1}
															alignItems='center'
														>
															<Grid item align='left'>
																<Typography
																	variant='body2'
																	color='textSecondary'
																	align='left'
																	gutterBottom
																>
																	{card.category}
																</Typography>
															</Grid>
															<Grid item></Grid>
															<Grid item align='right'>
																{' '}
																<Button
																	size='medium'
																	color='primary'
																	style={{ marginTop: -5 }}
																>
																	RWF {card.itemPrice}
																</Button>
															</Grid>
														</Grid>
													</div>
												</CardContent>
											</ReactLink>
										</Card>
									</Grid>
								))
							) : (
								<CircularProgress className={classes.spin} />
							)}
						</Grid>
					)}
				</Container>
			</Dialog>
		</ClientLayout>
	);
}
