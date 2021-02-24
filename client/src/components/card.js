import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
// import {Data} from './dummy_data';

const useStyles = makeStyles({
    justify: {
        textAlign: 'justify',
    }
});

export default function CardTemplate(props) {
    const classes = useStyles();
    return (
        <Card className={props.className}>
            <CardHeader avatar={<Avatar>D</Avatar>} title={props.author+"  ~  "+props.type} subheader="20 February 2021"></CardHeader>
            <CardContent>
                <p className={classes.justify}>{props.description}</p>
            </CardContent>
        </Card>
    )
}
