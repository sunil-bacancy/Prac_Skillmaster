import React, { Component } from 'react';
import { Text, View, Keyboard, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from '../../theme/index';
import AppImages from '../../assets/images/index';
import { WINDOW, smartScale, emailRegex, LOGIN_FACEBOOK, LOGIN_APPLE } from '../../utils/AppUtils';
import InputField from '../../common/InputField';
import { connect, Provider } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import Colors from '../../theme/Colors';
import ActionButton from '../../common/ActionButton';
import { Actions } from 'react-native-router-flux';
import { loaderSet } from '../../redux/actions';
import withLoader from '../../redux/actionCreator/withLoader';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { setUser } from '../../redux/actions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    doLogin = () => {
        const { loader } = this.props;
        loader(true)
        //    alert('successful')
    }

    doSocialSignUp = (loginData) => {
        const { loader, toast } = this.props;
        loader(true);
        var requestObj = {};
        var user_id = 0;
        console.log('Login Data ---->>', loginData)
        if (loginData.accountType != LOGIN_APPLE) {
            const user = {
                first_name: loginData.firstName != null ? loginData.firstName : '',
                last_name: loginData.lastName != null ? loginData.lastName : '',
                email: loginData.email != null ? loginData.email : '',
                role: 'parent',
                id: user_id + 1,
            }
            // const social_user = {
            //     uid: loginData.verifyToken != null ? loginData.verifyToken : '',
            //     provider: loginData.accountType != null ? loginData.accountType : '',
            //     full_response: loginData,
            // }
            // const requestObj = {
            //     user: user,
            //     social_user: social_user,
            // }
            this.props.setUser(user)
            console.log('FB user_Info====>', user)
            Actions.skills();
        }
        loader(false)
    }

    loginWithFB = () => {
        const { loader, toast } = this.props;
        loader(true);
        try {
            LoginManager.logOut();
            LoginManager.logInWithPermissions([
                'email',
                'public_profile',
                'user_birthday',
            ]).then((results) => {
                if (results.isCancelled) {
                    console.log('login canceles')
                    loader(false)
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        console.log('Access token data', data);
                        const accessToken = data.accessToken;
                        const responseInfoCallback = (error, info) => {
                            if (error) {
                                console.log(error)
                                setTimeout = (() => {
                                    toast({ text: error })
                                }, 200)
                            } else {
                                const { id, last_name, first_name, email, name, picture } = info;
                                const socialObject = {
                                    verifyToken: id,
                                    firstName: first_name,
                                    lastName: last_name,
                                    email,
                                    userName: name,
                                    accountType: LOGIN_FACEBOOK,
                                };
                                loader(false)
                                console.log('socialObject', socialObject);
                                this.doSocialSignUp(socialObject);
                            }
                        }
                        const profileRequestParams = {
                            fields: {
                                string: 'id, name, email, last_name, first_name ,birthday'
                            }
                        };
                        const profileRequestConfig = {
                            httpMethod: 'GET',
                            version: 'v2.5',
                            parameters: profileRequestParams,
                            accessToken,
                        }
                        const infoRequest = new GraphRequest(
                            '/me',
                            profileRequestConfig,
                            responseInfoCallback,
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    })
                }
            })
        } catch (e) {
            console.log(e);
            setTimeout = (() => {
                toast({ text: e })
            }, 200)
        }
    }

    loginWithGoogle = () => {

    }

    onPrivacyPolicyTapped = () => {
        Actions.privacypolicy({ title: 'Privacy Policy' })
    }

    onTOSTapped = () => {
        Actions.privacypolicy({ title: 'Terms Of Service' })
    }

    render() {
        const { handleSubmit } = this.props;
        // console.log('props', this.props)

        return (
            <View style={[styles.container, { backgroundColor: 'rgba(74,74,74,1)' }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Keyboard.dismiss();
                            // this.scrollRef.scrollToEnd({ animated: true });
                        }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={AppImages.app_icon} resizeMode='contain' style={{ height: 100, width: WINDOW.width - 90 }}></Image>
                            <InputField
                                refProp={ref => this.emailRefs = ref}
                                name='email'
                                placeholder="Email"
                                // changeSuccessColor={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType={'next'}
                                keyboardType={'email-address'}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                containerStyle={{ marginTop: smartScale(3.5) }}
                                style={{ width: WINDOW.width - 90, alignSelf: 'center' }}
                            ></InputField>
                            <TouchableOpacity
                                onPress={handleSubmit(this.doLogin)}
                                style={styles.loginButtonContainer}>
                                <Text style={styles.loginText}>{'Sign in'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.signup()}>
                                <Text
                                    style={{
                                        fontSize: smartScale(2.4),
                                        color: Colors.white,
                                        fontFamily: 'audiowide-regular',
                                        marginTop: smartScale(2)
                                    }}
                                >{'Create Account'}</Text>
                            </TouchableOpacity>
                            <ActionButton
                                title={'Sign in with Facebook'}
                                icon={'facebook-square'}
                                containerStyle={{
                                    marginTop: smartScale(5),
                                    backgroundColor: Colors.facebookBtnColor,
                                    // width: 320,
                                    height: 45,
                                }}
                                onPress={() => this.loginWithFB()}
                            >
                            </ActionButton>
                            <ActionButton
                                title={'Sign in with Google'}
                                icon={'google-plus'}
                                containerStyle={{
                                    marginTop: smartScale(3),
                                    backgroundColor: Colors.googleBtnColor,
                                    height: 45
                                }}
                                onPress={() => this.loginWithGoogle()}
                            ></ActionButton>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <View style={newStyle.privacyPolicyContainer}>
                    <TouchableOpacity onPress={() => this.onPrivacyPolicyTapped()}>
                        <Text style={[newStyle.privacyPolicy, { marginBottom: smartScale(1.5) }]}>{'Privacy Policy'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTOSTapped()}>
                        <Text style={[newStyle.privacyPolicy, { marginBottom: smartScale(3) }]}>{'Terms of Service'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const inititialState = {
    email: ''
}

const validate = (values) => {
    let errors = {};
    errors.email = !values.email
        ? 'Plaese enter Email.'
        : !emailRegex.test(values.email)
            ? 'Please enter valid email.'
            : undefined;
    return errors;
}

const withForm = reduxForm({
    form: 'loginForm',
    validate,
    initialValues: inititialState
})

const selector = formValueSelector('loginForm');

const mapStateToProps = (state) => {
    return {
        email: selector(state, 'email'),
    };
}

export default connect(mapStateToProps, { setUser, })(withForm(withLoader(LoginScreen)));

const newStyle = StyleSheet.create({
    privacyPolicy: {
        color: Colors.white,
        fontFamily: 'robote-regular',
        textAlign: 'center'
    },
    privacyPolicyContainer: {
        marginVertical: smartScale(0.5)
    }
})