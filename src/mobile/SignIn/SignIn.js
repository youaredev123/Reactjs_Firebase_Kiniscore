import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';

import { green } from '@material-ui/core/colors';
import { Facebook as FacebookIcon, Google as GoogleIcon } from './icons';
import image from '../../assets/logo.png';

import { auth } from '../../firebase'
import { firebasedata } from '../../firebase/firebase'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    width: '100%'
  },
  grid: {
    height: '100%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    width: '150px',
    height: '100px',
    paddingTop: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0),
    color: 'white'
  },
  googleButton: {
    margin: theme.spacing(2, 0),
  }
}));

const themebtn = createMuiTheme({
  palette: {
    primary: green,
  },
});

const SignIn = props => {
  const classes = useStyles();
  const [useremail, setuserEmail] = useState('')
  const [userpassword, setuserPassword] = useState('')
  const [error, getSignInError] = useState('')

  const isInvalid =
    useremail === '' ||
    userpassword === ''

  const onSignIn = (e) => {
    auth.doSignInWithEmailAndPassword(useremail, userpassword)
      .then(async (authUser) => {
        firebasedata.database().ref("userlist").orderByChild('email').equalTo(useremail).on("child_added", async function(Data){
          localStorage.setItem('userKey', Data.key)
          setuserEmail('')
          setuserPassword('')
          await props.history.push('/home')
        })
      })
      .catch(error => {
        getSignInError(error)
      });
    e.preventDefault();
  }

  const facebooksign = (e) => {
    auth.dosignwithFaceBook()
      .then(function(result) {
        firebasedata.database().ref("userlist").orderByChild('email').equalTo(result.user.email).on("child_added", function(Data){
          let userphone = ''
          if(result.user.phoneNumber === null) {
            userphone = ''
          }else {
            userphone = result.user.phoneNumber
          }
          if (Data.val() === null) {
            localStorage.setItem('userKey', Data.key)
            const newKey = firebasedata.database().ref("userlist").push();
            firebasedata.database().ref('userlist/' + newKey.key).set({
              userid: newKey.key,
              username: result.user.displayName,
              email: result.user.email,
              phone: userphone,
              level: 1,
              userscore: 0,
              location: '',
              country: '',
              userstate: false,
              userplaystatus: 0,

              gender: '',
              userbvnnum: '',
              usernickname: '',
              userage: '',
              winningID: '',
              highestScore: '',
              dateexpire: '',
              trial_day: 10
            });
            props.history.push('/home')
          } else {
            firebasedata.database().ref("userlist").orderByChild('email').equalTo(result.user.email).on("child_added", async function(Data){
              localStorage.setItem('userKey', Data.key)
              await props.history.push('/home')
            })
          }
        })
      })
  }

  const googleLogin = (e) => {
    auth.doSignInWithGoogle()
      .then(socialAuthUser => {
        firebasedata.database().ref("userlist").orderByChild('email').equalTo(socialAuthUser.user.email).on("value",async function(Data){
          let userphone = ''
          if(socialAuthUser.user.phoneNumber === null) {
            userphone = ''
          }else {
            userphone = socialAuthUser.user.phoneNumber
          }
          if (Data.val() === null) {
            // console.log("dear Sir")
            await localStorage.setItem('userKey', Data.key)
            const newKey = firebasedata.database().ref("userlist").push();
            firebasedata.database().ref('userlist/' + newKey.key).set({
              userid: newKey.key,
              username: socialAuthUser.user.displayName,
              email: socialAuthUser.user.email,
              phone: userphone,
              level: 1,
              userscore: 0,
              location: '',
              country: '',
              userstate: false,
              userplaystatus: 0,

              gender: '',
              userbvnnum: '',
              usernickname: '',
              userage: '',
              winningID: '',
              highestScore: '',
              dateexpire: '',
              trial_day: 10
            });
            props.history.push('/home')
          } else {
            firebasedata.database().ref("userlist").orderByChild('email').equalTo(socialAuthUser.user.email).on("child_added", async function(Data){
              await localStorage.setItem('userKey', Data.key)
              await props.history.push('/home')
            })
          }
        })
      })
      .catch(error => {
        getSignInError(error)
      });
  }

  return (
    <div className={classes.root}>
      <Grid
        style={{ position: 'relative', alignItems: "center" }}
        container
        direction="column"
        display="flex"
      >
        <img src={image} alt='s' className={classes.logoImage} />
        <Typography
          className={classes.title}
          variant="h2"
        >
          Sign in
        </Typography>
      </Grid>
      <Grid
        className={classes.content}
        item
        lg={12}
        xs={12}
      >
        <div className={classes.content}>
          <div className={classes.contentBody}>
            <div
              className={classes.form}
            >
              <Typography
                color="textSecondary"
                gutterBottom
              ></Typography>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={facebooksign}
              >
                <FacebookIcon className={classes.socialIcon} />
                  Login with Facebook
              </Button>
              <Button
                className={classes.googleButton}
                size="large"
                fullWidth
                variant="contained"
                onClick={googleLogin}
              >
                <GoogleIcon className={classes.socialIcon} />
                  Login with Google
              </Button>
              <Typography
                align="center"
                className={classes.sugestion}
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
              <Typography
                align="center"
                className={classes.errormessage}
                color="textSecondary"
                variant="body1"
              >
                {error.message}
              </Typography>
              <TextField
                className={classes.textField}
                fullWidth
                label="Email address"
                name="email"
                type="text"
                variant="outlined"
                value={useremail}
                onChange={e => setuserEmail(e.target.value)}
              />
              <TextField
                className={classes.textField}
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={userpassword}
                onChange={e => setuserPassword(e.target.value)}
              />
              <ThemeProvider theme={themebtn}>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={isInvalid}
                  onClick={onSignIn}
                >
                  Sign in now
                </Button>
              </ThemeProvider>
            </div>
          </div>
          <Typography
            color="textSecondary"
            variant="body1"
            style={{ marginLeft: "20px",marginBottom: '150px' }}
          >
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/sign-up"
              variant="h6"
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default SignIn;