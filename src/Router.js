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
                    
                </Scene>
                
                
            </Scene>
        </Router>
    )
}

export default RouterComponent