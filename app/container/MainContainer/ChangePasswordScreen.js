import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../common/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';

class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props)
    }

    renderData = (item) => {
        return (
            <View>
                <InputField
                    {...item}
                    refProp={ref => this[item.name] = ref}
                    style={{
                        width: WINDOW.width - 90,
                        alignSelf: 'center',
                        backgroundColor: Colors.skillSectionColor,
                        borderRadius: smartScale(0.5),
                    }}
                ></InputField>
            </View>
        )
    }

    changePassword = () => {

    }

    render() {
        const { handleSubmit } = this.props
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
                containerStyle: { marginTop: smartScale(1) }
            },
            {
                name: 'confirmpassword',
                placeholder: 'Confirm Password',
                returnKeyType: 'next',
                secureTextEntry: true,
                ellipsizeMode: 'tail',
                numberOfLines: 1,
                onSubmitEditing: () => this.newpasswordRef.focus(),
                containerStyle: { marginTop: smartScale(1) }
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
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {FIELD_DATA.map((item) => this.renderData(item))}
                        <TouchableOpacity
                            onPress={handleSubmit(this.changePassword)}
                            style={[newstyle.loginButtonContainer]}>
                            <Text style={newstyle.loginText}>{'Submit'}</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const initialState = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
}

const validate = (values) => {
    let errors = [];
    let passwordMax = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    errors.oldpassword = !values.oldpassword
        ? 'Old password is required'
        : undefined;
    errors.newpassword = !values.newpassword
        ? 'New password is required'
        : values.newpassword.length < 6
            ? 'Password should be at least of 6 character'
            : !passwordMax.test(values.newpassword)
                ? 'Please enter a valid password'
                : undefined;
    errors.confirmpassword = !values.confirmpassword
        ? 'Confirm Password is required'
        : values.confirmpassword = !values.newpassword
            ? 'Password and Confirm password must be a same'
            : undefined
    return errors;
}

const withForm = reduxForm({
    form: 'loginForm',
    validate,
    initialValues: initialState,
})

const selector = formValueSelector('loginForm');

const mapStateToProps = (state) => {
    return {
        password: selector(state, 'password')
    }
}

export default connect(mapStateToProps, {})(withForm(ChangePasswordScreen));

const newstyle = StyleSheet.create({
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3.5),
        // alignSelf: 'center',
        marginStart: smartScale(1),
    },
    loginButtonContainer: {
        backgroundColor: Colors.blue168AE9,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight: 16,
        // paddingLeft: 16,
        borderRadius: 5,
        width: smartScale(22),
        height: smartScale(6),
        alignSelf: 'center',
        marginTop: smartScale(4)
    },
    loginText: {
        fontSize: smartScale(2.5),
        color: Colors.white,
        fontFamily: 'roboto-regular',

    },
})