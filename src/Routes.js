import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main as MainLayout } from './layouts';
import { Admin as AdminLayout } from './layouts';

import {
  SignIn as SignInView,
  SignUp as SignUpView,
  Home as HomeView,
  GameBoard as GameBoardView,
  GameResult as GameResultView,
  LeaderBoard as LeaderBoardView,
  GameAds as GameAdsView,
  InviteFriend as InviteFriendView,
  GameStep as GameStepView,
  Notification as NotificationView,
  Stats as StatsView,
  Profile as ProfileView
} from './mobile';

import firebase from 'firebase';

import {
  Dashboard as DashboardView,
  AdminGameSetting as AdminGameSettingView,
  Setting as AdminSettingView,
  AddNewExams as AddNewExamsView
} from './admin'

const Routes = () => {
  const [loginflag, setLogin] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((loginflag) => {
      loginflag
        ? setLogin(true)
        : setLogin(false);
      }
    );
  },[])

  return (
    <Switch>
      <Route
        exact path='/'
        component={SignInView} />}
      />
      <Route
        exact path='/sign-up'
        component={SignUpView} />}
      />
      {/* {
        loginflag && ( */}
          {/* <> */}
          <MainLayout
            exact
            component={HomeView}
            path="/home"
          />
          <MainLayout
            exact
            component={GameStepView}
            path="/gamehome"
          />
          <MainLayout
            exact
            component={GameBoardView}
            path="/gameboard"
          />
          <MainLayout
            exact
            component={GameResultView}
            path="/gameresult"
          />
          <MainLayout
            exact
            component={LeaderBoardView}
            path="/leaderboard"
          />
          <MainLayout
            exact
            component={GameAdsView}
            path="/gameadsview"
          />
          <MainLayout
            exact
            component={InviteFriendView}
            path="/invitefriend"
          />
          <MainLayout
            exact
            component={NotificationView}
            path="/notification"
          />
          <MainLayout
            exact
            component={StatsView}
            path="/userstats"
          />
          <MainLayout
            exact
            component={ProfileView}
            path="/profile"
          />
          {/* </>
        )} */}
      
      <AdminLayout
        exact
        component={DashboardView}
        path="/admindashboard"
      />
      <AdminLayout
        exact
        component={AdminGameSettingView}
        path="/admingamesetting"
      />
      <AdminLayout
        exact
        component={AdminSettingView}
        path="/adminsetting"
      />
      <AdminLayout
        exact
        component={AddNewExamsView}
        path="/adminaddnewexams"
      />
    </Switch>
  );
};

export default Routes;