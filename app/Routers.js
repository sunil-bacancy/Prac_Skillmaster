import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Colors from './theme/Colors';
import { smartScale } from './utils/AppUtils';
import { Scene, Router, Actions, Tabs, Stack } from 'react-native-router-flux';
import Tabicon from './common/Tabicon';

//SplashScreen
import SplashScreen from './container/InitialScreen/SplashScreen';

//AuthContainer
import LoginScreen from './container/AuthContainer/LoginScreen';
import SignupScreen from './container/AuthContainer/SignupScreen';
import SignUpWithEmail from './container/AuthContainer/SignUpWithEmail';
import PrivacyPolicyScreen from './container/AuthContainer/PrivacyPolicyScreen';
import EnterPasswordScreen from './container/AuthContainer/EnterPasswordScreen';
import VerifyOTPScreen from './container/AuthContainer/VerifyOTPScreen';
import SetNewPasswordScreen from './container/AuthContainer/SetNewPasswordScreen';

//Tab Navigation
import SkillScreen from './container/MainContainer/SkillScreen';
import LearnSkillScreen from './container/MainContainer/LearnSkillScreen';
import StoreScreen from './container/MainContainer/StoreScreen';
import PersonalRecordsScreen from './container/MainContainer/PersonalRecordsScreen';
import CoachesLessonsScreen from './container/MainContainer/CoachesLessonsScreen';
import FamilyManagementScreen from './container/MainContainer/FamilyManagementScreen';

import AddFamilyMember from './container/MainContainer/AddFamilyMember';
import FamilyAccountSettings from './container/MainContainer/FamilyAccountSettings';
import TrophyScreen from './container/MainContainer/TrophyScreen';
import LessonsScreen from './container/MainContainer/LessonsScreen';

class Routers extends Component {
    constructor(props) {
        super(props);
    }

    _routeScreens() {
        return (
            <Scene key='root'>
                {/* <Scene key='splash' component={SplashScreen} hideNavBar={true} initial={true}></Scene> */}
                {/* <Scene key='login' component={LoginScreen} hideNavBar={true} ></Scene> */}
                {/* <Scene key='signup' component={SignupScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key='signupemail' component={SignUpWithEmail} hideNavBar={true} ></Scene> */}
                {/* <Scene key='header' component={Header} hideNavBar={true}></Scene> */}
                <Scene key='skills' component={SkillScreen} hideNavBar={true}></Scene>
                {/* <Scene key='learnskills' component={LearnSkillScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key='privacypolicy' component={PrivacyPolicyScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key='store' component={StoreScreen} hideNavBar={true} initials></Scene> */}
                {/* <Scene key="personalrecords" component={PersonalRecordsScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key="familymanagement" component={FamilyManagementScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key='coacheslessons' component={CoachesLessonsScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key="addfamilymember" component={AddFamilyMember} hideNavBar={true}></Scene> */}
                {/* <Scene key="familyaccountsettings" component={FamilyAccountSettings} hideNavBar={true}></Scene> */}
                {/* <Scene key='enterpassword' component={EnterPasswordScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key='verifyotp' component={VerifyOTPScreen} hideNavBar={true}></Scene> */}
                {/* <Scene key='setnewpassword' component={SetNewPasswordScreen} hideNavBar={true} ></Scene> */}
                <Scene key='trophy' component={TrophyScreen} hideNavBar={true}></Scene>
                <Scene key='lessons' component={LessonsScreen} hideNavBar={true}></Scene>
                <Scene hideNavBar panHandlers={null}>
                    <Tabs>
                        {/* key="dashboard"
                        legacy
                        showLabel={false}
                        tabBarPosition="bottom"
                        backToInitial
                        tabBarStyle={styles.tabBar}
                        swipeEnabled={false}
                        // tabBarOnPress={obj => {
                            //     console.log('--', obj)
                            //     var scene = obj.navigation.state;
                            //     if (scene.key === 'shopTab' && Actions.currentScene !== 'search') {
                            //         Actions.reset('shop');
                            //     } else if (scene.key === 'trophyTab') {
                            //         Actions.reset('personalrecords')
                            //     } else {
                            //         Actions[scene.key]();
                            //     }
                            // }}
                            hideNavBar = { true}
                            panHandlers = { null} */}

                        < Stack key="shopTab" title={'Shop'} icon={Tabicon} hideNavBar={true} >
                            <Scene key='store' component={StoreScreen} hideNavBar={true}></Scene>
                        </Stack>
                        <Stack key="trophyTab" title={'Trophy'} hideNavBar={true}>
                            <Scene key="personalrecords" component={PersonalRecordsScreen} hideNavBar={true}></Scene>
                        </Stack>
                        <Stack key="techTab" title={'Teach'} hideNavBar={true}>
                            <Scene key="teach" component={CoachesLessonsScreen} hideNavBar={true}></Scene>
                        </Stack>
                        <Scene key="accountswitchTab" title={'Accountswitch'} hideNavBar={true}>
                            <Scene key="accountswitch" component={FamilyManagementScreen} hideNavBar={true}></Scene>
                        </Scene>
                    </Tabs>
                </Scene>
            </Scene >
        )
    }

    render() {
        return <Router>{this._routeScreens()}</Router>
    }
}

export default Routers;

const styles = StyleSheet.create({
    tabBar: {
        borderTopWidth: smartScale(1),
        borderTopColor: Colors.black,
        backgroundColor: Colors.skillSectionColor,
    }
})