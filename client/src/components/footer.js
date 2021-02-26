import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
 
const useStyles = makeStyles({
    footer: {
        backgroundColor: "#ffab73",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
    },
});

export default function Footer(props) {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.footer}>
            <Toolbar>
                <p>© CollegeAada</p>
            </Toolbar>
        </AppBar>   
    );
}