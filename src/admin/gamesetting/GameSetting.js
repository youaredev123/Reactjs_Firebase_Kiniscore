import React, { useEffect } from 'react';
import {
  makeStyles,
  Container,
  Typography,
  Switch,
  Box,
  Select,
  MenuItem,
  Divider,
  TextareaAutosize,
  Button
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
    width: '330px',
    // color: '#43425d',
  },
  input: {
    width: '330px',
    border: '1px solid',
    padding: '5px',
    borderRadius: '5px'
  },

  Select: {
    width: '105px'
  }
}));

export default function AdminGameSetting() {
  const classes = useStyles();

  const [defacult_setting, getDefaultSetting] = React.useState({ setting: [] })

  useEffect(() => {
    firebasedata.database().ref("gamepalysetting").on("value", async function(Data){
      await getDefaultSetting({ ...defacult_setting, setting: [...defacult_setting.setting, Data.val()] })
    })
  }, defacult_setting)

  const [alramToUsers, setAlramToUsers] = React.useState({ count: 0, alramContent: '' })

  const [gameplystate, setGameState] = React.useState(true)
  const [userpoint, setUserpoint] = React.useState(false)
  const [maxperlevel, setMaxPerlevel] = React.useState(2)
  const [totalexamnumL1L2, setTotalExamL1L2] = React.useState(10)
  const [passmarkL1L2, setPassMarkL1L2] = React.useState(10)
  const [timeallowedL1L2, setTimeAllowL1L2] = React.useState(10)

  const [totalexamads, setTotalExamAds] = React.useState(10)
  const [passmarkads, setPassMarkAds] = React.useState(10)
  const [timeallowedads, setTimeAllowAds] = React.useState(10)

  return (
    <div style={{ width: '100%' }}>
      <Container>
        <Typography component="h4" variant="h5">
          Game Round Settings
        </Typography>

        <div className={classes.root} style={{ paddingTop: '20px' }}>
          <div style={{ width: '50%' }}>
            <Box display="flex"  >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Start/Stop Game Round?
                </Typography>
              </Box>
              <Box >
                <Switch
                  value="gameplystate"
                  checked={gameplystate}
                  onChange={(e) => { 
                    setGameState(!gameplystate)
                    firebasedata.database().ref('gamepalysetting').update({
                      gameplystate: gameplystate
                    })
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Clear/Reset Users Current Points (Not highest points)
                </Typography>
              </Box>
              <Box >
                <Switch
                  value="userpoint"
                  checked={userpoint}
                  onChange={(e) => { 
                    setUserpoint(!userpoint)
                    firebasedata.database().ref('gamepalysetting').update({
                      userpoint: userpoint
                    })
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Max Retry Set per Level
                </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={maxperlevel}
                  onChange={(e) => { 
                    setMaxPerlevel(e.target.value) 
                    firebasedata.database().ref('gamepalysetting').update({
                      maxperlevel: e.target.value
                    })
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Questions To be Answered (Lv1 and Lv2)
                </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={totalexamnumL1L2}
                  onChange={(e) => {
                    setTotalExamL1L2(e.target.value) 
                    firebasedata.database().ref('gamepalysetting').update({
                      totalexamnumL1L2: e.target.value
                    })
                  }}
                >
                  <MenuItem value={10}>10 mins</MenuItem>
                  <MenuItem value={20}>20 mins</MenuItem>
                  <MenuItem value={30}>30 mins</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Pass Mark (Lv1 and Lv2)
                </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={passmarkL1L2}
                  onChange={(e) => { 
                    setPassMarkL1L2(e.target.value)
                    firebasedata.database().ref('gamepalysetting').update({
                      passmarkL1L2: e.target.value
                    })
                  }}
                >
                  <MenuItem value={10}>10 %</MenuItem>
                  <MenuItem value={20}>20 %</MenuItem>
                  <MenuItem value={30}>30 %</MenuItem>
                  <MenuItem value={40}>40 %</MenuItem>
                  <MenuItem value={50}>50 %</MenuItem>
                  <MenuItem value={60}>60 %</MenuItem>
                  <MenuItem value={70}>70 %</MenuItem>
                  <MenuItem value={80}>80 %</MenuItem>
                  <MenuItem value={90}>90 %</MenuItem>
                  <MenuItem value={100}>100 %</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Time Allowed (Lv1 and Lv2)(mins)
                </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={timeallowedL1L2}
                  onChange={(e) => { 
                    setTimeAllowL1L2(e.target.value) 
                    firebasedata.database().ref('gamepalysetting').update({
                      timeallowedL1L2: e.target.value
                    })
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </Box>
            </Box>
          </div>
        </div>
        <Divider style={{ marginTop: '30px' }} />

        <div className={classes.root} style={{ paddingTop: '20px' }}>
          <div style={{ width: '50%' }}>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Questions To be Answered (Advance levels)
              </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={totalexamads}
                  onChange={(e) => { 
                    setTotalExamAds(e.target.value) 
                    firebasedata.database().ref('gamepalysetting').update({
                      totalexamads: e.target.value
                    })
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Pass Mark (Advance levels)
              </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={passmarkads}
                  onChange={(e) => { 
                    setPassMarkAds(e.target.value)
                    firebasedata.database().ref('gamepalysetting').update({
                      passmarkads: e.target.value
                    })
                  }}
                >
                  <MenuItem value={10}>10 %</MenuItem>
                  <MenuItem value={20}>20 %</MenuItem>
                  <MenuItem value={30}>30 %</MenuItem>
                  <MenuItem value={40}>40 %</MenuItem>
                  <MenuItem value={50}>50 %</MenuItem>
                  <MenuItem value={60}>60 %</MenuItem>
                  <MenuItem value={70}>70 %</MenuItem>
                  <MenuItem value={80}>80 %</MenuItem>
                  <MenuItem value={90}>90 %</MenuItem>
                  <MenuItem value={100}>100 %</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="subtitle1">
                  Time Allowed (Advance levels)(mins)
              </Typography>
              </Box>
              <Box >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={timeallowedads}
                  onChange={(e) => { 
                    setTimeAllowAds(e.target.value) 
                    firebasedata.database().ref('gamepalysetting').update({
                      timeallowedads: e.target.value
                    })
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </Box>
            </Box>

            <Typography style={{ paddingTop: '30px' }} component="h4" variant="h5">
              Send Toast Message to Users
            </Typography>
            <div style={{ position: 'relative' }}>
              <TextareaAutosize
                className={classes.textareaStyle}
                type="text"
                rows={5}
                maxLength="160"
                value={alramToUsers.alramContent}
                onChange={e => {
                  e.preventDefault();
                  setAlramToUsers({
                    count: e.target.value.length,
                    alramContent: e.target.value
                  })
                }}
              />
              <div className={classes.textCountStyle}>
                <p>{alramToUsers.count} / {160 - alramToUsers.count}  Char</p>
              </div>
            </div>

            <Box display="flex" justifyContent="flex-end" mt={2} mb={2} >
              <Button 
                variant="contained" 
                className={classes.gameButton}
                onClick={(e) => {
                  firebasedata.database().ref('gamepalysetting').update({
                    alramUsers: alramToUsers.alramContent
                  })
                  setAlramToUsers({ count: 0, alramContent: ' ' })
                }}
              >Send Message</Button>
            </Box>

            <Box display="flex" >
              <Box flexGrow={1} >
                <Typography variant="h5">
                  Upload 650x500px ad
                </Typography>
              </Box>
              <Box >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
              </Box>
            </Box>

            <Box display="flex" style={{ paddingTop: '20px' }} >
              <Box flexGrow={1} >
                <Typography variant="h5">
                  Upload 720x90px ad
                </Typography>
              </Box>
              <Box >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={2} >
              <Button variant="contained" className={classes.gameButton}>Save Ads</Button>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
}
