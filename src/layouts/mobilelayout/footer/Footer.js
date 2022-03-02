import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { auth } from '../../../firebase'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { PersonAdd, Favorite, PinDrop } from '@material-ui/icons';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  footer: {
    position: "fixed",
    width: "100%",
    bottom: "0",
    textAlign: "center",
  }
});

export default function FoterBottom(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');
  const history = useHistory();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
            props.setTitle(newValue.toLocaleUpperCase())
            history.push("/" + newValue)
            if(newValue === "logout") {
              auth.doSignOut(); history.push('/')
            }
          }}
          showLabels
        >
          <BottomNavigationAction value="profile" label="Profile" icon={<PersonIcon />} />
          <BottomNavigationAction value="home" label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction value="logout" label="LogOut" icon={<ExitToAppIcon />} />
        </BottomNavigation>
      </footer>
    </div>
  );
}