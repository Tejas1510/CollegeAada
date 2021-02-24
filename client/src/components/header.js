import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    AppHeader: {
        backgroundColor: "#ffab73",
        display: "flex",
        flexDirection: "column",
        color: "white",
    }
}); 

export default function Header(props) {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.AppHeader}>
            <Toolbar>
                <Avatar className="margin">C</Avatar>
                <h1>CollegeAada</h1>
            </Toolbar>
        </AppBar>      
    )
}