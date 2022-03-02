import React , { useEffect }from 'react';
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Box,
  TextareaAutosize,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel ,
  MenuItem ,
  Select
} from '@material-ui/core';

import { firebasedata } from '../../firebase/firebase'


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  item_row: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textareaStyle: {
    padding: '30px',
    height: '200px',
    width: '100%',
    overflow: 'hidden'
  },
  textCountStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingRight: '48px'
  },
  gameButton: {
    width: '335px',
    color: '#43425d',
  },
  input: {
    width: '330px',
    border: '1px solid',
    padding: '5px',
    borderRadius: '5px'
  },

  Select: {
    width: '105px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  }

}));

export default function AdminGameSetting() {
  const classes = useStyles();
  const [game_roundSetting, getDefaultSetting] = React.useState({ setting: [] })
  const [welcomemessagecount, setWelcomeMessageCount] = React.useState({ wlmessagecounter: 0, wlComeContent: '' })
  const [newstagemessagecount, setStageMessageCount] = React.useState({ newsatecounter: 0, newStageContent: '' })
  const [winnermessagecount, setWinnerMessageCount] = React.useState({ winmessagecounter: 0, winContent: '' })
  const [losermessagecount, setLoserMessageCount] = React.useState({ losermescounter: 0, loserContent: '' })
  const [sendusermessage, setSendUserMessageCount] = React.useState({ senduermesscounter: 0, senduserContent: '' })

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    firebasedata.database().ref("gameRoundSetting").on("value", async function(Data){
      await getDefaultSetting({ ...game_roundSetting, settingDetail: [...game_roundSetting.setting, Data.val()] })
      // console.log(game_roundSetting.setting)
    })
  }, [])

  const saveGameRound = (e) => {    
    firebasedata.database().ref('gameRoundSetting').update({
      welcomeMessage: welcomemessagecount.wlComeContent,
      newStageMessage: newstagemessagecount.newStageContent,
      winnerMessage: winnermessagecount.winContent,
      losermessagecount: losermessagecount.loserContent,
    })

    setWelcomeMessageCount({ wlmessagecounter: 0, wlComeContent: ''})
    setStageMessageCount({ newsatecounter: 0, newStageContent: ''})
    setWinnerMessageCount({ winmessagecounter: 0, winContent: ''})
    setLoserMessageCount({ losermescounter: 0, loserContent: ''})
  }

  return (
    <div style={{ width: '100%' }}>
      <Container>
        <Typography component="h4" variant="h5">
          Game Round Settings
        </Typography>

        <Grid
          container
          spacing={4}
        >
          <Grid
            lg={8}
            sm={6}
            xl={3}
            xs={12}
          >
            <Box>
              <Typography style={{ paddingTop: '30px' }} component="h4" variant="h5">
                Welcome Message
              </Typography>
              <div style={{ position: 'relative' }}>
                <TextareaAutosize
                  className={classes.textareaStyle}
                  type="text"
                  rows={5}
                  maxLength="160"
                  value={game_roundSetting.setting.welcomeMessage}
                  onChange={e => {
                    e.preventDefault();
                    setWelcomeMessageCount({
                      wlmessagecounter: e.target.value.length,
                      wlComeContent: e.target.value
                    })
                  }}
                />
                <div className={classes.textCountStyle}>
                  <p>{welcomemessagecount.wlmessagecounter} / {160 - welcomemessagecount.wlmessagecounter}  Char</p>
                </div>
              </div>
            </Box>

            <Box>
              <Typography style={{ paddingTop: '30px' }} component="h4" variant="h5">
                New Stage Message
              </Typography>
              <div style={{ position: 'relative' }}>
                <TextareaAutosize
                  className={classes.textareaStyle}
                  type="text"
                  rows={5}
                  maxLength="160"
                  onChange={e => {
                    e.preventDefault();
                    setStageMessageCount({
                      newsatecounter: e.target.value.length,
                      newStageContent: e.target.value
                    })
                  }}
                />
                <div className={classes.textCountStyle}>
                  <p>{newstagemessagecount.newsatecounter} / {160 - newstagemessagecount.newsatecounter}  Char</p>
                </div>
              </div>
            </Box>

            <Box>
              <Typography style={{ paddingTop: '30px' }} component="h4" variant="h5">
                Message To Winner
              </Typography>
              <div style={{ position: 'relative' }}>
                <TextareaAutosize
                  className={classes.textareaStyle}
                  type="text"
                  rows={5}
                  maxLength="160"
                  onChange={e => {
                    e.preventDefault();
                    setWinnerMessageCount({
                      winmessagecounter: e.target.value.length,
                      winContent: e.target.value
                    })
                  }}
                />
                <div className={classes.textCountStyle}>
                  <p>{winnermessagecount.winmessagecounter} / {160 - winnermessagecount.winmessagecounter}  Char</p>
                </div>
              </div>
            </Box>

            <Box>
              <Typography style={{ paddingTop: '30px' }} component="h4" variant="h5">
                Message To Loser
              </Typography>
              <div style={{ position: 'relative' }}>
                <TextareaAutosize
                  className={classes.textareaStyle}
                  type="text"
                  rows={5}
                  maxLength="160"
                  onChange={e => {
                    e.preventDefault();
                    setLoserMessageCount({
                      losermescounter: e.target.value.length,
                      loserContent: e.target.value
                    })
                  }}
                />
                <div className={classes.textCountStyle}>
                  <p>{losermessagecount.losermescounter} / {160 - losermessagecount.losermescounter}  Char</p>
                </div>
              </div>
            </Box>
            <Box display="flex" justifyContent="center" mt={2} >
              <Button 
                variant="contained" 
                className={classes.gameButton}
                onClick={saveGameRound}
              >Save Message</Button>
            </Box>
          </Grid>

          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <Box>
              <Typography style={{ paddingTop: '30px' }} component="h4" variant="h5">
                Send Message
              </Typography>
              <Card>
                <CardContent >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h5" component="h4">
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Typography variant="h5" component="h4">
                      Select Recipient
                    </Typography>
                  </Box>
                  
                  <div>
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={age}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          Active users, Inactive users, All users
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <Box display="flex" justifyContent="center" mt={2}>
                    <Typography variant="h5" component="h4">
                      Send Message
                    </Typography>
                  </Box>
                  <div style={{ position: 'relative' }}>
                    <TextareaAutosize
                      className={classes.textareaStyle}
                      type="text"
                      rows={5}
                      maxLength="160"
                      onChange={e => {
                        e.preventDefault();
                        setSendUserMessageCount({
                          senduermesscounter: e.target.value.length,
                          senduserContent: e.target.value
                        })
                      }}
                    />
                    <div className={classes.textCountStyle}>
                      <p>{sendusermessage.senduermesscounter} / {160 - sendusermessage.senduermesscounter}  Char</p>
                    </div>
                  </div>

                </CardContent>
                  <Box display="flex" justifyContent="center" mt={1} p={2}>
                    <Button variant="contained" className={classes.gameButton}>Send Message</Button>
                  </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
