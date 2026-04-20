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
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../../redux/actions';
import { Link as ReactLink } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
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
		alignItems: 'center',
		backgroundColor: '#fff',
		backgroundSize: 'cover',
		height: 60,
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
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
		paddingTop: '100%',
		padding: 5,
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
	form: {
		width: '60%',
	},
}));

export default function SearchItems(props) {
	const classes = useStyles();
	const [submitted, setSubmitted] = useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const results = useSelector(state => state.client.searchResults);
	const dispatch = useDispatch();
	const doSomethingWith = e => {
		e.preventDefault();
		setSubmitted(true);
		if (searchValue) {
			dispatch(searchItems({ search: searchValue }));
		}
	};

	return (
		<>
			<Button
				color='inherit'
				className={[classes.buttonFontSize, classes.proformaButton]}
				onClick={props.handleOpenSearch}
				style={{ marginTop: -15 }}
			>
				<SearchIcon />
				{'Search'}
			</Button>
			<Dialog
				fullScreen
				open={props.openSearch}
				onClose={props.closeSearch}
				TransitionComponent={Transition}
			>
				<AppBar
					className={classes.appBar}
					color='default'
					position='sticky'
					indicatorColor='primary'
					elevation={2}
				>
					<Toolbar>
						<Grid container spacing={4} align='center' alignItems='center'>
							<IconButton
								edge='start'
								color='inherit'
								onClick={props.closeSearch}
								aria-label='close'
							>
								<CloseIcon />
							</IconButton>
							<Grid item style={{ width: 400 }} align='center'>
								<form
									className={classes.form}
									style={{ width: '90%' }}
									noValidate
									onSubmit={doSomethingWith}
								>
									<TextField
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
								</form>
							</Grid>
							<Grid item>
								<Button color='inherit' onClick={doSomethingWith}>
									<SearchIcon />
									{'Search'}
								</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<Container
					className={classes.cardGrid}
					maxWidth='lg'
					style={{
						textAlign: 'center',
					}}
				>
					{submitted && !results ? (
						<CircularProgress />
					) : (
						<Grid
							container
							spacing={4}
							style={{
								alignItems: 'center',
							}}
						>
							{results && results === 'No Item found' ? (
								<Typography
									component='h3'
									variant='h5'
									align='center'
									color='textPrimary'
									className={classes.titleFeature}
									gutterBottom
								>
									Your search results {results && results}
								</Typography>
							) : (
								results &&
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
													style={{ height: 90 }}
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
																	RWF{' '}
																	{card.itemPrice || card.itemPrice !== 0
																		? card.itemPrice
																		: 'Negociable'}
																</Button>
															</Grid>
														</Grid>
													</div>
												</CardContent>
											</ReactLink>
										</Card>
									</Grid>
								))
							)}
						</Grid>
					)}
				</Container>
			</Dialog>
		</>
	);
}
