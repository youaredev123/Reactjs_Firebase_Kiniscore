import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';

const useStyles = makeStyles(({
  progress: {
    color: '#5fdc5d'
  },
  progressContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}));

const themebtn = createMuiTheme({
  palette: {
    primary: green,
  },
});

function CircularLoading() {
  const classes = useStyles();

  return (
    <div className={classes.progressContainer}>
      <ThemeProvider theme={themebtn}>
        <CircularProgress size={100} className={classes.progress} />
      </ThemeProvider>
    </div>
  );
}

export default CircularLoading;
