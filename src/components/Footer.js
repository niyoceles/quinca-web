import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { SocialIcon } from 'react-social-icons';
// import { Link as ReactLink } from 'react-router-dom';
import secureImage from '../assets/images/secure.svg';
import paymentImage from '../assets/images/payment.svg';
import helpImage from '../assets/images/help.svg';
import deliverImage from '../assets/images/delivery.svg';
import momoImage from '../assets/images/mtnmomo.png';
import masterCard from '../assets/images/mastercard.svg';
import visaImage from '../assets/images/visa.svg';
import Quinca_logo from '../assets/images/quinca-logo.jpeg';
const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: '#f8f8f8',
		padding: theme.spacing(6),
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: 5,
		marginBottom: 5,
		padding: 0,
	},
	paymentImage: {
		padding: 5,
	},
	links: {
		textDecoration: 'none !important',
		color: 'inherit',
		padding: 2,
	},
	contactLink: {
		textDecoration: 'none !important',
		color: 'inherit',
		padding: 2,
		'&:hover': {
			boxShadow: '0px 1px 1px #888888',
			// color: '#333',
			textDecoration: 'none !important',
		},
	},
	logo: {
		maxWidth: 200,
		marginRight: '10px',
	},
}));

function Copyright() {
	return (
		<Typography variant='body2' color='textPrimary' align='center'>
			{'Copyright © '} {new Date().getFullYear()}{' '}
			<Link color='inherit' href='https://quincaparadi.com/'>
				QuincaParadi
			</Link>{' '}
			{'. All Rights Reserved.'}
		</Typography>
	);
}

const Footer = () => {
	const classes = useStyles();
	const social = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/niyoceles',
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/in/celestin-niyonsaba/',
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/niyoceles',
		},
	];

	const categories = [
		{
			name: 'All Categories',
			url: '/categories',
		},
		{
			name: 'Contruction materials',
			url: '/contruction',
		},
		{
			name: 'Plumbing materials',
			url: '/plumbing',
		},
		{
			name: 'Electricity materials',
			url: '/electricity',
		},
	];
	return (
		<footer className={classes.footer}>
			<Grid container spacing={6}>
				<Grid item xs={6} sm={3}>
					<Typography variant='body2' align='center' gutterBottom>
						<img
							width='100'
							height='60'
							src={secureImage}
							alt=''
							className='edit-img'
						/>
					</Typography>
					<Typography variant='body1' color='textPrimary' align='center'>
						100% Secure Payments
					</Typography>
					<Typography variant='body2' color='textSecondary' align='center'>
						Pay with the world's most popular and secure payment methods
					</Typography>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography variant='body2' align='center' gutterBottom>
						<img
							width='100'
							height='60'
							src={paymentImage}
							alt=''
							className='edit-img'
						/>
					</Typography>
					<Typography variant='body1' color='textPrimary' align='center'>
						Trust Pay
					</Typography>
					<Typography variant='body2' color='textSecondary' align='center'>
						100% Payment Protection. Easy Return Policy
					</Typography>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography variant='body2' align='center' gutterBottom>
						<img
							width='100'
							height='60'
							src={helpImage}
							alt=''
							className='edit-img'
						/>
					</Typography>
					<Typography variant='body1' color='textPrimary' align='center'>
						Help 24/7
					</Typography>
					<Typography variant='body2' color='textSecondary' align='center'>
						Got a question? please{' '}
						<Link
							display='inline'
							variant='body2'
							href='/contact-us'
							align='center'
							className={classes.contactLink}
						>
							Contact us
						</Link>
					</Typography>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography variant='body2' align='center' gutterBottom>
						<img
							width='100'
							height='60'
							src={deliverImage}
							alt=''
							className='edit-img'
						/>
					</Typography>
					<Typography variant='body1' color='textPrimary' align='center'>
						Delivery
					</Typography>
					<Typography variant='body2' color='textSecondary' align='center'>
						Fast and secure delivery service
					</Typography>
				</Grid>
			</Grid>
			<Box m={2} pt={3}>
				<Divider />
			</Box>
			<Grid container spacing={6}>
				<Grid item xs={12} sm={4}></Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant='body1' color='textPrimary' align='center'>
						Payment Method
					</Typography>
					<Typography
						variant='body2'
						align='center'
						alignItems='center'
						gutterBottom
					>
						<img
							width='80'
							height='50'
							src={momoImage}
							alt=''
							className={classes.paymentImage}
						/>
						<img
							width='80'
							height='50'
							src={visaImage}
							alt=''
							className={classes.paymentImage}
						/>
						<img
							width='80'
							height='50'
							src={masterCard}
							alt=''
							className={classes.paymentImage}
						/>
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}></Grid>
			</Grid>
			<Box m={2} pt={3}>
				<Divider />
			</Box>
			<Grid container spacing={6}>
				<Grid item xs={6} sm={3}>
					<Typography
						variant='body1'
						color='textPrimary'
						align='left'
						gutterBottom
					>
						<img
							src={Quinca_logo}
							alt='Quinca Paradi'
							className={classes.logo}
						/>
					</Typography>
					This blog post shows a few different types of content that are
					supported and styled with Material styles. Basic typography, images
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography
						variant='body1'
						color='textPrimary'
						align='left'
						gutterBottom
					>
						Browse
					</Typography>
					{categories &&
						categories.map(category => (
							<Link
								display='block'
								variant='body2'
								href={category.url}
								key={category}
								align='center'
								className={classes.links}
							>
								<Typography
									variant='body2'
									color='textSecondary'
									align='left'
									gutterBottom
								>
									{category.name}
								</Typography>
							</Link>
						))}
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography
						variant='body1'
						color='textPrimary'
						align='left'
						gutterBottom
					>
						Company
					</Typography>
					<Link
						display='block'
						variant='body2'
						href='/contact-us'
						align='center'
						className={classes.links}
					>
						<Typography
							variant='body2'
							color='textSecondary'
							align='left'
							gutterBottom
						>
							Contact us
						</Typography>
					</Link>
					<Link
						display='block'
						variant='body2'
						href='/contact-us'
						align='center'
						className={classes.links}
					>
						<Typography
							variant='body2'
							color='textSecondary'
							align='left'
							gutterBottom
						>
							About us
						</Typography>
					</Link>
					<Link
						display='block'
						variant='body2'
						href='/'
						align='center'
						className={classes.links}
					>
						<Typography
							variant='body2'
							color='textSecondary'
							align='left'
							gutterBottom
						>
							How we work
						</Typography>
					</Link>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography
						variant='body1'
						color='textPrimary'
						align='left'
						gutterBottom
					>
						Stay Connected
					</Typography>
					{social.map(network => (
						<Link
							display='block'
							variant='body2'
							href={network.url}
							key={network}
							align='center'
							className={classes.links}
						>
							<Grid container direction='row' spacing={1} alignItems='center'>
								<Grid item>
									<SocialIcon
										className={classes.button}
										url={network.url}
										fontSize='12px'
										color='white'
										target='_blank'
									/>
								</Grid>
								<Grid item>{network.name}</Grid>
							</Grid>
						</Link>
					))}
				</Grid>
			</Grid>
			<Box m={2} pt={3}>
				<Divider />
			</Box>
			<Copyright />
		</footer>
	);
};
export default Footer;
