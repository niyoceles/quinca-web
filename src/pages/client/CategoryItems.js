import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryItems } from '../../redux/actions';
import { Link as ReactLink } from 'react-router-dom';
import ClientLayout from '../../layouts/ClientLayout';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
		marginBottom: 40,
		borderRadius: '10px',
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
	titleFeature: {
		marginTop: -50,
	},
	links: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));

export default function CategoryItems(props) {
	const classes = useStyles();
	const { category } = props.match.params;
	const categoryitems = useSelector(
		state => state.client.categoryItems.category
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategoryItems(category));
	}, [category, dispatch]);

	return (
		<ClientLayout>
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
					Available material in{' '}
					{categoryitems && categoryitems.map(i => i.name)} category
				</Typography>
				<Grid container spacing={4}>
					{categoryitems &&
						categoryitems.map(i =>
							i.items.map(card => (
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
											<CardContent className={classes.cardContent}>
												<div style={{ marginLeft: 15 }}>
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
														<Grid item></Grid>
													</Grid>
												</div>
											</CardContent>
										</ReactLink>
									</Card>
								</Grid>
							))
						)}
				</Grid>
			</Container>
		</ClientLayout>
	);
}
