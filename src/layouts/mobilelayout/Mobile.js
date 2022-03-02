import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Topbar from './header';
import Footer from './footer';

import Loading from '../loading'

import { firebasedata } from '../../firebase/firebase'

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [loginUserDetail, setLoginUser] = useState({ userdetail: [] })
  const [gameRestult, setGameResult] = useState([])
  const [headertitle, setHeaderTitle] = useState("Home")

  const [gameSetting, getSetting] = useState({ settingDetail: [] })
  const [topUser, getTopUser] = useState(0)
  const [playNum, setPlayCount] = useState(0)

  const [exam_count, setExamCount] = useState(0)

  const [current_examlvl, setCurrentGamelvl] = useState('gamelevel1/')

  const getResult = (obj) => {
    setGameResult(obj)
  }

  useEffect(() => {
    firebasedata.database().ref("userlist").orderByChild('userid').equalTo(localStorage.getItem('userKey')).on("child_added",async function(Data){
      await setLoginUser({ ...loginUserDetail, userdetail: [...loginUserDetail.userdetail, Data.val()] })
    })
    firebasedata.database().ref("gamepalysetting").on("value", async function(Data){
      await getSetting({ ...gameSetting, settingDetail: [...gameSetting.settingDetail, Data.val()] })
    })
    firebasedata.database().ref("userlist").orderByChild("highestScore").limitToLast(1).on("value",async function(Data) {
      await Data.forEach(function(data) {
        getTopUser(data.val().highestScore)
      })
      setLoading(false)
    })
  }, [])


  // const setGameRate = (currentRate) => {
  //   getTopUser(currentRate)
  //   firebasedata.database().ref('userlist/' + loginUserDetail.userdetail.userid).update({
      
  //   })
  // }

  return (
    <div>
      <Topbar title={headertitle} />
        <main className={classes.content}>
          {
            loading ?
            <Loading />
            :  <> 
            {
              loginUserDetail.userdetail.length > 0 && 
                <props.component
                  currentlvl={current_examlvl}
                  setGamelvl={setCurrentGamelvl}
                  total_exam_count={exam_count}
                  examCounter={setExamCount}
                  playCount={playNum}
                  setPlayCount={setPlayCount}
                  TopUser={topUser}
                  setTitle={setHeaderTitle}
                  loginUserData={loginUserDetail.userdetail}
                  gameResultScore={gameRestult}
                  gameScore={getResult}
                  gameSetting={gameSetting.settingDetail}
                /> 
            } </>
          }
        </main>
      <Footer setTitle={setHeaderTitle} />
    </div>
  );
};

export default Main;
