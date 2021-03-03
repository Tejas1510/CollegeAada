import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {useHistory} from "react-router-dom";
import { getSessionCookie, setSessionCookie } from "./session_manager";

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

export default function SignUp(props) {
    const history = useHistory();
    const session = getSessionCookie();
    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Junior");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const classes = useStyles();

    useEffect(()=> {
        if(session) {
            history.goBack();
        }
    }, [history, session]);

    function nameChange(event) {
        setName(event.target.value);
    }
    function fullNameChange(event) {
        setFullName(event.target.value);
    }
    function typeChange(event) {
        setType(event.target.defaultValue);
    }
    function emailChange(event) {
        setEmail(event.target.value);
    }
    function passwordChange(event) {
        setPassword(event.target.value);
    }

    function handleClick() {
        fetch("http://localhost:5000/register", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: name,
                name: fullName,
                type: type,
                email: email,
                password: password,
                questions: [],
                answers: []
            })
        }).then(response => response.json())
        .then(info => info.msg)
        .then(data => {
            if(data === "User Registered") {
                fetch("http://localhost:5000/user?userName="+name)
                .then(response => response.json())
                .then(user => {setSessionCookie(user); history.goBack();})
                .catch(err => console.log(err));
            } else if(data === "This username already exists") {
                setError(data);
                setName("");
                setEmail("");
                setPassword("");
                setFullName("");
            }
        })
        .catch(err => setError(err));        
    }
    
    return (
        <div className={classes.div}>
            <FormControl>
                <Typography variant="h6" className={classes.mb30}>Sign Up</Typography>
                <TextField value={name} placeholder="UserName" variant="outlined" onChange={nameChange} className={classes.mb10}></TextField>
                <TextField value={fullName} placeholder="Full Name" variant="outlined" onChange={fullNameChange} className={classes.mb10}></TextField>
                <RadioGroup row name="type" defaultValue={type} onChange={typeChange} className={classes.mb10}>
                    <FormControlLabel value="Senior" control={<Radio color="primary" />} label="Senior"/>
                    <FormControlLabel value="Junior" control={<Radio color="primary" />} label="Junior"/>
                </RadioGroup>                
                <TextField type="email" value={email} placeholder="Email ID" variant="outlined" onChange={emailChange} className={classes.mb10}></TextField>
                <TextField type="password" value={password} placeholder="Password" variant="outlined" onChange={passwordChange} className={classes.mb10}></TextField>
                <Typography variant="body2" color="textSecondary" className={classes.mb10}>Have an account? <Link href="/login">Login</Link></Typography>
                <Button variant="contained" color="primary" onClick={handleClick} className={classes.mb10}>Sign Up</Button>
                <Typography variant="body2" color="error" className={classes.mb10}>{error}</Typography>
            </FormControl>
        </div>
    );
}