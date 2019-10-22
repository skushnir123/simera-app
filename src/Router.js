import React from 'react'
import {Scene, Router} from 'react-native-router-flux'
import Welcome from './components/auth/Welcome'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import SignupLoader from './components/auth/SignupLoader';
import Overview from './components/main/Overview';
import CreateNewTeam from './components/main/CreateNewTeam';
import CreateNewTeamLoader from './components/main/CreateNewTeamLoader';
import JoinNewTeam from './components/main/JoinNewTeam';
import Schedule from './components/main/Schedule';
import CreateNewGame from './components/main/CreateNewGame';
import NewEventLoader from './components/main/NewEventLoader';
import EventDetail from './components/main/EventDetail';
import EditGameScreen from './components/main/EditGameScreen';
import CreateNewPractice from './components/main/CreateNewPractice';
import PracticeDetail from './components/main/PracticeDetail';
import EditPractice from './components/main/EditPractice';
import CreateNewEvent from './components/main/CreateNewEvent';
import GeneralEventDetail from './components/main/GeneralEventDetail';
import EditGeneralEvent from './components/main/EditGeneralEvent';
import Roster from './components/main/Roster';
import More from './components/main/More';
import Profile from './components/main/Profile';
import SimeraLive from './components/main/SimeraLive';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar  >
                <Scene key="auth" >
                    <Scene hideNavBar key="welcome" component={Welcome} title="Login"></Scene>
                    <Scene key="login" component={Login} title="Login"></Scene>
                    <Scene key="signup" component={Signup} title="Signup"></Scene>
                    <Scene  hideNavBar key="signupLoader" component={SignupLoader} title="Signup"></Scene>
                </Scene>
                <Scene activeTintColor={"#16a085"} tabs={true} key="main" >
                    <Scene key="Overview">
                        <Scene initial hideNavBar key="overview_initial" component={Overview} title="Overview"></Scene>
                        <Scene  key="create_new_team" component={CreateNewTeam} title="Create"></Scene>
                        <Scene  key="join_new_team" component={JoinNewTeam} title="Join"></Scene>
                        <Scene hideNavBar  key="create_new_team_loader" component={CreateNewTeamLoader} title="Create"></Scene>
                    </Scene>
                    <Scene key="schedule" title="Schedule">
                        <Scene initial  key="schedule_initial" component={Schedule} title="Schedule"></Scene>
                        <Scene  key="simera_live" component={SimeraLive} title="SimeraLive"></Scene>
                        <Scene  key="add_game" component={CreateNewGame} title="Create"></Scene>
                        <Scene  key="add_practice" component={CreateNewPractice} title="Create"></Scene>
                        <Scene  key="add_event" component={CreateNewEvent} title="Create"></Scene>
                        <Scene  key="event_detail" path="event_detail/:id" component={EventDetail} title="Details"></Scene>
                        <Scene  key="practice_detail" path="practice_detail/:id" component={PracticeDetail} title="Details"></Scene>
                        <Scene  key="general_event_detail" path="general_event_detail/:id" component={GeneralEventDetail} title="Details"></Scene>
                        <Scene  key="edit_game" path="edit_game/:opponent" component={EditGameScreen} title="Edit"></Scene>
                        <Scene  key="edit_practice" path="edit_practice/:location" component={EditPractice} title="Edit"></Scene>
                        <Scene  key="edit_general_event" path="edit_general_event/:location" component={EditGeneralEvent} title="Edit"></Scene>
                        <Scene hideNavBar  key="new_event_loader" component={NewEventLoader} title="Create"></Scene>
                    </Scene>
                    <Scene key="roster" title="Roster">
                        <Scene initial key="roster_initial" component={Roster} title="Roster"></Scene>
                    </Scene>
                    <Scene key="more" title="More">
                        <Scene initial key="more_initial" component={More} title="More"></Scene>
                        <Scene key="profile" component={Profile} title="Profile"></Scene>
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent