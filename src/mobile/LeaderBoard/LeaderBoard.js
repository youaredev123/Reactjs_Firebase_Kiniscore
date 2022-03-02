import React from "react";

import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";

import { firebasedata } from '../../firebase/firebase'

import styles from "./leaderboard-style";
import theme from "../../theme";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { MoreVert } from '@material-ui/icons';
import { Grid, TextField, Box } from '@material-ui/core';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp';

import social_logo from '../../assets/social.png'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableRowHeader = withStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: 'grey',
    fontWeight: 'bold'
  },
  body: {
    fontSize: 12,
    color: 'grey',
    padding: "10px 14px"
  },
}))(TableCell);

const ArrowDownwardSharpIc = withStyles((theme) => ({
  root: {
    color: '#f7798a',
  }
}))(ArrowDownwardSharpIcon);

const ArrowUpwardIc = withStyles((theme) => ({
  root: {
    color: '#a3ad97',
  }
}))(ArrowUpwardIcon);


class Leaderboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      leodashUsers: []
    }
  }

  componentDidMount() {
    firebasedata.database().ref('userlist').on("child_added", snap => {
      this.setState(previousState => ({
        leodashUsers: [...previousState.leodashUsers, snap.val()]
      }));
    });
  }

  render() {
    const { classes } = this.props;
    const userlistarray = this.state.leodashUsers.sort((a, b) => (a.highestScore > b.highestScore) ? -1 : 1)

    return (
      <>
        <MuiThemeProvider theme={theme}>
          <Box display="flex" justifyContent="center" mt={2}>
            <img key={"img1"} src={social_logo} style={{ height: "100px", width: "100px" }} alt="logo" />
          </Box>

          <div style={{ height: '400px', overflowY: 'auto' }}>
            <TableContainer component={Paper} style={{ background: 'transparent', boxShadow: 'none' }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <StyledTableRowHeader>
                    <StyledTableCell>Ptn</StyledTableCell>
                    <StyledTableCell>Full Name</StyledTableCell>
                    <StyledTableCell align="center">City</StyledTableCell>
                    <StyledTableCell align="center">K.Score</StyledTableCell>
                    <StyledTableCell align="center">H.Score</StyledTableCell>
                  </StyledTableRowHeader>
                </TableHead>
                <TableBody>
                  {userlistarray.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index} th
                      </StyledTableCell>
                      <StyledTableCell>{row.username}</StyledTableCell>
                      <StyledTableCell>{row.location}</StyledTableCell>
                      <StyledTableCell>{row.score}</StyledTableCell>
                      <StyledTableCell>
                        {
                          row.userstate ? <ArrowUpwardIc /> : <ArrowDownwardSharpIc />
                        }
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Grid item xs={12} md={12} align="center">
              <MoreVert />
            </Grid>
          </div>
        </MuiThemeProvider>
        <div className="root" />
      </>
    );
  }
}

export default withStyles(styles)(Leaderboard);
