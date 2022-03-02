import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { green } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import img2 from "../../assets/favourite.png";
import { Box, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  welcomemessage: {
    textAlign: 'center',
    color: '#565f4c'
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));



const mapStateToProps = state => ({
  ...state
})

function UserStats(props) {

  const classes = useStyles()  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // console.log(props.loginUserData[0].level)

  return (
    <div style={{ marginTop: '45px', padding: '5px', marginBottom: '80px' }}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.green}>
              <AccountCircleIcon />
            </Avatar>
          }
          title={props.loginUserData[0].username}
          subheader={props.loginUserData[0].email}
        />
        <CardMedia
          className={classes.media}
          title="Paella dish"
        />
        <CardActionArea>
          <Box><img key={"img2"} src={img2} style={{ width: "100%" }} alt="logo" /></Box>          
          <CardContent>
            <Box m={1}>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                High Socre :  {props.TopUser} pts
              </Typography>
            </Box>
            <Box m={1}>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                Your Highest Socre :  {props.loginUserData[0].highestScore} pts
              </Typography>
            </Box>
            <Box m={1}>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                You Current Socre :  {props.loginUserData[0].score} pts
              </Typography>
            </Box>
            <Box m={1}>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                You Current Win :  {props.loginUserData[0].winningID} 
              </Typography>
            </Box>
            <Box m={1}>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                You Current Level :  {props.loginUserData[0].level} Level
              </Typography>
            </Box>
            <Box m={1}>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                You Phone Number :  {props.loginUserData[0].phone} 
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <div className="root" />
    </div>
  );
}

export default connect(mapStateToProps)(UserStats)