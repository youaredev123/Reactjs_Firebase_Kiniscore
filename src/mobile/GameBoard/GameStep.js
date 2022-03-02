import React from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Box,
  List,
  ListItem,
  createMuiTheme,
  ListItemIcon,
  ListItemText 
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import LockIcon from '@material-ui/icons/Lock';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import img2 from "../../assets/ads_logo.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  welcomemessage: {
    textAlign: 'center',
    color: '#565f4c'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const mapStateToProps = state => ({
  ...state
})

function GameHome(props) {
  const classes = useStyles()
  const history = useHistory()

  const [selectedIndex, setSelectedIndex] = React.useState('gamelevel1/');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(index)
    props.setGamelvl(index)
  };

  return (
    <div className={classes.root}>
      {
        <>
          <Box display="flex" justifyContent="center" m={1} p={1} >
            <Paper m={1} p={1}>
              <Box p={1} className={classes.welcomemessage}>
                <Typography variant="h5" >
                  Play Enjoy Game
                </Typography>
              </Box>
            </Paper>
          </Box>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              selected={selectedIndex === 'gamelevel1/'}
              onClick={(event) => { 
                handleListItemClick(event, 'gamelevel1/')
                history.push('./gameboard') 
              }}
            >
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText>Welcome Level 1</ListItemText>
            </ListItem>
            <ListItem
              disabled={ props.loginUserData[0].level >= 2 ? false : true }
              button
              selected={selectedIndex === 'gamelevel2/'}
              onClick={(event) => { 
                handleListItemClick(event, 'gamelevel2/')
                history.push('./gameboard') 
              }}
            >
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText>
                {
                  props.loginUserData[0].level >= 2 ? "Welcome Level 2" : "Level 2 "
                }
              </ListItemText>
              {
                props.loginUserData[0].level >= 2 ? null : <LockIcon />
              }          
            </ListItem>
            <ListItem
              disabled={ props.loginUserData[0].level >= 3 ? false : true }
              button
              selected={selectedIndex === 'gamelevel3/'}
              onClick={(event) => { 
                handleListItemClick(event, 'gamelevel3/')
                history.push('./gameboard') 
              }}
            >
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText>
                {
                  props.loginUserData[0].level >= 3 ? "Welcome Level 3" : "Level 3 "
                }             
              </ListItemText>
              {
                props.loginUserData[0].level >= 3 ? null : <LockIcon />
              }              
            </ListItem>
          </List>
        </>
      }
      <div className="root" />
    </div>
  );
}

export default connect(mapStateToProps)(GameHome)