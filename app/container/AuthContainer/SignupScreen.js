import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import AppImages from '../../assets/images/index';
import ActionButton from '../../common/ActionButton';
import { Actions } from 'react-native-router-flux';
import styles from '../../theme';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { WINDOW, smartScale, LOGIN_FACEBOOK, LOGIN_GOOGLE, LOGIN_APPLE } from '../../utils/AppUtils';
import Colors from '../../theme/Colors'
import withLoader from '../../redux/actionCreator/withLoader';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
import { loaderSet } from '../../redux/actions';
import { setUser } from '../../redux/actions';
import { connect } from 'react-redux';

class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            gettingLoginStatus: true,
          };
    }

    componentDidMount(){
        GoogleSignin.configure({
            scopes: ['profile', 'email', 'openid'],
            webClientId:'496163987837-b3k7dvvt3nlrg49nuf93a25s1kpuoobr.apps.googleusercontent.com',
            
            androidClientId:'496163987837-q4nq02s8psj968sr3t15q0grgavrn2on.apps.googleusercontent.com',
            // iosClientId: IOS_CLIENT_ID
        });
        
        // GoogleSignin.configure({
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '496163987837-b3k7dvvt3nlrg49nuf93a25s1kpuoobr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //     // hostedDomain: '', // specifies a hosted domain restriction
        //     // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        //     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //     // accountName: '', // [Android] specifies an account name on the device that should be used
        //     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        //   });
    }

    
    // componentDidMount() {
    //     GoogleSignin.configure({
    //         scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //         webClientId: '145673018369-vm9nfod6p9cftpkp50gc8kr7hg5r16ul.apps.googleusercontent.com',
    //         offlineAccess: true,
    //         androidClientId: '145673018369-qo655hcugnthl6ons9a0oa1v3cmpf78g.apps.googleusercontent.com',
    //         forceConsentPrompt: true,
    //     })
    // }
    

    doSocialSignUp = (loginData) => {
        const { loader, toast } = this.props;
        loader(true)
        var requestObj = {};
        var user_id = 0;

        console.log('LoginData====>>', loginData)
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

    signUpWithFB = () => {
        const { loader, toast } = this.props;
        loader(true);
        try {

            LoginManager.logOut();
            LoginManager.logInWithPermissions([
                'email',
                'public_profile',
                'user_birthday',
            ]).then((result) => {
                if (result.isCancelled) {
                    console.log('login canceled');
                    loader(false)
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        console.log('Access Token data', data)
                        const accessToken = data.accessToken;
                        const responseInfoCallback = (error, info) => {
                            if (error) {
                                console.log(error);
                                setTimeout = (() => {
                                    toast({ text: error })
                                }, 200);
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
                                loader(false);
                                console.log('SocialObject', socialObject);
                                this.doSocialSignUp(socialObject);
                            }
                        };
                        const profileRequestParams = {
                            fields: {
                                string: 'id, name, email, first_name, last_name, birthday',
                            }
                        };
                        const profileRequestConfig = {
                            httpMethod: 'GET',
                            version: 'v2.5',
                            parameters: profileRequestParams,
                            accessToken,
                        };
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
            console.error(e);
            setTimeout(() => {
                toast({ text: e })
            }, 200)
            loader(false);
        }
    }

    signUpWithGoogle = async () => {
        const { loader, toast } = this.props;
        // await GoogleSignin.signOut();
        
        try {
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo--->',userInfo)
            if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
                await GoogleSignin.revokeAccess();
                return await GoogleSignin.signOut();
            } else {
                console.log('First-----')
                await GoogleSignin.hasPlayServices();
                loader(true);
                // console.log('Second----');
                const userInfo = await GoogleSignin.signIn();
                // console.log('Third----')
                console.log('user info ---->', userInfo);
                const { idToken, user } = userInfo;
                socialObject = {
                    verifyToken: user.id,
                    firstName: user.givenName,
                    lastName: user.familyName,
                    email: user.email,
                    userName: user.name,
                    profilePic: user.photo,
                    accountType: LOGIN_GOOGLE,
                }
                loader(false);
                console.log('SocialObject--->>', socialObject);
                this.doSocialSignUp(socialObject);
            }
        }
        catch (error) {
            console.log('Error:', JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
                // console.log('signin cancel', JSON.stringify(error));
                //user cancle the login flow
                setTimeout(() => {
                    toast({ text: 'user cancelled the login flow' });
                }, 200);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. Sign in) is in progrss already');
                // console.log('in progress', JSON.stringify(error));
                //operation (e.g. sign in) is in progress already
                setTimeout(() => {
                    toast({ text: 'operation (e.g. Sign in) is in progrss already' })
                }, 200)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not availebal or outdated');
                // console.log('play services', JSON.stringify(error));
                //play services not availabel or outdated
                setTimeout(() => {
                    toast({ text: 'play services not availebal or outdated' })
                }, 200)
            } else {
                // this.doSocialSignUp();
                console.log('Some Other Error Happened');
            }
            loader(false);
        }
    }

    render() {
        // console.log('sign up screen props', this.props);
        return (
            <View style={[styles.container, { backgroundColor: 'rgba(74, 74, 74, 1)' }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableWithoutFeedback
                        onPress={() => { Keyboard.dismiss() }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image source={AppImages.app_icon} resizeMode={'contain'} style={{ height: 100, width: WINDOW.width - 90 }}></Image>
                            </View>
                            <View style={{ flex: 1.5, alignItems: 'center' }}>
                                <ActionButton
                                    title={'Sign up with Email'}
                                    icon={'envelope'}
                                    containerStyle={{
                                        backgroundColor: Colors.emailButtonColor,

                                        // width: 320,
                                        height: 45,
                                    }}
                                    onPress={() => Actions.signupemail()}
                                >
                                </ActionButton>
                                <ActionButton
                                    title={'Sign up with Facebook'}
                                    icon={'facebook-square'}
                                    containerStyle={{
                                        marginTop: smartScale(3),
                                        backgroundColor: Colors.facebookBtnColor,
                                        // width: 320,
                                        height: 45,
                                    }}
                                    onPress={() => this.signUpWithFB()}
                                >
                                </ActionButton>
                                
                                <ActionButton
                                    title={'Sign up with Google'}
                                    icon={'google-plus'}
                                    containerStyle={{
                                        marginTop: smartScale(3),
                                        backgroundColor: Colors.googleBtnColor,
                                        // width: 320,
                                        height: 45,
                                    }}
                                    onPress={() => this.signUpWithGoogle()}
                                >
                                </ActionButton>
                                <Text onPress={() => Actions.login()}
                                    style={{ color: Colors.authenticationButtonColor, fontSize: smartScale(1.9), marginTop: smartScale(3) }}>{'Already have an Account? Sign in'}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View >
        )
    }
}


export default connect(null, { setUser })(withLoader(SignupScreen));