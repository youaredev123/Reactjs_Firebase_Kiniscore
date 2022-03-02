import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import SideBar from './sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Admin = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SideBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <props.component />
      </main>
    </div>
  );
};

export default Admin;
