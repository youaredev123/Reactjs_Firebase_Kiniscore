import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl
} from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab';
import PhoneInput from 'react-phone-input-2'

import { firebasedata } from '../../firebase/firebase'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  welcomemessage: {
    textAlign: 'center',
    color: '#565f4c'
  },
  media: {
    width: '100%'
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
  textField: {
    marginTop: theme.spacing(2)
  },
}));


const mapStateToProps = state => ({
  ...state
})

function Profile(props) {
  
  const classes = useStyles()
  const history = useHistory()
  const [usergender, setUserGender] = useState('female')
  const [userData, getUsersData] = useState(props.loginUserData[0])
  const [userphone, setuserPhone] = useState(props.loginUserData[0].phone)


  const handleChange = (event) => {
    setUserGender(event.target.value);
    getUsersData({ ...userData, ["gender"]: event.target.value })

  };
  
  const handleInputChange = (event) => {
    // console.log(event.target)
    getUsersData({ ...userData, [event.target.name]: event.target.value })
  }

  const setuserCountry = (data) => {
    getUsersData({ ...userData, ["country"]: data })
  }
  
  const handleSetPhone = (phone) => {
    getUsersData({ ...userData, ["phone"]: phone })
  }

  const updateProfile = () => {
    firebasedata.database().ref('userlist/' + localStorage.getItem('userKey')).update(userData)
    alert("Updated Successfuly !")
  }

  return (
    <div style={{ marginTop: '45px' }}>
      <>
        <Box justifyContent="center" mb={10} p={1} >
          <Box p={1} className={classes.welcomemessage}>
            <Typography variant="h5" >
              Profile Page
            </Typography>
          </Box>
          <Card >
            <CardContent >
              <div style={{ width: '100%' }}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Full Name"
                  name="name"
                  type="text"
                  variant="outlined"
                  onChange={handleInputChange}
                  name="username"
                  value={userData.username}
                />

                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Display/User Name"
                  name="name"
                  type="text"
                  variant="outlined"
                  onChange={handleInputChange}
                  name="usernickname"
                  value={userData.usernickname}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Age"
                  name="name"
                  type="text"
                  variant="outlined"
                  onChange={handleInputChange}
                  name="userage"
                  value={userData.userage}
                />

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
                  value={userData.email}
                  disabled
                  onChange={handleInputChange}
                  name="email"
                />
                <PhoneInput
                  containerClass={classes.textField}
                  inputStyle={{ width: '100%' }}
                  country={'us'}
                  value={userphone}
                  onChange={userphone => handleSetPhone(userphone)}
                  name="phone"
                  default={userData.phone}
                />
                <Autocomplete
                  className={classes.textField}
                  id="combo-box-demo"
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
                  onInputChange={(event, newValue) => {
                    setuserCountry(newValue);
                  }}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="User City/Location"
                  name="city location"
                  type="text"
                  variant="outlined"
                  value={userData.location}
                  onChange={handleInputChange}
                  name="location"
                />

                <TextField
                  className={classes.textField}
                  fullWidth
                  label="BVN Number"
                  name="Bvn number"
                  type="text"
                  variant="outlined"
                  value={userData.userbvnnum}
                  onChange={handleInputChange}
                  name="userbvnnum"
                />
              </div>
            </CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={updateProfile}
                >
                  Update Profle
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </>
      <div className="root" />
    </div>
  );
}
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

export default (Profile)