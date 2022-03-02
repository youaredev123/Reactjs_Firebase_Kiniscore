import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { firebasedata } from '../../firebase/firebase'

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

export default class AdminDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        { title: 'Player ID', field: 'userid' },
        { title: 'STATUS', field: 'userstate', lookup: { true: 'Won', false: 'Lost' }, },
        { title: 'PLAYER NAME', field: 'username', type: '' },
        { title: 'PLAY STATUS', field: 'userplaystatus', type: '' },
        { title: 'COUNTRY', field: 'country', type: '' },
        { title: 'CITY/LOCATION', field: 'location', type: '' },
        { title: 'C.PHONE', field: 'phone', type: '' }
      ],
      usersdata: []
    }
  }

  componentDidMount() {
    firebasedata.database().ref('userlist').on("child_added", snap => {
      this.setState(previousState => ({
        usersdata: [...previousState.usersdata, snap.val()]
      }));
    });
  }

  render() {
    const classes = useStyles;
    return (
      <div>

        <Container>
          <Typography component="h5" variant="h5">
            Dashboard - Admin
          </Typography>

          <Grid container spacing={3} style={{ paddingTop: '20px' }}>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper>

                <Card className={classes.card_root} variant="outlined">
                  <div className={classes.card_details}>
                    <CardContent className={classes.card_content}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Total Player
                      </Typography>
                    </CardContent>
                    <div style={{ marginLeft: '10px' }}>
                      <div className={classes.card_controls}>
                        <Typography component="h5" variant="h5" fontWeight="fontWeightBold" m={2}>
                          246k
                        </Typography>
                      </div>
                      <div className={classes.card_arrowbar}>
                        <ArrowDownwardIcon fontSize='small' color="error" />
                        <Typography variant="body1" color="error">
                          13.8 %
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image="/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"
                  />
                </Card>

              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className={classes.paper}>

                <Card className={classes.card_root} variant="outlined">
                  <div className={classes.card_details}>
                    <CardContent className={classes.card_content}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Total New Players
                      </Typography>
                    </CardContent>
                    <div style={{ marginLeft: '10px' }}>
                      <div className={classes.card_controls}>
                        <Typography component="h5" variant="h5" fontWeight="fontWeightBold" ml={2}>
                          2543
                        </Typography>
                      </div>
                      <div className={classes.card_arrowbar}>
                        <ArrowUpwardIcon fontSize='small' style={{ color: '#3cc480' }} />
                        <Typography variant="body1" color="initial" style={{ color: '#3cc480' }} >
                          13.8 %
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image="/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"
                  />
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className={classes.paper}>

                <Card className={classes.card_root} variant="outlined">
                  <div className={classes.card_details}>
                    <CardContent className={classes.card_content}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Total Round Winners
                    </Typography>
                    </CardContent>
                    <div style={{ marginLeft: '10px' }}>
                      <div className={classes.card_controls}>
                        <Typography component="h5" variant="h5" fontWeight="fontWeightBold" m={2}>
                          39K
                      </Typography>
                      </div>
                      <div className={classes.card_arrowbar}>
                        <ArrowDownwardIcon fontSize='small' color="error" />
                        <Typography variant="body1" color="error">
                          13.8 %
                      </Typography>
                      </div>
                    </div>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image="/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"
                  />
                </Card>

              </Paper>
            </Grid>
          </Grid>

          <div style={{ paddingTop: '50px' }}>
            <MaterialTable
              title="Players Records"
              columns={this.state.columns}
              data={this.state.usersdata}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...this.state.usersdata];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      this.setState({ dataUpdate })
                      this.setState({ usersdata: dataUpdate });
                      firebasedata.database().ref('userlist/' + newData.userid).update({
                        country: newData.country,
                        dateexpire: newData.dateexpire,
                        email: newData.email,
                        gender: newData.gender,
                        highestScore: newData.highestScore,
                        level: newData.level,
                        location: newData.location,
                        phone: newData.phone,
                        trial_day: newData.trial_day,
                        userage: newData.userage,
                        userbvnnum: newData.userbvnnum,
                        userid: newData.userid,
                        username: newData.username,
                        usernickname: newData.usernickname,
                        userplaystatus: newData.userplaystatus,
                        userscore: newData.userscore,
                        userstate: newData.userstate,
                        winningID: newData.winningID
                      });
                      resolve();
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...this.state.usersdata];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      this.setState({ usersdata: dataDelete });
                      firebasedata.database().ref('userlist/' + oldData.userid).remove()
                      resolve()
                    }, 1000)
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                exportButton: true,
                filtering: true,
                selection: true
              }}
            />
          </div>
        </Container>
      </div>
    );
  }
}
