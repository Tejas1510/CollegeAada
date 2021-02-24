import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Chat from './doubt_plate';

// const useStyles = makeStyles({

// });

export default function Doubt(props) {
    return (
        <div>
            <Grid container>
                {/* <Grid item xs={2}>
                    <Paper className={classes.sideGrids}>item</Paper>
                </Grid> */}
                <Grid item>
                    <Chat></Chat>
                </Grid>
            </Grid>            
        </div>
    );
}