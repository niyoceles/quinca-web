import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import ClientLayout from '../../layouts/ClientLayout';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2),
		marginBottom: 40,
		borderRadius: '10px',
	},
	card: {
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	cardContent: {
		flexGrow: 1,
	},
}));

export default function AboutUs() {
	const classes = useStyles();
	return (
		<ClientLayout>
			<main container>
				<Container item className={classes.cardGrid} maxWidth='lg'>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={8}>
							<Card className={classes.card} elevation={1}>
								<CardContent className={classes.cardContent}>
									<Typography
										component='h3'
										variant='h6'
										align='left'
										color='textPrimary'
									>
										About us
									</Typography>
									<br />
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										<b> Vision: </b>
										Globalization of market, and stabilization of price
									</Typography>
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										<b>Mission: </b> Provision of all in common space
									</Typography>
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
										gutterBottom
									>
										<b>Objectives: </b> Unification of market, attenuation of
										wasting time, minimizing the costs and keep price standard.
										Promoting technology of e-commerce in this business.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Card className={classes.card} elevation={1}>
								<CardContent className={classes.cardContent}>
									<Typography
										component='h3'
										variant='h6'
										align='left'
										color='textPrimary'
									>
										Cores values
									</Typography>
									<br />
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										• Credibility <br />
										• Commitment <br />
										• Punctuality <br />
										• Collaboration <br />• Permanence
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<Card className={classes.card} elevation={1}>
								<CardContent className={classes.cardContent}>
									<Typography
										component='h3'
										variant='h6'
										align='left'
										color='textPrimary'
									>
										Core business
									</Typography>
									<br />
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										• Distribution, supply and import of construction, plumbing
										and electricity materials <br />
										• E-commerce of construction, plumbing and electricity
										materials <br />
										• Marketing and promotion of goods <br />• Import,
										manufacturing and selling of furniture (for office, home,
										churches, schools, hotel, restaurant…)
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Card className={classes.card} elevation={1}>
								<CardContent className={classes.cardContent}>
									<Typography
										component='h3'
										variant='h6'
										align='left'
										color='textPrimary'
									>
										Achievement goals
									</Typography>
									<br />
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										• Supporting our government far exceeding paying taxes
									</Typography>
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										• Promoting enduring marriage, supporting the divorcees to
										resists the its consequences
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
				<Divider />
			</main>
		</ClientLayout>
	);
}
