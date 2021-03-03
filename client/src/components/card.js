import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    justify: {
        textAlign: 'justify',
    }
});

function Question(props) {
    return (
        <Card className={props.className}>
            <CardHeader title={<Link href={"/questions/"+ props.id} color="inherit">{props.question}</Link>} subheader={"- asked by "+props.author}></CardHeader>
            <CardContent>
                <Typography variant="body2" color="textSecondary">added on {props.date} ({props.no_comments} Answers)</Typography>
            </CardContent>
        </Card>
    );
}

export default function CardTemplate(props) {
    const classes = useStyles();
    return (
        <Card className={props.className}>
            <CardHeader avatar={<Avatar>D</Avatar>} title={props.author+"  ~  "+props.type} subheader={props.date}></CardHeader>
            <CardContent>
                <Typography variant="body1" className={classes.justify}>{props.description}</Typography>
            </CardContent>
        </Card>
    )
}

export {Question};