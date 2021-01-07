import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
	root: {
		width: '75%',
		margin: '100px auto',
	},
	container: {
		maxHeight: 240,
	},
	row: {
		cursor: 'pointer',
		'&:hover': {
			background: '#1976d26c !important',
			borderRadius: '12px !important',
			boxShadow: '0 2px 3px #ccc',
		},
	},
	listItem: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const SingleBookings = props => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.close}
				aria-labelledby='form-dialog-title'
				style={{ overflowX: 'hidden !important' }}
				fullWidth={true}
				maxWidth={'md'}
			>
				<DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
					Booking details
				</DialogTitle>
				<Grid container spacing={1}>
					<Grid item xs={10} sm={5} md={5}>
						<DialogContent>
							{/* <DialogContentText> */}
							{props.details.items !== undefined ? (
								<img
									style={{
										width: '80%',
										height: '40vh',
										margin: 'auto',
										borderRadius: 10,
									}}
									alt='item image'
									src={props.details.items.itemImage}
								/>
							) : null}
							{/* </DialogContentText> */}
						</DialogContent>
					</Grid>
					<Grid item xs={10} sm={7} md={7}>
						<DialogContent>
							<DialogContentText>
								{props.details.items !== undefined ? (
									<List className={classes.listItem}>
										<ListItem>
											<ListItemText primary='Name' />
											<ListItemText primary={props.details.items.itemName} />
										</ListItem>
										<Divider variant='inset' component='li' />

										<ListItem>
											<ListItemText primary='Price' />
											<ListItemText
												primary={props.details.items.itemPrice + 'Rwf'}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />

										<ListItem>
											<ListItemText primary='Category' />
											<ListItemText primary={props.details.items.category} />
										</ListItem>
										<Divider variant='inset' component='li' />

										<ListItem>
											<ListItemText primary='Organization' />
											<ListItemText
												primary={props.details.items.owner.organization}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />

										<ListItem>
											<ListItemText primary='Phone No.' />
											<ListItemText
												primary={props.details.items.owner.phoneNumber}
											/>
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											<ListItemText primary='E-mail' />
											<ListItemText primary={props.details.items.owner.email} />
										</ListItem>
										<Divider variant='inset' component='li' />
										<ListItem>
											{!props.details.isPaid ? (
												<CardActions
													style={{
														position: 'relative',
														bottom: '0',
														width: '100%',
													}}
												>
													<Button
														color='secondary'
														size='small'
														variant='contained'
														style={{ width: '45%' }}
													>
														Cancel
													</Button>
													<Button
														color='primary'
														size='small'
														style={{
															backgroundColor: '#0080003a',
															width: '45%',
															color: 'green',
														}}
													>
														Pay
													</Button>
												</CardActions>
											) : null}
										</ListItem>
									</List>
								) : null}
							</DialogContentText>
						</DialogContent>
					</Grid>
				</Grid>
			</Dialog>
		</>
	);
};

export default SingleBookings;
