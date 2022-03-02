import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Button,
  createMuiTheme,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import result_ok from '../../assets/ok.png';
import result_no from '../../assets/no.png';

import { connect } from 'react-redux';
import { firebasedata } from '../../firebase/firebase'

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const mapStateToProps = state => ({
  ...state
})


function GameResult(props) {
  const history = useHistory()
  const [dense, setDense] = useState(false)
  const [expire, setDialog] = useState(false)

  const correntAnswernum = props.gameResultScore.filter(value => value.result)
  const total_score = Math.floor(correntAnswernum.length / props.total_exam_count * 100)

  // console.log(props.playCount)
  // console.log(props.gameSetting[0].passmarkL1L2)

  const currentPlyNum = props.playCount
  return (
    <div >
      <h2 style={{ textAlign: "center" }}>
        Your Level 1 Score is {total_score} %
      </h2>
      <MuiThemeProvider theme={theme}>
        <div style={{ height: "100%", overflowY: "auto" }} >
          <List dense={dense}>
            {
              props.gameResultScore.map((value, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText primary={(index + 1) + ". " + value.question} style={{ marginLeft: "20px", textIndent: "-20px" }} />
                    <Avatar alt="" src={value.result ? result_ok : result_no} />
                  </ListItem>
                )
              })
            }
          </List>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "80px" }}>
          {
            total_score > props.gameSetting[0].passmarkL1L2 ? 
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ color: 'white' }}
                  onClick={(e) => history.push('/gameadsview')}
                >
                  Next Level &nbsp;&nbsp;>>>
                  </Button> 
                </>:
                <>
                {
                  currentPlyNum > props.gameSetting[0].maxperlevel ?
                    <Dialog aria-labelledby="simple-dialog-title" disableBackdropClick={true} open={true}>
                      <DialogTitle id="simple-dialog-title">You are expired !</DialogTitle>

                      <Button
                        color="primary"
                        onClick={(e) => history.push('/home')}
                      >
                        Sorry, Please Wait a day !
                      </Button>
                    </Dialog>
                    :
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: 'white' }}
                        onClick={(e) => {
                          history.push('/gameadsview')
                          props.setPlayCount(currentPlyNum + 1)
                        }}
                      >
                        Try Again &nbsp;&nbsp;>>>
                      </Button>
                    </>
                }
              </>
          }
        </div>
      </MuiThemeProvider>
      <div className="root" />
    </div>
  );
}

export default connect(mapStateToProps)(GameResult);