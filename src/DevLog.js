import { Link as RouterLink } from "react-router-dom";
import React, { Fragment } from "react";
import { Button, CssBaseline, Paper, Typography,Box } from "@material-ui/core";
import { devlogdata } from "./devlogdata";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        "background-color":"grey",
        margin: theme.spacing(1),
    }
}));

export default function DevLog() {
    const classes = useStyles();
    document.getElementById("root").style.overflow = "auto";
    document.getElementById("main").style.display = "none";
    return (
        <Fragment>
            <CssBaseline />
            <Button 
                variant="contained" 
                color="primary" 
                component={RouterLink} 
                to="/">Go Back Home
            </Button>
            {devlogdata.map((section) => {
            return (
                <Fragment>
                    <Paper className={classes.paper} elevation={5}>
                        <Box p={1}>
                            <Typography variant="h6">{section.title}</Typography>
                            <Typography variant="subtitle1">{section.content}</Typography>
                        </Box>
                    </Paper>
                </Fragment>
            );
            })}
        </Fragment>
    );
}