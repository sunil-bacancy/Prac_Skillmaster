import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../theme/Colors';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';
import { setUser } from '../../redux/actions';

class SetNewPasswordScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('======>', this.props.userArray)
    }

    renderTextInput = (item) => {
        return (
            <View>
                <InputField
                    {...item}
                    refProp={ref => this[item.name] = ref}
                    style={{ width: WINDOW.width - 55, paddingHorizontal: smartScale(1) }}
                ></InputField>
            </View>
        )
    }

    changePassword = (loginData) => {
        const { loader } = this.props
        Keyboard.dismiss();
        loader(true);
        // const user = {
        //     first_name: this.props.userArray.first_name,
        //     email: this.props.userArray.email,
        //     password: loginData.newpassword,
        //     // password: loginData.password,
        //     confirmpassword: loginData.confirmpassword,
        // }
        // this.props.setUser(user)
        // alert('Password is changed successfully.')
        Actions.login()
        loader(false);
    }

    render() {
        const { handleSubmit } = this.props;
        const FIELD_DATA = [
            {
                name: 'newpassword',
                placeholder: "New Password",
                secureTextEntry: true,
                autoCapitalize: "none",
                autoCorrect: false,
                returnKeyType: 'next',
                keyboardType: 'default',
                ellipsizeMode: "tail",
                numberOfLines: 1,
                containerStyle: { marginTop: smartScale(4) }
            },
            {
                name: 'confirmpassword',
                placeholder: "Confirm Password",
                secureTextEntry: true,
                autoCapitalize: "none",
                autoCorrect: false,
                returnKeyType: 'next',
                keyboardType: 'default',
                ellipsizeMode: "tail",
                numberOfLines: 1,
                containerStyle: { marginTop: smartScale(1.5) }
            }
        ]
        return (
            <View style={[newstyle.container, { backgroundColor: 'rgba(235,236,237,1)' }]}>
                <View style={{ flex: 1, marginTop: smartScale(7), marginHorizontal: smartScale(3) }}>
                    <Text style={newstyle.sectionTextStyle}>
                        Please enter OTP received on your email
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        {FIELD_DATA.map((value, key) => this.renderTextInput(value, key))}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: smartScale(2.5) }}>
                            <TouchableOpacity
                                style={[newstyle.loginButtonContainer, { marginEnd: smartScale(2) }]}
                                onPress={() => Actions.pop()}
                            >
                                <Text style={newstyle.loginText}>{'Back'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={newstyle.loginButtonContainer}
                                onPress={handleSubmit(this.changePassword)}
                            >
                                <Text style={newstyle.loginText}>{'Submit'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        )
    }
}

const initialState = {
    otp: '',
}

const validate = (values) => {
    let errors = [];
    errors.otp = !values.otp ? 'OTP is required' : undefined;
    return errors;
}

const withForm = reduxForm({
    form: 'loginForm',
    validate,
    initialValues: initialState
})

const selector = formValueSelector('loginFrom')

const mapStateToProps = (state) => {
    return {
        otp: selector(state, 'otp')
    }
}

export default connect(mapStateToProps, { setUser })(withForm(withLoader(withUser(SetNewPasswordScreen))));

const newstyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    sectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3.5),
    },
    loginButtonContainer: {
        backgroundColor: Colors.authenticationButtonColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 5,
        width: smartScale(21),
        height: smartScale(6),
    },
    loginText: {
        fontSize: smartScale(2.5),
        color: Colors.white,
        fontFamily: 'roboto-regular',
    },
})