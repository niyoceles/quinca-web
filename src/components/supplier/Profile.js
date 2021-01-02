import React, { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import Title from '../../layouts/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import EditProfile from './EditProfile';

const useStyles = makeStyles(theme => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		float: 'right',
	},
	progress: {
		position: 'absolute',
	},
	spin: {
		position: 'relative',
		top: '50%',
		left: '45%',
		boxSizing: 'border-box',
		margin: 'auto',
		width: '100px !important',
		height: '100px !important',
	},
}));

const Profile = () => {
	const classes = useStyles();
	const profile = useSelector(state => state.supplier.profile.myprofile);
	const [showUpdate, setShowUpdate] = useState(false);

	const handleShowUpdate = () => {
		setShowUpdate(true);
	};

	const handleHideUpdate = () => {
		setShowUpdate(false);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMyProfile());
	}, [dispatch]);

	return (
		<React.Fragment>
			{profile !== undefined ? (
				profile.map(i => (
					<>
						<Title>
							My Profile Account{' '}
							<Button
								variant='contained'
								color='secondary'
								className={classes.submit}
								onClick={handleHideUpdate}
								style={{ display: showUpdate ? 'block' : 'none' }}
							>
								Cancel updating
							</Button>
							<Button
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={handleShowUpdate}
								style={{ display: showUpdate ? 'none' : 'block' }}
							>
								Update Profile <EditIcon color='white' fontSize='small' />
							</Button>
						</Title>
						<div style={{ display: showUpdate ? 'block' : 'none' }}>
							<EditProfile user={i} />
						</div>

						<ResponsiveContainer>
							<div
								className=''
								style={{ display: showUpdate ? 'none' : 'block' }}
							>
								<Typography>
									Names: <b>{i.names}</b>
								</Typography>
								<Typography>
									Email: <b>{i.email}</b>
								</Typography>
								<Typography>
									Organization: <b>{i.organization}</b>
								</Typography>
								<Typography>
									Phone Number: <b>{i.phoneNumber}</b>
								</Typography>
								<Typography>
									country: <b>{i.country}</b>
								</Typography>
								<Typography>
									State: <b>{i.state}</b>
								</Typography>
								<Typography>
									Address: <b>{i.address}</b>
								</Typography>
								<Typography>
									Location: <b>{i.location}</b>
								</Typography>
								<Typography>
									National ID: <b>{i.nationalId}</b>
								</Typography>
								<Typography>
									Account type: <b>{i.userType}</b>
								</Typography>
								<Typography>
									Joined at: <b>{i.createdAt}</b>
								</Typography>
							</div>
						</ResponsiveContainer>
					</>
				))
			) : (
				<CircularProgress className={classes.spin} />
			)}
		</React.Fragment>
	);
};
export default Profile;
