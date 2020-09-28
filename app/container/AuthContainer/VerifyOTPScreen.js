import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../theme/Colors';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import withLoader from '../../redux/actionCreator/withLoader';

class VerifyOTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultOTP: 1234,
            userOTP: '',
        }
    }
    componentDidMount() {
        Keyboard.dismiss()
        console.log('OPT ====>', this.props.usersArray)
    }

    matchOTP = () => {
        const { loader } = this.props;
        Keyboard.dismiss();
        loader(true);
        if (this.state.userOTP != null && this.state.userOTP != undefined) {
            if (this.state.userOTP == this.state.defaultOTP) {
                Actions.setnewpassword({ userArray: this.props.usersArray })
            } else {
                alert('Invalid OTP')
            }
        }
        loader(false)
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <View style={[newstyle.container, { backgroundColor: 'rgba(235,236,237,1)' }]}>
                <View style={{ flex: 1, marginTop: smartScale(7), marginHorizontal: smartScale(3) }}>
                    <Text style={newstyle.sectionTextStyle}>
                        Please enter OTP received on your email
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <InputField
                            refProp={ref => this.otpRef = ref}
                            name='otp'
                            placeholder="Enter OTP"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType={'next'}
                            keyboardType={'number-pad'}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            onChangeText={(text) => this.setState({ userOTP: text })}
                            value={this.state.userOTP}
                            containerStyle={{ marginTop: smartScale(4) }}
                            style={{ width: WINDOW.width - 55, paddingHorizontal: smartScale(1) }}
                        ></InputField>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: smartScale(2.5) }}>
                            <TouchableOpacity
                                style={[newstyle.loginButtonContainer, { marginEnd: smartScale(2) }]}
                                onPress={() => Actions.pop()}
                            >
                                <Text style={newstyle.loginText}>{'Back'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={newstyle.loginButtonContainer}
                                onPress={handleSubmit(this.matchOTP)}
                            >
                                <Text style={newstyle.loginText}>{'Verify'}</Text>
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

export default connect(mapStateToProps, {})(withForm(withLoader(VerifyOTPScreen)));

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