import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Box,
  createMuiTheme,
  Grid,
} from '@material-ui/core';

import { firebasedata } from '../../firebase/firebase'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RoomIcon from '@material-ui/icons/Room';
import WidgetsIcon from '@material-ui/icons/Widgets';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import StarsIcon from '@material-ui/icons/Stars';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  welcomemessage: {
    textAlign: 'center',
    color: '#565f4c'
  },
  homeBtn: {
    color: 'white',
    height: '100px'
  },
  btn_content: {
    textAlign: 'center',
    padding: '5px 10px 0px 10px',
    color: 'white',
  },
  btn_icon: {
    width: '80%',
    height: '10%',
    color: 'rgb(255, 255, 255)'
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

function Home(props) {
  const itemRef = useRef(null);
  const classes = useStyles()
  const history = useHistory()
  const [width, setWidth] = useState(window.innerWidth)

  const [playRoundSetting, getRoundSetting] = useState({ setting: [] })

  useEffect(() => {
    firebasedata.database().ref("gameRoundSetting").on("value", async function(Data){
      await getRoundSetting({ ...playRoundSetting, setting: [...playRoundSetting.setting, Data.val()] })
    })
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div style={{ marginTop: '45px' }} ref={itemRef}>
      {
        playRoundSetting.setting.length > 0 &&  (
        <>
          <Box display="flex" justifyContent="center" m={1} p={1} >
            <Paper m={1} p={1}>
              <Box p={1} className={classes.welcomemessage}>
                <Typography variant="h6" >
                  {playRoundSetting.setting[0].welcomeMessage}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Box display="flex" justifyContent="center" mb={4}>
            <Grid container>
              <Grid item xs={4}>
                <Box
                  style={{ backgroundColor: '#ad87f9', height: `${width / 3}px`, width: `${width / 3}px` }}
                  disabled={(props.loginUserData[0].level) >= 1 ? false : true}
                  onClick={(e) => {
                    history.push("/invitefriend")
                    props.setTitle("Invite Friend!")
                  }}
                >
                  <div className={classes.btn_content}>
                    <StarsIcon className={classes.btn_icon} />
                    <Typography variant="subtitle2" style={{color: "white"}}>
                      Favorites
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  style={{ backgroundColor: '#39dac7', color: 'red', height: `${width / 3}px`, width: `${width / 3}px` }}
                  disabled={(props.loginUserData[0].level) >= 1 ? false : true}
                  onClick={(e) => {
                    history.push("/leaderboard")
                    props.setTitle("LeaderBoard")
                  }}
                >
                  <div className={classes.btn_content}>
                    <RoomIcon className={classes.btn_icon} />
                    <Typography variant="subtitle2" style={{color: "white"}}>
                      LeaderBoard
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  style={{ backgroundColor: '#ff6664', color: 'red', height: `${width / 3}px`, width: `${width / 3}px` }}
                  disabled={(props.loginUserData[0].level) >= 1 ? false : true}
                  onClick={(e) => {
                    history.push("/userstats")
                    props.setTitle("Statistics ")
                  }}
                >
                  <div className={classes.btn_content}>
                    <EqualizerIcon className={classes.btn_icon} />
                    <Typography variant="subtitle2" style={{color: "white"}}>
                      Statistics  
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  style={{ backgroundColor: '#10ca6c', color: 'red', height: `${width / 3}px`, width: `${width / 3}px` }}
                  disabled={(props.loginUserData[0].level) >= 1 ? false : true}
                  onClick={(e) => {
                    history.push("/gamehome")
                    props.setTitle("Selct Level")
                  }}
                >
                  <div className={classes.btn_content}>
                    <SportsEsportsIcon className={classes.btn_icon} />
                    <Typography variant="subtitle2" style={{color: "white"}}>
                      Play Game
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  style={{ backgroundColor: '#1888e8', color: 'red', height: `${width / 3}px`, width: `${width / 3}px` }}
                  disabled={(props.loginUserData[0].level) >= 1 ? false : true}
                  onClick={(e) => {
                    history.push("/notification")
                    props.setTitle("Notification")
                  }}
                >
                  <div className={classes.btn_content}>
                    <NotificationsActiveIcon className={classes.btn_icon} />
                    <Typography variant="subtitle2" style={{color: "white"}}>
                      Notification
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  style={{ backgroundColor: '#ffc132', color: 'red', height: `${width / 3}px`, width: `${width / 3}px` }}
                  disabled={(props.loginUserData[0].level) >= 1 ? false : true}
                  onClick={(e) => {
                    history.push("/profile")
                    props.setTitle("Profile")
                  }}
                >
                  <div className={classes.btn_content}>
                    <AssignmentIndIcon className={classes.btn_icon} />
                    <Typography variant="subtitle2" style={{color: "white"}}>
                      My Profile
                    </Typography>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
        )
      }
      <div className="root" />
    </div>
  );
}

export default connect(mapStateToProps)(Home)