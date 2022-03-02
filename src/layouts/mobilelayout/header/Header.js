import React from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
} from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { auth } from '../../../firebase'
import { connect } from 'react-redux';
import styles from "./app-style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
}));

const mapStateToProps = state => ({
  ...state,
})

function HeaderBar(props) {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div>
      <header >
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              <Box justifyContent="center">
                {props.title}
              </Box>
            </Typography>
            {/* <Button color="inherit" onClick={(e) => { auth.doSignOut(); history.push('/') }}><MoreVertIcon /></Button> */}
          </Toolbar>
        </AppBar>
      </header>
    </div>
  );
}

export default connect(mapStateToProps)(HeaderBar)