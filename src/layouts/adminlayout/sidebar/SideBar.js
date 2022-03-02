import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import CustomStyle from './style.css'

import Container from '@material-ui/core/Container';

import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import DialpadIcon from '@material-ui/icons/Dialpad';
import SettingsIcon from '@material-ui/icons/Settings';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'center',
    color: '#f7f7f7',
    fontWeight: 'bold',
    fontSize: '18px',
    padding: '10px',
    height: '64px',
    backgroundColor: '#3b3a52',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  itemClick: {
    borderLeft: '5px solid',
    color: '#a3a0fb',
    backgroundColor: '#3c3b53'
  },

  iconColor: {
    color: '#a5a4bf'
  },

  clickIcon: {
    color: '#928fe1'
  },

  listitemText: {
    fontSize: '13px',
    color: '#f7f7f7'
  },

  // this part is for card
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
  },
  drawerPaperStyle: {
    backgroundColor: '#43425d',
    height: '100%'
  },
  itemColor: {
    color: '#f4f6f8'
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [open, setOpen] = React.useState(false);
  const history = useHistory()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="toolbar">
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography variant="h6" noWrap className={classes.header}>
          KiniScore.com
        </Typography>
        <Divider />

        <List className={classes.drawerPaperStyle} >
          <ListItem
            button
            className={selectedIndex === 0 ? classes.itemClick : null}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <HomeIcon className={selectedIndex === 0 ? classes.clickIcon : classes.iconColor} />
            </ListItemIcon>
            <ListItemText >
              <span className="itemColor">Home</span>
            </ListItemText>
          </ListItem>

          <ListItem
            button
            className={selectedIndex === 1 ? classes.itemClick : null}
            onClick={(event) => {
              handleListItemClick(event, 1) 
              history.push('/admindashboard')
            }}
          >
            <ListItemIcon>
              <BarChartIcon className={selectedIndex === 1 ? classes.clickIcon : classes.iconColor} />
            </ListItemIcon>
            <ListItemText>
              <span className="itemColor">Dashboard</span>
            </ListItemText>
          </ListItem>

          <ListItem
            button
            className={selectedIndex === 2 ? classes.itemClick : null}
            onClick={(event) => {
              handleListItemClick(event, 2) 
              history.push('/admingamesetting')
            }}
          >
            <ListItemIcon>
              <DialpadIcon className={selectedIndex === 2 ? classes.clickIcon : classes.iconColor} />
            </ListItemIcon>
            <ListItemText><span className="itemColor">Games Round Settings</span></ListItemText>
          </ListItem>

          <ListItem
            button
            className={selectedIndex === 3 ? classes.itemClick : null}
            onClick={(event) => { 
              handleListItemClick(event, 3) 
              history.push('/adminsetting')
            }}
          >
            <ListItemIcon>
              <SettingsIcon className={selectedIndex === 3 ? classes.clickIcon : classes.iconColor} />
            </ListItemIcon>
            <ListItemText><span className="itemColor">Settings</span></ListItemText>
          </ListItem>
          
          <ListItem
            button
            className={selectedIndex === 4 ? classes.itemClick : null}
            onClick={(event) => { 
              handleListItemClick(event, 4) 
              history.push('/adminaddnewexams')
            }}
          >
            <ListItemIcon>
              <AddToPhotosIcon className={selectedIndex === 4 ? classes.clickIcon : classes.iconColor} />
            </ListItemIcon>
            <ListItemText><span className="itemColor">Add New Exames</span></ListItemText>
          </ListItem>
        </List>

      </Drawer>
    </div>
  );
}