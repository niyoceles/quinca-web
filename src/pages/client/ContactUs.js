import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import ClientLayout from '../../layouts/ClientLayout';
import ContactForm from '../../components/client/ContactForm';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2),
		backgroundColor: '#f2f6fb',
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

export default function ContactUs() {
	const classes = useStyles();
	return (
		<ClientLayout>
			<main container>
				<Container item className={classes.cardGrid} maxWidth='lg'>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} md={6}>
							<Card className={classes.card} elevation={1}>
								<CardContent className={classes.cardContent}>
									<Typography
										component='h3'
										variant='h6'
										align='left'
										color='textPrimary'
									>
										Address
									</Typography>
									<br />
									<Typography
										variant='body1'
										color='textSecondary'
										component='p'
									>
										Phone: +250 788 550 184
										<br />
										Email: info@quincaparadi.com
										<br />
										Location: Kigali, Gasabo District, Gisozi
									</Typography>
								</CardContent>
							</Card>
							{/* <div style={{ width: '100%' }}>
								<embed src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63799.99735817496!2d30.103524999999998!3d-1.9533690000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc76b5e00aaa31b51!2sM%26M%20Plaza!5e0!3m2!1sen!2srw!4v1605274623851!5m2!1sen!2srw' />
							</div> */}
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Card className={classes.card} elevation={1}>
								<ContactForm />
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Card elevation={1}>
								<CardMedia></CardMedia>
							</Card>
						</Grid>
					</Grid>
				</Container>
				<Divider />
			</main>
		</ClientLayout>
	);
}
