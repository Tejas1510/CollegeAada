import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import MyQuestion from "./my_questions";

const useStyles = makeStyles({
    AppHeader: {
        backgroundColor: "#ffab73",
        color: "white"
    }, 
    menu: {
        marginLeft: "20px",
        flex: "1"
    }
}); 

export default function Header(props) {
    const [expanded, setExpanded] = useState(window.innerWidth>899 ? true : false);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    window.addEventListener("resize", () => {
        setExpanded(window.innerWidth>899 ? true : false);
    });

    function openDrawer(state) {
        setOpen(state);
    }

    return (
        <div>
            <AppBar position="static" className={classes.AppHeader}>
                <Toolbar>
                    <Avatar className="margin">C</Avatar>
                    <h1>CollegeAada</h1>
                    {!expanded && (
                        <>
                            <IconButton edge="end" color="inherit" onClick={() => {openDrawer(!open)}} className={classes.menu}>
                                {!open && <MenuIcon fontSize="large"></MenuIcon>}
                                {open && <CloseIcon fontSize="large"></CloseIcon>}
                            </IconButton>
                        </>
                    )}
                </Toolbar>
                {(open&&!expanded) && (
                    <div className="drawer">                        
                        <MyQuestion></MyQuestion>
                    </div>
                )}
            </AppBar>
        </div>              
    );
}