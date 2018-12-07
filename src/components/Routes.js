import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom"
import MainPage from './MainPage';
import LeaderboardPage from './LeaderboardPage';
import UserPage from './UserPage';



const Routes = () => (
  <React.Fragment>
    <Switch>
    <Route path="/gallery/user/:id" component={UserPage} />
    <Route path="/gallery/:date?" component={MainPage} />
    <Redirect exact from="/" to="/gallery/"/>

    <Route path="/leaderboard" component={LeaderboardPage} />

    </Switch>
  </React.Fragment>
)

export default Routes