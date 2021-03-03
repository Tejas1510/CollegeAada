import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import {getSessionCookie, setSessionCookie} from "./session_manager";

const useStyles = makeStyles({
    div: {
        textAlign: "center",
        width: "100%",
        marginTop: "50px",
        marginBottom: "100px"
    },
    mb30: {
        marginBottom: "30px",
    },
    mb10: {
        marginBottom: "10px",
    }
});

export default function Login(props) {
    const history = useHistory();
    const session = getSessionCookie();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const classes = useStyles();

    useEffect(()=> {
        if(session) {
            history.goBack();
        }
    }, [history, session]);

    function nameChange(event) {
        setName(event.target.value);
        setError("");
    }
    function passwordChange(event) {
        setPassword(event.target.value);
        setError("");
    }

    function handleClick() {
        fetch("http://localhost:5000/login?userName="+name+"&password="+password)
        .then(response => response.json())
        .then(info => info.msg)
        .then(data => {
            if(data === "User present") {
                fetch("http://localhost:5000/user?userName="+name)
                .then(response => response.json())
                .then(userData => {setSessionCookie(userData); history.goBack();})
                .catch(err => console.log(err));                
                setError("");
            } else {
                setError(data);
                setName("");
                setPassword("");
            }
        })
        .catch(err => setError(err));        
    }
    
    return (
        <div className={classes.div}>
            <FormControl variant="filled">
                <Typography variant="h6" className={classes.mb30}>Login</Typography>
                <TextField value={name} placeholder="UserName" variant="outlined" className={classes.mb10} onChange={nameChange}></TextField>
                <TextField type="password" value={password} placeholder="Password" variant="outlined" className={classes.mb10} onChange={passwordChange}></TextField>
                <Typography variant="body2" color="textSecondary" className={classes.mb10}>Don't have an account? <Link href="/signup">SignUp</Link></Typography>
                <Button variant="contained" color="primary" onClick={handleClick} className={classes.mb10}>Login</Button>
                <Typography variant="body2" color="error" className={classes.mb10}>{error}</Typography>
            </FormControl>
        </div>
    );
}