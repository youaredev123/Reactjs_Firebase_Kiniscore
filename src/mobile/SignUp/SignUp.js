import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  createMuiTheme,
  ThemeProvider,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Autocomplete } from '@material-ui/lab';

import { auth } from '../../firebase'
import { firebasedata } from '../../firebase/firebase'

import { green } from '@material-ui/core/colors';
import PhoneInput from 'react-phone-input-2'
import image from '../../assets/logo.png';
import 'react-phone-input-2/lib/material.css'

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
  errormessage: {
    width: '100%',
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
  },
  footerSigin: {
    marginBottom: "50px",
    marginLeft: "20px"
  }
}));

const themebtn = createMuiTheme({
  palette: {
    primary: green,
  },
});

const SignUp = (props) => {
  const country_data = require('../countries.json');
  const classes = useStyles();
  const [username, setuserName] = useState('')
  const [useremail, setuserEmail] = useState('')
  // const [userphone, setuserPhone] = useState('')
  const [userlocation, setuserLocation] = useState('')
  const [userpassword, setuserPass] = useState('')
  const [passwordconfirm, setuserPassconfirm] = useState('')
  const [error, setError] = useState('')

  const [usernickname, setNickName] = useState('')
  const [usergender, setUserGender] = useState('female')
  const [userbvn, setUserBVN] = useState('')
  
  const [statues, getCountryStatus] = useState({ stautesData: []})
  const [phoneCode, setPhoneCode] = useState('us') // user phone
  const [usercountry, setUserCountry] = useState('') // user country
  const [region, setReigon] = useState('') // location

  useEffect(() => {
    
  })

  const handleChange = (event) => {
    setUserGender(event.target.value);
  };

  const [userage, setSelectedDate] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const init_status = () => {
    getCountryStatus({ stautesData: [] })
    setPhoneCode('')
    setReigon('')
    setUserCountry('')
  }

  const handleSelectCountry = async (country) => {
    await init_status()
    const selectedCountry = country_data.filter(e => e.name == country);
    setPhoneCode(selectedCountry[0].code2.toLowerCase())
    setUserCountry(selectedCountry[0].name)
    await getCountryStatus({ stautesData: [selectedCountry[0]] })
  }

  const handleSelectReign = (reigon) => {
    setReigon(reigon)
  }

  const isInvalid =
    userpassword !== passwordconfirm ||
    userpassword === '' ||
    useremail === '' ||
    phoneCode === '' ||
    usercountry === '' ||
    region === '' ||
    userbvn === '' ||
    usernickname === '' ||
    userage === '' ||
    usergender === '' ||
    username === '';

  // console.log(statues.stautesData)

  const onSubmit = event => {

    const {
      history
    } = props;

    auth.doCreateUserWithEmailAndPassword(useremail, userpassword)
      .then((authUser) => {
        const newKey = firebasedata.database().ref("userlist").push();
        firebasedata.database().ref('userlist/' + newKey.key).set({
          userid: newKey.key,
          username: username,
          email: useremail,
          phone: phoneCode,
          level: 1,
          userscore: 0,
          location: region,
          country: usercountry,
          userstate: false,
          userplaystatus: 0,

          gender: usergender,
          userbvnnum: userbvn,
          usernickname: usernickname,
          userage: userage,
          winningID: '',
          highestScore: '',
          dateexpire: '',
          trial_day: 10
        });
        setuserName('')
        setuserEmail('')
        setPhoneCode('')
        // setuserCountry('')
        setuserPass('')
        setuserPassconfirm('')
        history.push('/')
      })
      .catch(error => {
        setError(error)
      });
    event.preventDefault();
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
          Sign Up
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
                label="Full Name"
                name="name"
                type="text"
                variant="outlined"
                onChange={e => setuserName(e.target.value)}
                value={username}
              />

              <TextField
                className={classes.textField}
                fullWidth
                label="Display/User Name"
                name="name"
                type="text"
                variant="outlined"
                onChange={e => setNickName(e.target.value)}
                value={usernickname}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Age"
                  value={userage}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <FormControl component="fieldset" style={{ marginTop: '10px' }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender1" value={usergender} onChange={handleChange}>
                  <FormControlLabel value="female" control={<Radio />} label="End" label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="End" label="Male" />
                </RadioGroup>
              </FormControl>

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
              <Autocomplete
                className={classes.textField}
                id="combo-box-demo"
                options={countries}
                getOptionLabel={(option) => option.label}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
                onInputChange={(event, newValue) => {
                  handleSelectCountry(newValue);
                }}
              />
              <PhoneInput
                containerClass={classes.textField}
                inputStyle={{ width: '100%' }}
                country={phoneCode}
                value={phoneCode}
                onChange={phoneCode => setPhoneCode(phoneCode)}
              />
              {
                statues.stautesData.length > 0 && (
                <Autocomplete
                  className={classes.textField}
                  id="combo-box-demo"
                  options={statues.stautesData[0].states}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Select location" variant="outlined" />}
                  onInputChange={(event, newValue) => {
                    handleSelectReign(newValue);
                  }}
                />)
              }

              <TextField
                className={classes.textField}
                fullWidth
                label="BVN Number"
                name="Bvn number"
                type="text"
                variant="outlined"
                value={userbvn}
                onChange={e => setUserBVN(e.target.value)}
              />

              <TextField
                className={classes.textField}
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={userpassword}
                onChange={e => setuserPass(e.target.value)}
              />
              <TextField
                className={classes.textField}
                fullWidth
                label="Password confirm"
                name="password_confirm"
                type="password"
                variant="outlined"
                value={passwordconfirm}
                onChange={e => setuserPassconfirm(e.target.value)}
              />
              <ThemeProvider theme={themebtn}>
                <Button
                  onClick={onSubmit}
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={isInvalid}
                >
                  Sign in now
                </Button>
              </ThemeProvider>
            </div>
          </div>
          <div className={classes.footerSigin}>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Already have an account?
                <Link
                component={RouterLink}
                to="/"
                variant="h6"
              >
                Sign In
                </Link>
            </Typography>
          </div>
        </div>
      </Grid>
    </div>
  );
};

const countries = [
  { code: 'AD', label: 'Algeria', phone: '376' },
  { code: 'AE', label: 'Angola', phone: '971' },
  { code: 'AF', label: 'Benin', phone: '93' },
  { code: 'AG', label: 'Botswana', phone: '1-268' },
  { code: 'AI', label: 'Burkina Faso', phone: '1-264' },
  { code: 'AL', label: 'Burundi', phone: '355' },
  { code: 'AM', label: 'Cameroon', phone: '374' },
  { code: 'AO', label: 'Cape Verde', phone: '244' },
  { code: 'AQ', label: 'Central African Republic', phone: '672' },
  { code: 'AR', label: 'Chad', phone: '54' },
  { code: 'AS', label: 'Congo, Dem.', phone: '1-684' },
  { code: 'AT', label: 'Congo, Rep.', phone: '43' },
  { code: 'AU', label: 'Djibouti', phone: '61', suggested: true },
  { code: 'AW', label: 'Egypt', phone: '297' },
  { code: 'AX', label: 'Equatorial Guinea', phone: '358' },
  { code: 'AZ', label: 'Eritrea', phone: '994' },
  { code: 'BA', label: 'Ethiopia', phone: '387' },
  { code: 'BB', label: 'Gabon', phone: '1-246' },
  { code: 'BD', label: 'Gambia', phone: '880' },
  { code: 'BE', label: 'Ghana', phone: '32' },
  { code: 'BF', label: 'Guinea', phone: '226' },
  { code: 'BG', label: 'Guinea-Bissau', phone: '359' },
  { code: 'BH', label: 'Kenya', phone: '973' },
  { code: 'BI', label: 'Lesotho', phone: '257' },
  { code: 'BJ', label: 'Liberia', phone: '229' },
  { code: 'BL', label: 'Libya', phone: '590' },
  { code: 'BM', label: 'Madagascar', phone: '1-441' },
  { code: 'BN', label: 'Malawi', phone: '673' },
  { code: 'BO', label: 'Mali', phone: '591' },
  { code: 'BR', label: 'Mauritania', phone: '55' },
  { code: 'BS', label: 'Mauritius', phone: '1-242' },
  { code: 'BT', label: 'Morocco', phone: '975' },
  { code: 'BV', label: 'Mozambique', phone: '47' },
  { code: 'BW', label: 'Namibia', phone: '267' },
  { code: 'BY', label: 'Niger', phone: '375' },
  { code: 'BZ', label: 'Nigeria', phone: '501' },
  { code: 'CA', label: 'Rwanda', phone: '1', suggested: true },
  { code: 'CC', label: 'Sao Tome/Principe', phone: '61' },
  { code: 'CD', label: 'Senegal', phone: '243' },
  { code: 'CF', label: 'Seychelles', phone: '236' },
  { code: 'CG', label: 'Sierra Leone', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Somalia", phone: '225' },
  { code: 'CK', label: 'South Africa', phone: '682' },
  { code: 'CL', label: 'Sudan', phone: '56' },
  { code: 'CM', label: 'Swaziland', phone: '237' },
  { code: 'CG', label: 'Tanzania', phone: '242' },
  { code: 'CH', label: 'Togo', phone: '41' },
  { code: 'CI', label: "Tunisia", phone: '225' },
  { code: 'CK', label: 'Uganda', phone: '682' },
  { code: 'CL', label: 'Zambia', phone: '56' },
  { code: 'CM', label: 'Zimbabwe', phone: '237' },
];
export default withRouter(SignUp);