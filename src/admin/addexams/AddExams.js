import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { firebasedata } from '../../firebase/firebase'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid
} from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Loading from '../loading'

const useStyles = makeStyles((theme) => ({
  card_root: {
    display: 'flex',
  },
  card_details: {
    display: 'flex',
    flexDirection: 'column',
  },
  card_content: {
    flex: '1 0 auto',
  },
  card_cover: {
    width: 151,
  },
  card_controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  card_arrowbar: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontSize: '10px'
  },
  card_playIcon: {
    height: 38,
    width: 38,
  },
  primaryColor: {
    color: '#3cc480'
  }
}));

export default class AddNewExams extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        { title: 'Questions', field: 'question' },
        { title: 'Answers', field: 'answers' },
        { title: 'Correct Answer', field: 'correct' }
      ],
      loading_flag: true,

      currentExamLevel: 'gamelevel1/',

      gameExamQuestion: '',
      gameExamCorrectAnswer: '',
      gameExamAnswer: ['new'],
      gameSampleAnswer: [],
      gameExames: [],
      gameexamLevel: 1,
      dialog_flag: false,

      edit_dailog_flag: false,
      editExamsData: [],
      editDataKey: '',
      edit_question: '',
      edit_correct: '',
      editExamAnswer: [],
      editSampleAnswer: [],
    }
  }

  componentDidMount() {
    this._getExamDatas()
  }

  _selectGameLevel = async (lvl) => {
    await this.setState({ currentExamLevel: lvl })
    await this.setState({ gameExames: [] })
    await this._getExamDatas()
  }

  _getExamDatas = () => {
    firebasedata.database().ref(this.state.currentExamLevel).on("child_added", (snap) => {
      this.setState(previousState => ({
        gameExames: [...previousState.gameExames, snap.val()]
      }));
    });
    this.setState({ loading_flag: false })
    console.log("arrieved")
  }

  _addAnswers = (e) => {
    const addanswer = this.state.gameExamAnswer
    addanswer.push("new")
    this.setState({ gameExamAnswer: addanswer })
  }

  _addSampleAnswers = (i, e) => {
    let values = [...this.state.gameSampleAnswer]
    values[i] = e.target.value;
    this.setState({ gameSampleAnswer: values })
  }

  _addCloseExam = () => {
    this.setState({ gameExamAnswer: ["new"] })
    this.setState({ dialog_flag: false })
  }
  _saveNewExams = () => {
    const newKey = firebasedata.database().ref("userlist").push();
    let values = {
      "key": newKey.key,
      "question": this.state.gameExamQuestion,
      "answers": this.state.gameSampleAnswer,
      "correct": this.state.gameExamCorrectAnswer
    }
    firebasedata.database().ref(this.state.currentExamLevel + newKey.key).set(values)
    console.log(values)
    this.setState({ gameExamAnswer: ["new"] })
    this.setState({ dialog_flag: false })
  }

  _editExams = (userData) => {
    console.log(userData)
    this.setState({ edit_question: userData.question })
    this.setState({ edit_correct: userData.correct })
    this.setState({ editDataKey: userData.key })
    this.setState({ editExamsData: userData.answers })
    this.setState({ edit_dailog_flag: true })
  }

  _addEditAnswer = () => {
    const addanswer = this.state.editExamAnswer
    addanswer.push("new")
    this.setState({ editExamAnswer: addanswer })
  }

  _fnEditCurrentQuestion = (e) => {
    this.setState({ edit_question: e.target.value })
  }

  _fnEditCurrentCorrect = (e) => {
    this.setState({ edit_correct: e.target.value })
  }

  _editExamAnswers = (e) => {
    let answer_array = this.state.editExamsData
    answer_array[e.target.name] = e.target.value
    this.setState({ editExamsData: answer_array })
  }

  _addeditExamAnswer = (i, e) => {
    let values = [...this.state.editSampleAnswer]
    values[i] = e.target.value;
    this.setState({ editSampleAnswer: values })
  }

  _updateCurrentExam = () => {
    let array1 = this.state.editExamsData
    let array2 = this.state.editSampleAnswer
    let array_total = array1.concat(array2)
    let obj = {
      "key": this.state.editDataKey,
      "question": this.state.edit_question,
      "correct": this.state.edit_correct,
      "answers": array_total
    }
    firebasedata.database().ref(this.state.currentExamLevel + this.state.editDataKey).set(obj)
    this.setState({ edit_dailog_flag: false })
  }

  _deleteCurrentExam = (key) => {
    console.log(key)
    firebasedata.database().ref(this.state.currentExamLevel + key).remove()
    this.setState({ gameExames: [] })
    this._getExamDatas()
  }
  render() {
    return (
      <div>
        <Container >
          <Typography component="h5" variant="h5">
            Add New Exams
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Typography component="h2" variant="h2">
              {this.state.currentExamLevel}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-start" mt={5}>
            <Button variant="outlined" color="primary" onClick={() => this._selectGameLevel('gamelevel1/')}>
              Level !
            </Button>
            <Button variant="outlined" color="primary" style={{ marginLeft: '5px' }} onClick={() => this._selectGameLevel('gamelevel2/')}>
              Level 2
            </Button>
            <Button variant="outlined" color="primary" style={{ marginLeft: '5px' }} onClick={() => this._selectGameLevel('gamelevel3/')}>
              Level 3
            </Button>
          </Box>

          <div style={{ paddingTop: '10px' }}>
            {
              this.state.loading_flag ? <Loading />  :
              <>
                {
                  this.state.gameExames.length > 0 && (
                    <MaterialTable
                      title="Players Records"
                      columns={this.state.columns}
                      data={this.state.gameExames}
                      actions={[
                        {
                          icon: 'add',
                          tooltip: 'Add New Exam',
                          isFreeAction: true,
                          onClick: (e) => { this.setState({ dialog_flag: true }) }
                        },
                        {
                          icon: 'edit',
                          tooltip: 'Edit Exam',
                          onClick: (e, rowData) => this._editExams(rowData)
                        },
                        {
                          icon: 'delete',
                          tooltip: 'Delete Exam',
                          onClick: (e, rowData) => this._deleteCurrentExam(rowData.key)
                        }
                      ]}
                      options={{
                        actionsColumnIndex: -1,
                        exportButton: true,
                        filtering: true
                      }}
                    />)
                }
              </>
            }
          </div>
        </Container>

        <Dialog
          fullWidth
          open={this.state.dialog_flag}
          onClose={(e) => {
            this.setState({ dialog_flag: false })
          }}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Add New Exam
          </DialogTitle>

          <DialogContent>
            <Box display="flex" justifyContent="center" m={1} p={2}>
              <Grid container spacing={3}>
                <Grid xs={3} item>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Questions
                  </Typography>
                </Grid>
                <Grid xs={9} item>
                  <TextField
                    fullWidth
                    id="outlined-uncontrolled"
                    label="Please Insert Questions"
                    variant="outlined"
                    onChange={(e) => this.setState({ gameExamQuestion: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box display="flex" justifyContent="center" m={1} p={2}>
              <Grid container spacing={3}>
                <Grid xs={3} item>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Add Answers
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={this._addAnswers}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Typography>
                </Grid>
                <Grid xs={9} item>
                  {
                    this.state.gameExamAnswer.map((data, index) => {
                      return (
                        <Box mt={1} key={index}>
                          <TextField
                            fullWidth
                            id="outlined-uncontrolled"
                            label="Please Insert Answers"
                            variant="outlined"
                            onChange={this._addSampleAnswers.bind(this, index)}
                          />
                        </Box>
                      )
                    })
                  }
                </Grid>
              </Grid>
            </Box>

            <Box display="flex" justifyContent="center" m={1} p={2}>
              <Grid container spacing={3}>
                <Grid xs={3} item>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Correct Answer
                  </Typography>
                </Grid>
                <Grid xs={9} item>
                  <TextField
                    fullWidth
                    id="outlined-uncontrolled"
                    label="Please Insert Correct Answer"
                    variant="outlined"
                    onChange={(e) => { this.setState({ gameExamCorrectAnswer: e.target.value }) }}
                  />
                </Grid>
              </Grid>
            </Box>

          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={(e) => this._addCloseExam()}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this._saveNewExams()}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {
          this.state.editExamsData.length > 0 && (
            <Dialog
              fullWidth
              open={this.state.edit_dailog_flag}
              onClose={(e) => {
                this.setState({ dialog_flag: false })
              }}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Edit Exams
            </DialogTitle>

              <DialogContent>
                <Box display="flex" justifyContent="center" m={1} p={2}>
                  <Grid container spacing={3}>
                    <Grid xs={3} item>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        Questions
                    </Typography>
                    </Grid>
                    <Grid xs={9} item>
                      <TextField
                        fullWidth
                        id="outlined-uncontrolled"
                        label="Please Insert Questions"
                        variant="outlined"
                        name="question"
                        value={this.state.edit_question}
                        onChange={this._fnEditCurrentQuestion}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box display="flex" justifyContent="center" m={1} p={2}>
                  <Grid container spacing={3}>
                    <Grid xs={3} item>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        Add Answers
                      <IconButton color="primary" aria-label="add to shopping cart" onClick={() => this._addEditAnswer}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Typography>
                    </Grid>
                    <Grid xs={9} item>
                      {
                        this.state.editExamsData.map((data, index) => {
                          return (
                            <Box mt={1} key={index}>
                              <TextField
                                name={index}
                                fullWidth
                                id="outlined-uncontrolled"
                                label="Please Insert Answers"
                                variant="outlined"
                                value={data}
                                onChange={this._editExamAnswers}
                              />
                            </Box>
                          )
                        })
                      }
                      {
                        this.state.editExamAnswer.map((data, index) => {
                          return (
                            <Box mt={1} key={index}>
                              <TextField
                                fullWidth
                                id="outlined-uncontrolled"
                                label="Please Insert Answers"
                                variant="outlined"
                                onChange={() => this._addeditExamAnswer.bind(this, index)}
                              />
                            </Box>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                </Box>

                <Box display="flex" justifyContent="center" m={1} p={2}>
                  <Grid container spacing={3}>
                    <Grid xs={3} item>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        Correct Answer
                    </Typography>
                    </Grid>
                    <Grid xs={9} item>
                      <TextField
                        fullWidth
                        id="outlined-uncontrolled"
                        label="Please Insert Correct Answer"
                        variant="outlined"
                        name="correct"
                        value={this.state.edit_correct}
                        onChange={() => this._fnEditCurrentCorrect}
                      />
                    </Grid>
                  </Grid>
                </Box>

              </DialogContent>
              <DialogActions>
                <Button autoFocus color="primary" onClick={(e) => { this.setState({ edit_dailog_flag: false }) }}>
                  Cancel
              </Button>
                <Button color="primary" onClick={() => this._updateCurrentExam()}>
                  Update
              </Button>
              </DialogActions>
            </Dialog>
          )
        }
      </div>
    );
  }
}
