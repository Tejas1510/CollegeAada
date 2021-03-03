import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Home from "./home";
import MyQuestions from "./my_questions";
import Question from "./question";
import Login from "./login";
import SignUp from "./signup";
import AddQuestion from "./add_question";
import {getSessionCookie} from "./session_manager";

const useStyles = makeStyles({
    marginBottom: {
        marginBottom: "70px",
    }
});

export default function Doubt(props) {
    const [expanded, setExpanded] = useState(window.innerWidth>899 ? true : false);
    const classes = useStyles();
    const session = getSessionCookie();

    window.addEventListener("resize", () => {
        setExpanded(window.innerWidth>899 ? true : false);
    });

    return (        
        <Router>
            <Switch>
                <Route path="/login"><Login></Login></Route>
                <Route path="/signup"><SignUp></SignUp></Route>
                <Route path="/questions/:questionId">
                    <div className={classes.marginBottom}>
                        <Grid container>
                            <Grid item xs={expanded ? 9 : 12}>
                                <Question></Question>
                            </Grid>
                            <Grid item xs={3}>
                                {expanded && (
                                    <MyQuestions></MyQuestions>
                                )}
                            </Grid>
                        </Grid>            
                    </div>
                </Route>
                <Route exact path="/my-questions">
                    <div className={classes.marginBottom}>
                        <Grid container>
                            <Grid item xs={expanded ? 9 : 12}>
                                <Home questions={session && session.questions}></Home>
                            </Grid>
                            <Grid item xs={3}>
                                {expanded && (
                                    <MyQuestions></MyQuestions>
                                )}
                            </Grid>
                        </Grid>            
                    </div>
                </Route>
                <Route path="/add-question">
                    <div className={classes.marginBottom}>
                        <Grid container>
                            <Grid item xs={expanded ? 9 : 12}>
                                <AddQuestion></AddQuestion>
                            </Grid>
                            <Grid item xs={3}>
                                {expanded && (
                                    <MyQuestions></MyQuestions>
                                )}
                            </Grid>
                        </Grid>            
                    </div>
                </Route>
                <Route exact path="/">
                    <div className={classes.marginBottom}>
                        <Grid container>
                            <Grid item xs={expanded ? 9 : 12}>
                                <Home></Home>
                            </Grid>
                            <Grid item xs={3}>
                                {expanded && (
                                    <MyQuestions></MyQuestions>
                                )}
                            </Grid>
                        </Grid>            
                    </div>
                </Route>
                <Route path="*"><h1>404 Not Found</h1></Route>
            </Switch>      
        </Router>
        
    );
}