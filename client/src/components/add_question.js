import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getSessionCookie, setSessionCookie} from "./session_manager";

const useStyles = makeStyles({
    mb: {
        marginBottom: "20px",
        width: "100%"
    },
    button: {
        marginBottom: "40px"
    }
});

export default function AddQuestion(props) {
    const session = getSessionCookie();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(""); 
    const [userName, setUserName] = useState(""); 
    const [error, setError] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if(!session) {
            history.push("/login");
        } else {
            setUserId(session._id);
            setUserName(session.name);
        }
    }, [session, history]);

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }
    function handleClick() {
        fetch("http://localhost:5000/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({author: userName, title: title, description: description})
        }).then(response => response.json())
        .then(data => {
            if(data.msg) {
                setError(data.msg);
            } else {
                var questions = session.questions;
                questions.push(data._id);
                fetch("http://localhost:5000/user", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({questions: questions, userId: userId})
                }).then(response => response.json())
                .then(user => {
                    if(user.msg) {
                        setError(user.msg);
                    } else {
                        setSessionCookie(user);
                        history.push("/questions/"+data._id);
                    }
                })
                .catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    }
    return (
        <div className="pd">
            <Typography variant="h4" className={classes.button}>Ask a Question</Typography>
            <TextField value={title} placeholder="Title" variant="outlined" className={classes.mb} onChange={handleTitleChange}></TextField><br />
            <TextField value={description} placeholder="Description (if any)" multiline rowsMax={4} variant="outlined" className={classes.mb} onChange={handleDescriptionChange}></TextField><br />
            <Button color="primary" variant="contained" onClick={handleClick} className={classes.button}>Add</Button>
            <Typography variant="body1" color="error">{error}</Typography>
        </div>
    )
}