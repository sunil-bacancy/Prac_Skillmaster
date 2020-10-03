import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Switch, TextInput } from 'react-native';
import Header from '../../common/Header';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import { Actions } from 'react-native-router-flux';
import ActionButton from '../../common/ActionButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BottomBar from '../../common/BottomBar';

class SelectLevelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: false,
            coachCode: '',
            levelArr: [
                {
                    text: 'Beginner',
                },
                {
                    text: 'Intermediate',
                },
                {
                    text: 'Advance',
                }
            ]
        }
    }

    toggleSwitch = (value) => {
        this.setState({
            switch: value,
            coachCode: ''
        })
    }

    onLevelTapped = (item) => {
        var tempArr = [];
        tempArr = this.state.levelArr;
        for (let index = 0; index < tempArr.length; index++) {
            const element = tempArr[index];
            if (element.text === item.text) {
                element.isSelected = true;
            } else {
                element.isSelected = false;
            }
        }
        this.setState({
            levelArr: tempArr,
        })
    }

    callSetTeamCode = () => {
        const { loader } = this.props;
        var userLevel = '';
        this.state.levelArr.forEach((element) => {
            if (element.isSelected === true) {
                userLevel = element.text;
            }
        })
        Actions.trophy({ skillMapDetail: this.props.skillMapDetail, userLevel: userLevel })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: smartScale(2) }}>
                        <Text style={newstyle.containertextstyle}>Please select your skill level</Text>
                    </View>
                    <View style={{ marginTop: smartScale(4) }}>
                        <FlatList
                            data={this.state.levelArr}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { this.onLevelTapped(item) }}>
                                    <View style={[
                                        newstyle.skilllsectionstyle,
                                        item.isSelected === true
                                            ? { backgroundColor: Colors.orangeE97516 }
                                            : {}
                                    ]}>
                                        <Text style={newstyle.sportstextstyle}>{item.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        ></FlatList>
                    </View>
                    <View style={newstyle.switchContainer}>
                        <Text style={newstyle.containertextstyle}>Would you like to have a coach?</Text>
                        <Switch
                            value={this.state.switch}
                            // trackColor={{ false: 'rgba(230,230,230,1)' }}
                            disabled={false}
                            style={{ alignSelf: 'center' }}
                            onValueChange={this.toggleSwitch}
                        ></Switch>
                    </View>
                    {this.state.switch ? (
                        <TextInput
                            style={{
                                borderColor: 'grey',
                                borderWidth: 1,
                                marginHorizontal: smartScale(2),
                                marginTop: smartScale(1.5),
                                height: smartScale(7),
                                paddingHorizontal: smartScale(2)
                            }}
                            onChangeText={(text) => {
                                this.setState({ coachCode: text })
                            }}
                            value={this.state.coachCode}
                            placeholder={'Enter team code'}
                        ></TextInput>
                    ) : null}
                    <ActionButton
                        onPress={() => { this.callSetTeamCode() }}
                        title={'Submit'}
                        containerStyle={[
                            newstyle.loginButtonContainer,
                            {
                                width: WINDOW.width - 110,
                                borderRadius: smartScale(50),
                                paddingLeft: smartScale(0),
                                backgroundColor: Colors.blue168AE9,
                                marginBottom: smartScale(12),
                                marginTop: smartScale(4),
                                alignSelf: 'center',
                            },
                        ]}
                    ></ActionButton>
                </KeyboardAwareScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

export default SelectLevelScreen;

const newstyle = StyleSheet.create({
    containertextstyle: {
        color: 'rgba(62,62,62,1)',
        fontSize: smartScale(3.4),
        fontFamily: 'audiowide-regular',
        textAlign: 'center',
    },
    skilllsectionstyle: {
        borderRadius: smartScale(2),
        backgroundColor: Colors.skillSectionColor,
        // margin: smartScale(1),
        alignItems: 'center',
        paddingVertical: smartScale(1.5),
        marginHorizontal: smartScale(15),
        marginVertical: smartScale(3)
        // paddingHorizontal: smartScale(10),
    },
    sportstextstyle: {
        color: Colors.sportsnameColor,
        alignItems: 'center',
        fontSize: smartScale(3),
        fontFamily: 'audiowide-regular',
    },
    switchContainer: {
        marginTop: smartScale(2.5),
        // marginHorizontal: smartScale(15),
    },
    loginButtonContainer: {
        backgroundColor: Colors.authenticationButtonColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 5,
        // width: smartScale(20),
        height: smartScale(5.5),
    },
})