import React from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Box,
  Button,
  createMuiTheme,
  ThemeProvider,
  MuiThemeProvider
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import img2 from "../../assets/ads_logo.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  welcomemessage: {
    textAlign: 'center',
    color: '#565f4c'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const mapStateToProps = state => ({
  ...state
})

function GamdADS(props) {
  const classes = useStyles()
  const history = useHistory()
  // console.log(props.loginUserData[0].level)

  return (
    <div style={{ marginTop: '45px' }}>
      <>
        <Box display="flex" justifyContent="center" m={1} p={1} >
          <Paper m={1} p={1}>
            <Box p={1} className={classes.welcomemessage}>
              <Typography variant="h5" >
                This Educational Game is Courtesy of XBCD Limited.
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box display="flex" justifyContent="center" mt={2} p={1} >
          <Box p={1} className={classes.welcomemessage}>
            <img key={"img2"} src={img2} className={classes.adsImage} alt="logo" />
            <Typography variant="subtitle1" >
              You must share on FaceBook or Twitter using #XBCD
            </Typography>
          </Box>
        </Box>
        <Box mb={8}>
          <MuiThemeProvider theme={theme}>
            <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ color: 'white' }}
                onClick={(e) => {
                  history.push('/home')
                  props.setTitle("HOME")
                }}
              >
                Next Challenge&nbsp;&nbsp;&nbsp;&nbsp;>>>
              </Button>
            </div>
          </MuiThemeProvider>
        </Box>
      </>
      <div className="root" />
    </div>
  );
}

export default connect(mapStateToProps)(GamdADS)