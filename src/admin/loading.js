import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(({
  progress: {
    color:" #5fdc5d"
  },
  // .MuiCircularProgress-colorPrimary {
  //   color: #5fdc5d;
  // }
  progressContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}));

function CircularLoading() {
  const classes = useStyles();

  return (
    // <MuiThemeProvider >
      <div className={classes.progressContainer}>
        <CircularProgress size={100} className={classes.progress} />
      </div>
    // </MuiThemeProvider>
  );
}

export default CircularLoading;
