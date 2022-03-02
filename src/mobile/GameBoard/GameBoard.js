import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Grid,
  createMuiTheme,
  Typography,
  Box,
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import { green } from '@material-ui/core/colors';
import { ThemeProvider } from "@material-ui/core/styles";

import { firebasedata } from '../../firebase/firebase'

import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";

import loading from '../loading'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  questionParagraph: {
    font: "-webkit-control",
    fontWeight: "bold",
    fontSize: "17px",
    marginBottom: "0px",
    overflowX: "auto",
    overflowY: "hidden",
    marginTop: "0px",
    textAlign: "center"
  },
  questionImageWrapper: {
    width: "100%",
    padding: "10px 0",
    textAlign: "center"
  },
  questionImage: {
    width: "130px",
    height: "130px",
    border: "1px solid grey",
    margin: "5px",
    borderRadius: "5px"
  },
  adsImage: {
    width: "100%",
    height: "100%",
    border: "1px solid grey",
    margin: "5px",
    borderRadius: "5px",
    overflowY: "none"
  },
  answerTypography: {
    fontSize: "15px",
    display: "inline-block",
    cursor: "pointer"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


const GameDashboard = props => {
  const classes = useStyles()

  const history = useHistory()
  const [firebaseexam, getAllGameExam] = useState({ examData: [] })
  const [state, setState] = useState({ resultarray: [] })
  const [totalexam, setTotalExam] = useState(0)
  const [currentExamNum, setCurrentExamNum] = useState(0)
  const [totalscore, setTotalScore] = useState(0)
  const [examTime, setTime] = useState()
  const [value, setSelected] = useState('')
  const [dialogflag, setDialog] = useState(false)

  const [loading_flag, setLoading] = useState(true)

  const [timeSetting, setTimeSetting] = useState(props.gameSetting[0].timeallowedL1L2)

  const format = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }


  useEffect(() => {
    firebasedata.database().ref(props.currentlvl).once('value').then(function (snapshot) {
      let exam_array = []
      snapshot.forEach(function (snapshot1) {
        // console.log(snapshot1.val())
        exam_array.push(snapshot1.val())
      });
      getAllGameExam({ ...firebaseexam, examData: [...firebaseexam.examData, exam_array] })
      setTotalExam(exam_array.length)
      props.examCounter(exam_array.length)
      setLoading(false)
    })
  }, [])
  
  useEffect(() => {
    let timer = null
    if(timeSetting != 0) {
      timer = setInterval(() => {
        setTimeSetting(timeSetting => timeSetting - 1)
      }, 1000);
    }else{
      setDialog(true)
    }
    return () => clearInterval(timer)    
  }, [timeSetting])

  const nextGame = (e) => {

    if (value == firebaseexam.examData[0][currentExamNum].correct) {
      const obj = { "question": firebaseexam.examData[0][currentExamNum].question, "result": true }
      setState({ ...state, resultarray: [...state.resultarray, obj] })
      setTotalScore(totalscore + 1)
    } else {
      const obj = { "question": firebaseexam.examData[0][currentExamNum].question, "result": false }
      setState({ ...state, resultarray: [...state.resultarray, obj] });
    }

    if (currentExamNum == (totalexam - 1)) {
      setDialog(true)
    } else {
      setCurrentExamNum(currentExamNum + 1)
    }
  }

  const getResult = async (e) => {
    await props.gameScore(state.resultarray)
    let currentLevel;
    let currentScore;
    let highcurrentScore;
    let userscoreflage;
    const total_score = Math.floor(firebaseexam.examData[0].length / totalscore.length * 100)

    // console.log(totalscore)

    if (total_score > 50) {
      currentLevel = props.loginUserData[0].level + 1
    } else {
      currentLevel = props.loginUserData[0].level
    }

    if (props.loginUserData[0].score < totalscore * 0.5) {
      currentScore = totalscore * 0.5
      userscoreflage = true
      // console.log(currentScore)
    } else {
      currentScore = props.loginUserData[0].userscore
      userscoreflage = false
      // console.log(currentScore)
    }

    if (totalscore * 0.5 < props.TopUser) {
      highcurrentScore = props.loginUserData[0].highestScore
    } else {
      highcurrentScore = totalscore * 0.5
      // console.log(highcurrentScore)
    }

    await firebasedata.database().ref('userlist/' + props.loginUserData[0].userid).update({
      highestScore: highcurrentScore,
      level: currentLevel,
      score: currentScore,
      userstate: userscoreflage
    });
    history.push('/gameresult')
  }

  // console.log(firebaseexam.examData[0])
  return (
    <div >
      {
        loading_flag === false ?
          <>
            {
              firebaseexam.examData.length > 0 && (
                <>
                  <Grid container style={{ padding: "10px", fontSize: '13px' }}>
                    <Grid item xs={4}>
                      <div style={{ textAlign: "left" }}>H.Score: {props.TopUser}pts</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ textAlign: "center" }}>{format(timeSetting)}</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ textAlign: "right" }}>KiniScore: {props.loginUserData[0].userscore} pts</div>
                    </Grid>
                  </Grid>
                  <Box display="flex" justifyContent="flex-end" mr={2}>
                    <div style={{ textAlign: "right" }}>Level: {props.loginUserData[0].level}</div>
                  </Box>

                  <Grid>
                    <div >
                      <Box display="flex" justifyContent="flex-end" m={1}>
                        {currentExamNum + 1}/{totalexam}
                      </Box>
                      <div>
                        <div className={classes.questionParagraph}>Question</div>
                        <Box display="flex" justifyContent="center" m={1}>
                          <Typography variant="subtitle1" >
                            {firebaseexam.examData[0][currentExamNum].question}
                          </Typography>
                        </Box>
                      </div>
                      <div className={classes.questionImageWrapper}>
                        <img key={"img1"} src={img1} className={classes.questionImage} alt="logo" />
                        <img key={"img2"} src={img2} className={classes.questionImage} alt="logo" />
                      </div>
                    </div>
                  </Grid>

                  <Grid >
                    <Box style={{ marginLeft: '30%' }}>
                      <FormControl>
                        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e) => { setSelected(e.target.value) }}>
                          {
                            firebaseexam.examData[0][currentExamNum].answers.map((data, index) => {
                              return (
                                <FormControlLabel key={index} value={data} control={<Radio />} label={data} />
                              )
                            })
                          }
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={2} mb={8}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: 'white' }}
                          onClick={nextGame}
                        >
                          Next Question
                    </Button>
                      </ThemeProvider>
                    </Box>
                  </Grid>

                  <Dialog onClose={(e) => { setDialog(false) }} aria-labelledby="simple-dialog-title" disableBackdropClick={true} open={dialogflag}>
                    <DialogTitle id="simple-dialog-title">Game Over</DialogTitle>

                    <Button
                      color="primary"
                      onClick={getResult}
                    >
                      Your Score
                </Button>
                  </Dialog>

                  <div className="root" />
                </>
              )
            }
          </> : null

      }
    </div>
  );
}

export default GameDashboard;