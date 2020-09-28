import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard, Modal } from 'react-native';
import { smartScale, WINDOW, emailRegex } from '../../utils/AppUtils';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../theme/Colors';
import { Actions } from 'react-native-router-flux';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form'
import { setUser } from '../../redux/actions';
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';

class EnterPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            forgotPassEmail: '',
            forgotPassFirstName: '',
        }
    }


    componentDidMount() {
        console.log('Users Arrays =====>', this.props.usersArray)
    }

    doLogin = (loginData) => {
        const { loader } = this.props;
        Keyboard.dismiss();
        loader(true);
        const user = {
            first_name: this.props.usersArray.first_name,
            email: this.props.usersArray.email,
            password: loginData.password
        }

        if (this.props.usersArray.password === loginData.password) {
            this.props.setUser(user)
            Actions.skills();
            loader(false);
        } else {
            alert('Incorrect Password');
            loader(false);
        }
    }

    setModalVisible = () => {
        this.setState({
            showModal: !this.state.showModal,
            forgotPassEmail: '',
            forgotPassFirstName: '',
        })
    }

    renderModal = () => {
        let FIELDS_DATA = [
            {
                name: 'email',
                placeholder: 'Enter email',
                keyboardType: 'email-address',
                autoCapitalize: "none",
                autoCorrect: false,
                returnKeyType: 'next',
                onChangeText: (text) => this.setState({ forgotPassEmail: text }),
                value: this.state.forgotPassEmail,
                // containerStyle: { width: '65%' },
                onSubmitEditing: () => this.lastname.focus()
            },
            {
                name: 'firstname',
                placeholder: 'Enter first name',
                keyboardType: 'default',
                autoCapitalize: "none",
                autoCorrect: false,
                returnKeyType: 'next',
                onChangeText: (text) => this.setState({ forgotPassFirstName: text }),
                value: this.state.forgotPassFirstName,
                // containerStyle: { width: '65%' },
                onSubmitEditing: () => this.email.focus()
            },
        ]
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={newstyle.modalView}>
                    <Text style={newstyle.modalText}>{'Forgot password?'}</Text>
                    <Text style={newstyle.modalTextDesc}>{'Please enter your email address and first name'}</Text>
                    {FIELDS_DATA.map((value, key) => this.renderTextInput(value, key))}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={[newstyle.openButton, { marginEnd: smartScale(3) }]}
                            onPress={() => this.setModalVisible()}>
                            <Text style={newstyle.textStyle}>{'Close'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={newstyle.openButton}
                            onPress={() => this.callForgotPass()}>
                            <Text style={newstyle.textStyle}>{'Submit'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    callForgotPass = () => {
        Keyboard.dismiss();
        if (this.state.forgotPassEmail != '') {
            if (emailRegex.test(this.state.forgotPassEmail)) {
                if (this.state.forgotPassFirstName != '') {
                    if (this.state.forgotPassEmail === this.props.usersArray.email) {
                        if (this.state.forgotPassFirstName === this.props.usersArray.first_name) {
                            Actions.verifyotp({ usersArray: this.props.usersArray })
                            this.setModalVisible()
                        } else {
                            alert('First name is wrong')
                        }
                    } else {
                        alert('Email is Wrong')
                    }
                } else {
                    alert('First name is required')
                }
            } else {
                alert('Please enter valid email')
            }
        } else {
            alert('Email is required')
        }
    }

    renderTextInput = (item) => {
        return (
            <View>
                <InputField
                    {...item}
                    refProp={ref => this[item.name] = ref}
                    style={{ paddingHorizontal: smartScale(1), fontSize: smartScale(2.3), width: WINDOW.width - 150 }}
                    textInputStyle={{ borderWidth: 1, borderRadius: 0, borderColor: 'grey', }}
                ></InputField>
            </View>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <View style={newstyle.container}>
                <ScrollView>
                    <View style={[newstyle.buttonViewStyle, { marginTop: smartScale(1), marginHorizontal: smartScale(2), marginBottom: smartScale(4) }]}>
                        <AntDesign
                            color={Colors.trophyTextColor}
                            name='back'
                            size={smartScale(5)}
                            style={{ marginEnd: smartScale(2) }}
                            onPress={this.props.isFromFamilyManagement
                                ? () => Actions.reset('login')
                                : () => Actions.pop()}
                        ></AntDesign>
                        <Text style={newstyle.SectionTextStyle}>
                            {'Plaese enter your password'}
                        </Text>
                    </View>
                    <Text style={newstyle.nameTextStyle}>
                        {/* {this.props.usersArray.first_name} {this.props.usersArray.last_name} */}
                        {'Sunil Gorasiya'}
                    </Text>
                    <InputField
                        refProp={(ref) => { this.passwordRef = ref }}
                        placeholder='password'
                        name='password'
                        info='Forgot Password?'
                        onInfoPress={() => this.setModalVisible()}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'done'}
                        containerStyle={{
                            marginTop: smartScale(3),
                            // paddingHorizontal: smartScale(10),
                            // marginBottom: smartScale(10),
                            alignSelf: 'center',
                            width: "85%",
                            // backgroundColor: 'red'
                        }}
                        style={{ paddingHorizontal: smartScale(1), fontSize: smartScale(2.3) }}
                    ></InputField>
                    <TouchableOpacity
                        onPress={handleSubmit(this.doLogin)}
                        style={[newstyle.loginButtonContainer, { alignSelf: 'center' }]}>
                        <Text style={newstyle.loginText}>{'Sign in'}</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    transparent={true}
                    animationType={'slide'}
                    visible={this.state.showModal}
                    onRequestClose={() => {
                        console.log("Close Modal");
                    }}>
                    {this.renderModal()}
                </Modal>
            </View>
        )
    }
}

const initialState = {
    password: ''
}

const validate = (values) => {
    let errors = [];
    errors.password = !values.password ? 'Password is requitred' : undefined;
    return errors;
}

const withForm = reduxForm({
    form: 'loginFrom',
    validate,
    initialValues: initialState
})

const selector = formValueSelector('loginForm')
const mapStateToProps = (state) => {
    return {
        password: selector(state, 'password')
    }
}

export default connect(mapStateToProps, { setUser })(withForm(withUser(withLoader(EnterPasswordScreen))));

const newstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(235,236,237,1)',
    },
    buttonViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        marginTop: smartScale(3),
        fontSize: smartScale(3.5),
    },
    nameTextStyle: {
        fontFamily: 'roboto-regular',
        color: Colors.trophyTextColor,
        fontSize: smartScale(2.5),
        alignSelf: 'center',
    },
    infoStyle: {
        color: Colors.authenticationButtonColor
    },
    loginButtonContainer: {
        backgroundColor: Colors.authenticationButtonColor,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight: 16,
        // paddingLeft: 16,
        borderRadius: 5,
        width: smartScale(23),
        height: smartScale(6),
        marginTop: smartScale(3)
    },
    loginText: {
        fontSize: smartScale(3),
        color: Colors.white,
        fontFamily: 'roboto-regular',
    },
    modalView: {
        backgroundColor: Colors.skillSectionColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%'
    },
    modalText: {
        marginVertical: smartScale(2),
        fontFamily: 'roboto-regular',
        color: Colors.sportsnameColor,
        fontSize: smartScale(3),
        textAlign: 'center',
    },
    modalTextDesc: {
        fontFamily: 'roboto-regular',
        color: Colors.sportsnameColor,
        marginVertical: smartScale(2),
        textAlign: 'center',
        fontSize: smartScale(2.3)
    },
    openButton: {
        backgroundColor: Colors.blue168AE9,
        borderRadius: smartScale(5),
        paddingHorizontal: smartScale(4.5),
        paddingVertical: smartScale(1.5),
        marginVertical: smartScale(2.5),
        elevation: 2,
    },
    textStyle: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: smartScale(2.5)
    },
})