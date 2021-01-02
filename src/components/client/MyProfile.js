import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../supplier/Profile";
import SupplierLayout from '../../layouts/SupplierLayout';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const MyProfile = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <>
            <Navbar />
            <Paper style={{ width: "80%", margin: "10% auto", padding: 20 }}>
                <Profile />
            </Paper>
        </>
    );
};

export default MyProfile;
