import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { smartScale, WINDOW } from '../utils/AppUtils'
import Colors from '../theme/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';

class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModelVisible: false,
        }
    }

    onShopPress() {
        Actions.store()
    }

    onTrophyPressed() {
        Actions.personalrecords()
    }

    onFamilyPressed() {
        Actions.familymanagement()
    }

    onCoachPressed() {
        Actions.coacheslessons()
    }
    render() {
        const { isModelVisible } = this.state
        return (
            <View style={newstyles.topContainer}>
                <TouchableOpacity
                    style={newstyles.tabIcon}
                    onPress={() => this.onShopPress()}>
                    <Entypo
                        name="shop"
                        size={smartScale(6)}
                        color={
                            Actions.currentScene === 'store'
                                ? Colors.tabIconActiveColor
                                : Colors.tabIconInActiveColor
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={newstyles.tabIcon}
                    onPress={() => this.onTrophyPressed()}>
                    <Ionicons
                        name="md-trophy"
                        size={smartScale(6)}
                        color={
                            Actions.currentScene === 'personalrecords'
                                ? Colors.tabIconActiveColor
                                : Colors.tabIconInActiveColor
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={newstyles.tabIcon}
                    onPress={() => this.onCoachPressed()}>
                    <MaterialCommunityIcons
                        name="teach"
                        size={smartScale(6)}
                        color={
                            Actions.currentScene === 'coacheslessons'
                                ? Colors.tabIconActiveColor
                                : Colors.tabIconInActiveColor
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={newstyles.tabIcon}
                    onPress={() => this.onFamilyPressed()}>
                    <MaterialCommunityIcons
                        name="account-switch"
                        size={smartScale(6)}
                        color={
                            Actions.currentScene === 'familymanagement'
                                ? Colors.tabIconActiveColor
                                : Colors.tabIconInActiveColor
                        }
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default BottomBar;

const newstyles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        // flex: 1,
        marginBottom:
            Platform.OS === 'ios'
                ? iPhoneX
                    ? smartScale(5)
                    : smartScale(0)
                : smartScale(0),
        borderTopWidth: smartScale(0.2),
        borderTopColor: Colors.black,
        width: '100%',
        height:
            Platform.OS === 'ios'
                ? iPhoneX
                    ? smartScale(60)
                    : smartScale(55)
                : smartScale(8),
        backgroundColor: Colors.skillSectionColor,
    },
    tabIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingLeft: smartScale(5),
        // paddingRight: smartScale(5),
        // marginTop: Platform.OS === 'ios' ? smartScale(5) : smartScale(5),
        // height: smartScale(40),
    },
});