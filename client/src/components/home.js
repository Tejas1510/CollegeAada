import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Question} from "./card";

const useStyles = makeStyles({
    mb: {
        marginBottom: "30px",
        width: "100%",
    }
});

const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric" 
};

export default function Home(props) {
    const [Data, setData] = useState([]);
    const questions = JSON.stringify(props.questions);
    useEffect(() => {
        let url = questions ? "http://localhost:5000?questions="+questions : "http://localhost:5000"; 
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.log(err));

    }, [props.questions, questions]);
    const classes = useStyles();
    return (
        <div className="pd">
            {Data.map(question => {
                return (
                    <Question key={question._id} id={question._id} question={question.title} description={question.description} date={new Date(question.timeStamp).toLocaleDateString("en-US", dateOptions)} no_comments={question.no_comments} author={question.author} className={classes.mb}></Question>
                );
            })}
        </div>
    );
}