import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  CardActions
} from '@material-ui/core';

import img2 from "../../assets/invite.jpg";

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


const mapStateToProps = state => ({
  ...state
})

function InviteFriend(props) {
  const classes = useStyles()
  const history = useHistory()
  const [friendEmail, setFriendMail ] = useState('')
  const [REACT_APP_EMAILJS_USERID, setEmailAPi] = useState('user_cvAEiBKKfGUyUuKua5blR')
  const [TemplateID, setTemplateID] = useState('template_oBltL07C')

  const sendMail = (e) => {
    // console.log( window.emailjs )
  }

  return (
    <div style={{ marginTop: '45px' }}>
      <>
        <Box justifyContent="center" mb={10} p={1} >
          <Box p={1} className={classes.welcomemessage}>
            <Typography variant="h5" >
              Invite your friend to this Game !!!
            </Typography>
          </Box>
          <Card >
            <CardActionArea>
              <img key={"img2"} className={classes.media} src={img2} alt="logo" />
            </CardActionArea>
            <CardContent >
              <div style={{ width: '100%' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Friend Email
                </Typography>
                <TextField
                  value={friendEmail}
                  fullWidth
                  label="Friend Email"
                  id="outlined-size-normal"
                  variant="outlined"
                  onChange={(e) => {
                    setFriendMail(e.target.value)
                  }}
                />
              </div>
            </CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <CardActions>
                <Button 
                  size="small"
                  variant="outlined" 
                  color="primary"
                  onClick={(e) => sendMail() }
                >
                  Invite Now
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </>
      <div className="root" />
    </div>
  );
}

export default (InviteFriend)