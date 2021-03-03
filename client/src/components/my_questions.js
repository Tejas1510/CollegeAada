import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";
import {getSessionCookie, removeCookie} from "./session_manager";

const useStyles = makeStyles({
    mb: {
        marginBottom: "20px",
    },
    alignCenter: {
        textAlign: "center",
        width: "100%",
        marginBottom: "50px"
    },
    avatar: {
        margin: "0 auto",
        backgroundColor: "#ffab73"
    }
});

export default function MyQuestions(props) {
    const [session, setSession] = useState(getSessionCookie());
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        removeCookie();
        setSession(getSessionCookie());
        history.push("/");
    }
    
    if(session) {
        return (
            <div className="pd border-left">
                <div className={classes.alignCenter}>
                    <Avatar className={classes.avatar}></Avatar>           
                    <Typography variant="h6">{session.name}</Typography>
                    <Typography variant="body1" color="textSecondary">@{session._id}</Typography>
                </div>
                <Link href="/my-questions" color="inherit"><Typography variant="h6" className={classes.mb}>My Questions</Typography></Link>
                <Link href="/add-question" color="inherit"><Typography variant="h6" className={classes.mb}>Ask your question</Typography></Link>
                <Button variant="contained" color="primary" onClick={handleClick}>Log Out</Button>
            </div>
        );
    } else {
        return (
            <div className="pd border-left">
                <form className="pd">
                    <Link href="/login"><Typography variant="h6" className={classes.mb}>Login/SignUp</Typography></Link>
                </form>
            </div>          
        );
    }    
}