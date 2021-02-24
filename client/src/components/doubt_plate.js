import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Data} from './dummy_data';
import Card from './card';

const useStyles = makeStyles({
    button: {
        backgroundColor: "green",
        color: "white",
        '&:hover': {
            backgroundColor: "green",
            color: "white",
            opacity: "0.9"
        },
    },
    mb: {
        marginBottom: "30px",
    },
});

export default function Chat(props) {
    const classes = useStyles();
    const [input, setInput] = useState("");
    const [data, setData] = useState(Data.questions);
    function handleChange(event) {
        var value = event.target.value;
        setInput(value);
    }
    function handleClick() {
        var updatedData = data;
        var update = {
            author: "XXX",
            comment: input
        };
        updatedData[0].comments.push(update);
        setInput("");
        setData(updatedData);
    }
    return (
        <div className="pd">
            {data.map((question, index) => {
                return (
                    <div key={index}>
                        <h2>{question.title}</h2>
                        <Card className={classes.mb} key={question._id} author={question.author} description={question.description} type="Question Description"></Card>
                        {question.comments.map((comment, index) => {
                            return <Card className={classes.mb} key={index} author={comment.author} description={comment.comment} type="Answer"></Card>;
                        })}                    
                    </div>
                );
            })}
            <form className="pd mt">
                <TextField variant="filled" className={classes.mb} fullWidth multiline rowsMax={4} value={input} placeholder="Add your comment ..." onChange={handleChange}></TextField>
                <Button variant="contained" className={classes.button} onClick={handleClick}>Submit</Button>
            </form>
        </div>       
    );
}