import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent
} from '@material-ui/core';

import { firebasedata } from '../../firebase/firebase'

import img2 from "../../assets/invite.jpg";
import winner from "../../assets/winner.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  welcomemessage: {
    textAlign: 'center',
    color: '#565f4c'
  },
  media: {
    width: '100%'
  },
}));

function InviteFriend(props) {
  const classes = useStyles()
  const [notification, getNotification] = useState({ title: [] })
  const [gameround, getRoundData] = useState({ title: [] })

  useEffect((e) => {
    firebasedata.database().ref('gamepalysetting').on("value", async snap => {
      await getNotification({ ...notification, title: [...notification.title, snap.val()] })
    })
    firebasedata.database().ref('gameRoundSetting').on("value", async snap => {
      await getRoundData({ ...gameround, title: [...gameround.title, snap.val()] })
    })
  },[])


  return (
    <div style={{ marginTop: '45px' }}>
      {
        notification.title.length > 0 && gameround.title.length > 0 && (
        <>
          <Box justifyContent="center" mb={2} p={1} >
            <Box p={1} className={classes.welcomemessage}>
              <Typography variant="h5" >
                Alram to Players !
              </Typography>
            </Box>
            <Card >
              <CardActionArea>
                <img key={"img2"} className={classes.media} src={img2} alt="logo" />
              </CardActionArea>
              <CardContent >
                <div style={{ width: '100%' }}>
                  <Typography gutterBottom variant="subtitle2" >
                    {
                      notification.title[0].alramUsers
                    }
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Box>
          {
            props.loginUserData[0].winningID !== '' && (
            <Box justifyContent="center" mb={10} p={1} >
              <Box p={1} className={classes.welcomemessage}>
                <Typography variant="h5" >
                  You Win !
                </Typography>
              </Box>
              <Card >
                <CardActionArea>
                  <img key={"img2"} className={classes.media} src={winner} alt="logo" />
                </CardActionArea>
                <CardContent >
                  <div style={{ width: '100%' }}>
                    <Typography gutterBottom variant="subtitle2" >
                      {
                        gameround.title[0].winnerMessage
                      }
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Box>)
          }
        </>
        )
      }
      <div className="root" />
    </div>
  );
}

export default (InviteFriend)