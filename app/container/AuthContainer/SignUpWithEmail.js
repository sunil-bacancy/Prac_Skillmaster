import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from 'react-native';
import InputField from '../../common/InputField';
import styles from '../../theme/index';
import AppImages from '../../assets/images/index';
import Colors from '../../theme/Colors';
import { WINDOW, smartScale, emailRegex } from '../../utils/AppUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { reduxForm, formValueSelector, touch } from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DateTimePickerModel from 'react-native-modal-datetime-picker';
import moment from 'moment';
import withLoader from '../../redux/actionCreator/withLoader';

class SignUpWithEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblePicker: false,
            dateOfBirth: '',
        }
    }

    // componentDidMount = () => {
    //     console.disableYellowBox = true;
    // }

    renderData = (item, index) => {
        return (
            <View>
                <InputField
                    {...item}
                    refProp={ref => this[item.name] = ref}
                    // onSubmitEditing={() => this.item.name.focus()}
                    style={{ width: WINDOW.width - 90, alignSelf: 'center', fontSize: smartScale(2.1) }}
                ></InputField>
            </View>
        )
    }

    doSignup = () => {
        const { loader } = this.props;
        loader(true)
        // alerst('alerst')
    }

    render() {

        const { handleSubmit } = this.props;
        const { visiblePicker, dateOfBirth } = this.state;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1)
        console.log("yesterday---->", yesterday)

        let FIELDS_DATA = [
            {
                name: 'firstname',
                placeholder: 'First Name',
                autoCorrect: false,
                returnKeyType: 'next',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(5) },
                onSubmitEditing: () => this.lastname.focus()
            },
            {
                name: 'lastname',
                placeholder: 'Last Name',
                autoCorrect: false,
                returnKeyType: 'next',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(0.5) },
                onSubmitEditing: () => this.email.focus()
            },
            {
                name: 'email',
                placeholder: 'Email',
                autoCorrect: false,
                returnKeyType: 'next',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(0.5) },
                onSubmitEditing: () => this.confirmemail.focus()
            },
            {
                name: 'confirmemail',
                placeholder: 'Confirm email',
                autoCorrect: false,
                returnKeyType: 'next',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(0.5) },
                onSubmitEditing: () => this.password.focus()
            },
        ]

        let FIELDS_DATA2 = [
            {
                name: 'password',
                placeholder: 'Password',
                autoCorrect: false,
                returnKeyType: 'next',
                secureTextEntry: true,
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(3.5) },
                onSubmitEditing: () => this.confirmpassword.focus()
            },
            {
                name: 'confirmpassword',
                placeholder: 'Confirm Password',
                autoCorrect: false,
                returnKeyType: 'next',
                secureTextEntry: true,
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(0.5) }
            },
        ]
        return (
            <View style={[styles.container, { backgroundColor: 'rgba(74,74,74,1)' }]}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>

                    <TouchableWithoutFeedback
                        onPress={() => { Keyboard.dismiss() }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={AppImages.app_icon} resizeMode='contain' style={{ height: 100, width: WINDOW.width - 90, marginTop: smartScale(6.5) }}></Image>
                            {FIELDS_DATA.map((value, key) => this.renderData(value, key))}
                            <TouchableOpacity
                                onPress={() => this.setState({ visiblePicker: true })}
                                style={[styles.loginButtonContainer,
                                {
                                    width: WINDOW.width - 90, backgroundColor: Colors.white,
                                    alignItems: 'flex-start', paddingLeft: smartScale(0.6),
                                }]}>
                                <Text style={[styles.logisnText, { color: Colors.authenticationButtonColor }]}>
                                    {dateOfBirth.toString().length > 0
                                        ? dateOfBirth.toString()
                                        : 'Select Date of Birth'}
                                </Text>
                            </TouchableOpacity>
                            <DateTimePickerModel
                                maximumDate={yesterday}
                                isVisible={visiblePicker}
                                mode='date'
                                onConfirm={(date) => {
                                    var currentDate = moment().format('DD/MM/YYYY');
                                    var selectedDate = moment(date).format('DD/MM/YYYY');
                                    console.log('currentDate--->', currentDate);
                                    console.log('selectedDate---->', selectedDate);

                                    if (currentDate === selectedDate) {
                                        this.setState({
                                            dateOfBirth: moment(yesterday).format('DD/MM/YYYY'),
                                            visiblePicker: false,
                                        })
                                    } else {
                                        this.setState({
                                            dateOfBirth: moment(date).format('DD/MM/YYYY'),
                                            visiblePicker: false,
                                        })
                                    }
                                }}
                                onCancel={() => {
                                    this.setState({ visiblePicker: false })
                                }}
                            />
                            {FIELDS_DATA2.map((value, key) => this.renderData(value, key))}
                            <TouchableOpacity style={[styles.loginButtonContainer, { marginTop: smartScale(1) }]}
                                onPress={handleSubmit(this.doSignup)}>
                                <Text style={[styles.loginText, { fontSize: smartScale(2) }]}>{'Sign up'}</Text>
                            </TouchableOpacity>
                            <Text onPress={() => { Actions.login() }} style={{ color: Colors.authenticationButtonColor, fontSize: smartScale(1.9), marginTop: smartScale(3) }}>{'Already have an Account? Sign in'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            </View >
        )
    }
}

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    confirmemail: '',
    password: '',
    confirmpassword: '',
}

const validate = (values) => {
    let errors = [];
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let nameReg = /\s/g;
    let nameMax = /^[a-zA-Z0-9]{0,30}$/;
    let passwordMax = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    errors.firstname = !values.firstname
        ? 'First name is required'
        : nameReg.test(values.firstname)
            ? 'First name cannot contain white space'
            : !nameMax.test(values.firstname)
                ? 'First name should be less than 30 character'
                : undefined;

    errors.lastname = !values.lastname
        ? 'Last name is required'
        : nameReg.test(values.lastname)
            ? 'Last name cannot contain white space'
            : !nameMax.test(values.lastname)
                ? 'Last name should be less than 30 char'
                : undefined;

    errors.email = !values.email
        ? 'Email is required'
        : !emailRegex.test(values.email)
            ? 'Please Enter valid Email address'
            : undefined;

    errors.confirmemail = !values.confirmemail
        ? 'Confirm Email is required'
        : values.email != undefined &&
            values.email != null &&
            values.confirmemail != undefined &&
            values.confirmemail != null
            ? values.email.toLowerCase() != values.confirmemail.toLowerCase()
                ? 'Email and Confirm Email must be a same'
                : undefined
            : undefined

    errors.password = !values.password
        ? 'Password is required'
        : values.password.length < 6
            ? 'Password should be at least of 6 character'
            : !passwordMax.test(values.password)
                ? 'Please enter a valid password'
                : undefined;

    errors.confirmpassword = !values.confirmpassword
        ? 'Confirm Password is required'
        : values.password != values.confirmpassword
            ? 'Password and Confirm password must be a same'
            : undefined;

    return errors;

}

const withForm = reduxForm({
    form: 'signupForm',
    validate,
    initialValues: initialState
})

const selector = formValueSelector('signupForm')

const mapStateToProps = (state) => {
    return {
        firstname: selector(state, 'firstname'),
        lastname: selector(state, 'lastname'),
        email: selector(state, 'email'),
        password: selector(state, 'password')
    }
}
export default withForm(withLoader(connect(mapStateToProps, {})(SignUpWithEmail)));