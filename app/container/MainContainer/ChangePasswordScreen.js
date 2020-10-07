import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../common/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { smartScale } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';

class ChangePasswordScreen extends Component {
    render() {

        const FIELD_DATA = [
            {
                name: 'oldpassword',
                placeholder: 'Old Password',
                returnKeyType: 'next',
                secureTextEntry: true,
                ellipsizeMode: 'tail',
                numberOfLines: 1,
                onSubmitEditing: () => this.newpasswordRef.focus(),
                containerStyle: { marginTop: smartScale(6) }
            },
            {
                name: 'newpassword',
                placeholder: 'New Password',
                returnKeyType: 'next',
                secureTextEntry: true,
                ellipsizeMode: 'tail',
                numberOfLines: 1,
                onSubmitEditing: () => this.newpasswordRef.focus(),
                containerStyle: { marginTop: smartScale(3) }
            },
            {
                name: 'confirmpassword',
                placeholder: 'Confirm Password',
                returnKeyType: 'next',
                secureTextEntry: true,
                ellipsizeMode: 'tail',
                numberOfLines: 1,
                onSubmitEditing: () => this.newpasswordRef.focus(),
                containerStyle: { marginTop: smartScale(3) }
            }
        ]
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: smartScale(2), flexDirection: 'row', marginHorizontal: smartScale(3) }}>
                        <Icon name='settings-outline' size={smartScale(6)}></Icon>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={newstyle.SectionTextStyle}>
                                Change Password
                            </Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default ChangePasswordScreen;

const newstyle = StyleSheet.create({
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3.5),
        // alignSelf: 'center',
        marginStart: smartScale(1),
    },
})