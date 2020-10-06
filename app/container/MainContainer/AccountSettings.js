import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../common/Header';
import BottomBar from '../../common/BottomBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { smartScale } from '../../utils/AppUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import withUser from '../../redux/actionCreator/withUser';
import withLoader from '../../redux/actionCreator/withLoader';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

class AccountSettings extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: smartScale(2), flexDirection: 'row', marginHorizontal: smartScale(3) }}>
                        <Icon name='settings-outline' size={smartScale(6)}></Icon>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={newstyle.SectionTextStyle}>
                                Account Settings
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: smartScale(5) }}>
                        <Icon name='md-person' size={40}></Icon>
                        <Text style={[newstyle.SectionTextStyle, { fontSize: smartScale(2.5) }]}>
                            {this.props.user.first_name} {this.props.user.last_name}
                        </Text>
                    </View>
                    <View style={{ marginTop: smartScale(10) }}>
                        <InputField></InputField>
                    </View>
                </KeyboardAwareScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

const withForm = reduxForm({
    login: ''
})

export default connect(null, {})(withUser(withLoader(AccountSettings)));

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