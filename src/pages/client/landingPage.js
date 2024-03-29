import React, { useEffect } from 'react';
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
import { getHomeItems } from '../../redux/actions';
import { Link as ReactLink } from 'react-router-dom';
import itemImage from '../../assets/images/home/construction.jpeg';
import materials from '../../assets/images/home/material.jpeg';
import { HomeSlide } from '../../components/client';
import ClientLayout from '../../layouts/ClientLayout';

const useStyles = makeStyles(theme => ({
	main: {
		backgroundColor: '#fff',
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
		paddingTop: '90%',
		padding: 5,
	},
	cardLink: {
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
}));

export default function LandingPage() {
	const categories = [
		{
			name: 'All Categories',
			url: '/categories',
		},
		{
			name: 'Contruction materials',
			url: '/category/construction',
		},
		{
			name: 'Plumbing materials',
			url: '/category/plumbing',
		},
		{
			name: 'Electricity materials',
			url: '/category/electricity',
		},
		{
			name: 'Contruction materials',
			url: '/construction',
		},
		{
			name: 'Plumbing materials',
			url: '/category/plumbing',
		},
		{
			name: 'Electricity materials',
			url: '/category/electricity',
		},
		{
			name: 'Plumbing materials',
			url: '/category/plumbing',
		},
	];
	const classes = useStyles();
	const constructionItems = useSelector(
		state => state.client.homeItems.construction
	);
	console.log('cvcvcvc', constructionItems);

	const plumbingItems = useSelector(state => state.client.homeItems.plumbing);
	const electricityItems = useSelector(
		state => state.client.homeItems.electricity
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getHomeItems());
	}, [dispatch]);

	return (
		<ClientLayout>
			<main className={classes.main}>
				<Container className={classes.topCardGrid} maxWidth='lg'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={3}>
							<Card className={classes.topCard}>
								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant='h5' component='h2'>
										Categories
									</Typography>
									{categories !== undefined ? (
										categories.map(category => (
											<Link
												display='block'
												variant='body2'
												href={category.url}
												key={category}
												className={classes.links}
											>
												<Grid
													container
													direction='row'
													spacing={1}
													alignItems='center'
												>
													<Grid item>
														<DoubleArrowRoundedIcon />
													</Grid>
													<Grid item>
														{' '}
														<Typography
															variant='body1'
															color='textPrimary'
															align='center'
														>
															{category.name}
														</Typography>
													</Grid>
												</Grid>
											</Link>
										))
									) : (
										<CircularProgress className={classes.spin} />
									)}
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Card className={classes.topCard}>
								<HomeSlide />
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Card className={classes.topCard}>
								<ReactLink
									to='/category/construction'
									className={classes.links}
								>
									<CardMedia
										className={classes.cardLink}
										image={itemImage}
										title='Construction materials'
									/>
								</ReactLink>
							</Card>
							<Card className={classes.topCard}>
								<ReactLink to='/category/plumbing' className={classes.links}>
									<CardMedia
										className={classes.cardLink}
										image={materials}
										title='Plumbing materials'
									/>
								</ReactLink>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</main>
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
					Most Featured Materials
				</Typography>
				<Grid container spacing={4}>
					{constructionItems !== undefined ? (
						constructionItems.map(card => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<ReactLink to={`/view/${card.id}`} className={classes.links}>
										<CardMedia
											className={classes.cardMedia}
											image={card.itemImage}
											title={card.itemName}
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
					Featured Tools
				</Typography>
				<Grid container spacing={4}>
					{plumbingItems !== undefined ? (
						plumbingItems.map(card => (
							<Grid item key={card} xs={12} sm={6} md={3}>
								<Card className={classes.card} elevation={3}>
									<ReactLink to={`/view/${card.id}`} className={classes.links}>
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
					Additional Material tools
				</Typography>
				<Grid container spacing={4}>
					{electricityItems !== undefined ? (
						electricityItems.map(card => (
							<Grid item key={card} xs={12} sm={6} md={3}>
								<Card className={classes.card} elevation={3}>
									<ReactLink to={`/view/${card.id}`} className={classes.links}>
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
			</Container>
		</ClientLayout>
	);
}
