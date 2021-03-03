import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Card from "./card";
import {getSessionCookie} from "./session_manager";

const useStyles = makeStyles({
    button: {
        backgroundColor: "green",
        color: "white",
        "&:hover": {
            backgroundColor: "green",
            color: "white",
            opacity: "0.9"
        },
    },
    mb: {
        marginBottom: "15px",
        width: "100%",
    },
});

const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric" 
};

export default function Chat(props) {
    const session = getSessionCookie();
    const {questionId} = useParams();
    const classes = useStyles();
    const [input, setInput] = useState("");
    const [data, setData] = useState(undefined);
    const history = useHistory();
    useEffect(()=> {
        fetch("http://localhost:5000/question?id="+questionId)
        .then(response => response.json())
        .then(question => setData(question))
        .catch(err => console.log(err));
    }, [questionId]);

    function handleChange(event) {
        var value = event.target.value;
        setInput(value);
    }
    function handleClick() {
        if(!session) {
            history.push("/login");
        }
        else {
            var updatedData = data;
            var update = {
                author: session.name,
                comment: input,
                time: new Date()
            };
            updatedData.comments.push(update);
            updatedData.no_comments =updatedData.comments.length;
            fetch("http://localhost:5000/question", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(updatedData),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(response => response.json())
            .then(updated => {setData(updated); setInput("")})
            .catch(err => console.log(err));
        }
    }
    return (
        <div className="pd">
            {data && 
            <div>
                <Link href={"/questions/" + data._id} color="inherit"><Typography variant="h4" className={classes.mb}>{data.title}</Typography></Link>
                {console.log(data)}
                {data.description && <Card className={classes.mb} key={data._id} id={data._id} author={data.author} description={data.description} date={new Date(data.timeStamp).toLocaleDateString("en-US", dateOptions)} type="Question Description"></Card>}
                {data.comments.map((comment, index) => {
                    return <Card className={classes.mb} key={index} author={comment.author} description={comment.comment} date={new Date(comment.time).toLocaleDateString("en-US", dateOptions)} type="Answer"></Card>;
                })}
            </div>
            }            
            <form className="pd mt">
                <TextField variant="outlined" className={classes.mb} fullWidth multiline rowsMax={4} value={input} placeholder="Add your comment ..." onChange={handleChange}></TextField>
                <Button variant="contained" className={classes.button} onClick={handleClick}>Submit</Button>
            </form>
        </div>       
    );
}