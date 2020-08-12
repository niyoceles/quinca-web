import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
		backgroundColor: '#f2f6fb',
		marginBottom: 40,
		borderRadius: '10px',
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
	list: {
		width: 250,
	},
	titleFeature: {
		marginTop: -50,
	},
	fullList: {
		width: 'auto',
	},
}));

export default function VerifiedAccount() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h2'
							variant='h3'
							align='center'
							color='textPrimary'
							gutterBottom>
							Account verified
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Your account has successful verified, <br />
							Please click the button below to login into your account
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify='center'>
								<Grid item>
									<Link href='/login' style={{ padding: 10 }}>
										<Button variant='contained' color='primary'>
											Login
										</Button>
									</Link>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
			</main>
			{/* Footer */}
			{/* End footer */}
		</React.Fragment>
	);
}
