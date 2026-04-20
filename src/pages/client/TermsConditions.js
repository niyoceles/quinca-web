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
		width: '100%',
		paddingLeft:'5%',
		paddingRight: '5%'
	},
}));

const terms = [
	{
		id: 1,
		title:
			'To use Quinca Paradi, you will be required to provide us with personal information of which you have to always keep confidential for your information’s security sake. In case you get worried about your information’s security, kindly alert us right away.',
	},
	{
		id: 2,
		title:
			'Nature, quality and quantity of products are clearly described in the product list to ensure customer satisfaction.',
	},
	{
		id: 3,
		title:
			'If a product is delivered to you in conditions contrary to those described in the product list, report to us immediately.',
	},
	{
		id: 4,
		title:
			'The price of a product is as stated in the relevant product listing. The price listed will locally include the taxes and will be complying with the laws currently in force.',
	},
	{
		id: 5,
		title:
			'Other auxiliary costs and charges such as delivery charges, packaging charges, handling charges, administrative charges, and insurance costs will only be paid by the buyer only if they are mentioned in the product listing.',
	},
	{
		id: 6,
		title:
			'Payments are made via cards or mobile money transfer on our platform, any transaction made outside our system is not considered in our transactions.',
	},
	{
		id: 7,
		title:
			'The payment will be made in the currency of Rwandan Francs or dollars.',
	},
	{
		id: 8,
		title:
			'Returns and refunds will only be made on damaged goods, less or excess goods, and poor quality goods. Returns and refunds will be done in respect of the product price, and this will be communicated to us immediately after the arrival of goods.',
	},
	{
		id: 9,
		title:
			'Your content, this is to mean all materials including videos, audios, audio-visuals, graphics, text, images, scripts and software to mention but a few, which you submit to us to communication and other business-related purposes, must be complete, accurate, and authentic.',
	},
	{
		id: 10,
		title:
			'The content must abide with generally accepted standards of etiquette and behavior on the internet.',
	},
	{
		id: 11,
		title:
			'The content must not be a subject to any kind of offense, racial segregation, sexual assault, hatred, violence and menace.',
	},
	{
		id: 12,
		title:
			'The content must be fully yours, thus raising no concerns about counterfeit and piracy. If you decide to use others’ content, you must always give credits to whom they are due.',
	},
	{
		id: 13,
		title:
			'By submitting your content to us, you grant us full rights to use it for business-related purposes with no further payments.',
	},
	{
		id: 14,
		title:
			'By submitting your content to us, you grant us full rights to use, reproduce, store, adapt, publish, translate and distribute your content across our marketing channels and any existing or future media.',
	},
];

export default function TermsConditions() {
	const classes = useStyles();
	return (
		<ClientLayout>
			<main container >
				<Container item className={classes.cardGrid} maxWidth='lg'>
					<Grid container spacing={3} alignItems='center'>
						<Grid item xs={12} sm={12} md={12}>
							<Card className={classes.card} elevation={2}>
								<CardContent className={classes.cardContent}>
									<Typography
										component='h1'
										variant='h4'
										align='left'
										color='textPrimary'
									>
										Terms & conditions
									</Typography>
									<br />
									<Typography
										variant='h6'
										color='textPrimary'
										component='h2'
									>
										Using QuincaParadi as either a buyer or a seller, you agree
										to our terms and conditions guiding our operations. Our
										terms and conditions are as below:
									</Typography>
									<br />
									<Typography
										variant='body1'
										color='textPrimary'
										component='h1'
									>
										<b>Note: </b> All transactions and services on this platform
										served and managed by PARADI-BOUNTY Co. LTD which is owner
										of QuincaParadi.
									</Typography>
									<br />

									{terms &&
										terms.map(i => (
											<Typography
												variant='body1'
												color='textSecondary'
												component='p'
												gutterBottom
											>
												{i.id}. {i.title}
											</Typography>
										))}
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
