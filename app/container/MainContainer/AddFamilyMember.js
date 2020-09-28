import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Header from '../../common/Header';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import Colors from '../../theme/Colors';
import styles from '../../theme/index';
import DateTimePickerModel from 'react-native-modal-datetime-picker';
import moment, { invalid } from 'moment';
import ActionButton from '../../common/ActionButton';
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';
import { Actions } from 'react-native-router-flux';
import { setAddMember } from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

class AddFamilyMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visiblePicker: false,
            dateOfBirth: '',
        }
    }

    renderData = (item, index) => {
        return (
            <View>
                <InputField
                    {...item}
                    refProp={ref => this[item.name] = ref}
                    style={{ width: WINDOW.width - 90, alignSelf: 'center', fontSize: smartScale(2.1), backgroundColor: Colors.skillSectionColor }}
                ></InputField>
            </View>
        )
    }

    doSignUp = async (signUpData) => {
        const { loader } = this.props;
        loader(true);
        var user_id = 50
        const addmember = {
            first_name: signUpData.firstname,
            last_name: signUpData.lastname,
            password: signUpData.password,
            confirmpassword: signUpData.confirmpassword,
            dob: this.state.dateOfBirth,
            email: this.props.user != null && this.props.user != undefined
                ? this.props.user.email
                : '',
            email_confirmation: this.props.user != null && this.props.user != undefined
                ? this.props.user.email
                : '',
            role: 'child',
            id: user_id + 1
        }
        // console.log('add family memeber info-->', addmember)

        if (addmember != null && addmember != undefined) {
            // this.callAddFamilyMember(user.id)
            // this.props.setAddMember(addmember);
            var data = [];
            data.push(addmember);
            // console.log('push data in to array', data)
            // var demo = 'sunil'
            await AsyncStorage.setItem('addmember', JSON.stringify(data))
            Actions.familymanagement();
        }
        // console.log('user.user_id', user.id)
        loader(false);
    }

    // callAddFamilyMember = (childId) => {
    //     const { loader } = this.props;
    //     Keyboard.dismiss();
    //     loader(true)
    //     console.log('child id ........', childId)
    //     const user = {
    //         parent_user_id: this.props.user != undefined && this.props.user != null
    //             ? this.props.user.id
    //             : '',
    //         child_user_id: childId
    //     }
    //     console.log('user info ====>', user)
    //     Actions.familymanagement();
    //     loader(false);
    // }

    render() {

        const { handleSubmit, invalid } = this.props
        const { dateOfBirth, visiblePicker } = this.state
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
                // keyboardType: 'default',
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(5) },
                onSubmitEditing: () => this.lastname.focus()
            },
            {
                name: 'lastname',
                placeholder: 'Last Name',
                autoCorrect: false,
                returnKeyType: 'next',
                // keyboardType: 'default',
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
                containerStyle: { marginTop: smartScale(2.5) },
                onSubmitEditing: () => this.confirmpassword.focus()
            },
            {
                name: 'confirmpassword',
                placeholder: 'Confirm Password',
                autoCorrect: false,
                returnKeyType: 'next',
                secureTextEntry: true,
                autoCapitalize: 'none',
                containerStyle: { marginTop: smartScale(0.5) },
                onSubmitEditing: () => {
                    if (!invalid) {
                        handleSubmit(this.doSignUp)
                    }
                }
            },
        ]

        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <View style={newstyles.container}>
                        {FIELDS_DATA.map((value, key) => this.renderData(value, key))}
                        <TouchableOpacity
                            onPress={() => this.setState({ visiblePicker: true })}
                            style={[styles.loginButtonContainer,
                            {
                                width: WINDOW.width - 90, backgroundColor: Colors.skillSectionColor,
                                alignItems: 'flex-start', paddingLeft: smartScale(0.6),
                            }]}>
                            <Text style={[styles.logisnText, { color: Colors.authenticationButtonColor }]}>
                                {dateOfBirth.toString().length > 0
                                    ? dateOfBirth.toString()
                                    : 'Select Date of Birth'
                                }
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModel
                            maximumDate={yesterday}
                            isVisible={visiblePicker}
                            onConfirm={(data) => {
                                this.setState({
                                    dateOfBirth: moment(data).format('DD/MM/YYYY'),
                                    visiblePicker: false
                                })
                            }}
                            onCancel={() => {
                                this.setState({ visiblePicker: false })
                            }}
                        />
                        {FIELDS_DATA2.map((value, key) => this.renderData(value, key))}
                        <ActionButton
                            title={'Add Member'}
                            containerStyle={[
                                styles.loginButtonContainer,
                                {
                                    marginTop: smartScale(1.5),
                                    backgroundColor: Colors.blue168AE9
                                },
                            ]}
                            onPress={handleSubmit(this.doSignUp)}
                        />
                    </View>

                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const initialState = {
    firstname: '',
    lastname: '',
    password: '',
    confirmpassword: '',
}

const validate = (values) => {
    let errors = [];
    let nameReg = /\s/g;
    let nameMax = /^[a-zA-Z0-9_ ]{0,30}$/;
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
                ? 'Last name should be less than 30 character'
                : undefined;

    errors.password = !values.password
        ? 'Password is required'
        : values.password.length < 6
            ? 'Password should be at least of 6 character'
            : !passwordMax.test(values.password)
                ? 'Please Enter a valid password'
                : undefined;

    errors.confirmpassword = !values.confirmpassword
        ? 'Cofirmpassword is required'
        : values.password != values.confirmpassword
            ? 'Password and Confirm password must be a same'
            : undefined;

    return errors;
}

const withForm = reduxForm({
    form: 'addfamilyForm',
    validate,
    initialValues: initialState,
})

const selector = formValueSelector('addfamilyForm')

const mapStateToProps = (state) => {
    return {
        firstname: selector(state, 'firstname'),
        lastname: selector(state, 'lastname'),
        password: selector(state, 'password')
    }
}

export default connect(mapStateToProps, { setAddMember })(withUser(withForm(withLoader(AddFamilyMember))));

const newstyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: smartScale(3),
        alignItems: 'center',
    }
})