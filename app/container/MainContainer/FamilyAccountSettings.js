import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Keyboard } from 'react-native';
import Header from '../../common/Header';
import { smartScale } from '../../utils/AppUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from '../../common/ActionButton';
import Colors from '../../theme/Colors';
import BottomBar from '../../common/BottomBar';
import { setUser } from '../../redux/actions';
import { Actions } from 'react-native-router-flux';
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';
import { connect } from 'react-redux';

class FamilyAccountSettings extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('profileData props====>', this.props.profileData)
    }

    showAlert = () => {
        const { profileData } = this.props;
        Alert.alert(
            'Sign in as ' + profileData.first_name + ' ' + profileData.last_name,
            'You will be logged out from current user.',
            [
                {
                    text: 'Confirm',
                    onPress: () => this.doLogout()
                },
                { text: 'Cancle' },
            ],
            { cancelable: false },
        );
    }

    doLogout = () => {
        const { loader } = this.props;
        Keyboard.dismiss();
        loader(true);
        const user = {
            email: this.props.user != null && this.props.user != undefined
                ? this.props.user.email
                : '',
            first_name: this.props.user != null && this.props.user != undefined
                ? this.props.user.first_name
                : ''
        }
        console.log("Logout Data =====>", user);
        Actions.reset('enterpassword', {
            usersArray: this.props.profileData,
            isFromFamilyManagement: true
        });
        setTimeout(() => {
            this.props.setUser(null);
        }, 200)
        loader(false);
    }

    render() {
        const { profileData } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: smartScale(4.5), alignItems: 'center' }}>
                        <FontAwesome name='user-circle-o' size={smartScale(7)}></FontAwesome>
                        <Text style={[newstyle.containertextstyle, {}]}>
                            {profileData.first_name} {profileData.last_name}
                        </Text>
                    </View>
                    <View style={{ marginTop: smartScale(5), alignItems: 'center' }}>
                        <Text style={newstyle.containertextstyle}>Skill Maps</Text>
                    </View>
                    {!profileData ? (
                        <Text style={newstyle.containertextstyle}>Skill Available</Text>
                    ) : <Text style={newstyle.noItemsAvail}>No skill maps available</Text>}
                </View>
                <ActionButton
                    title={'Sign in as ' + profileData.first_name + ' ' + profileData.last_name}
                    containerStyle={{
                        marginBottom: smartScale(15),
                        backgroundColor: Colors.authenticationButtonColor,
                        width: '75%',
                        height: 40,
                        alignSelf: 'center',
                        borderRadius: 5,
                    }}
                    onPress={() => this.showAlert()}
                />
                <BottomBar></BottomBar>
            </View>
        )
    }
}

export default connect(null, { setUser })(withUser(withLoader(FamilyAccountSettings)));

const newstyle = StyleSheet.create({
    noItemsAvail: {
        color: 'rgba(62,62,62,1)',
        fontSize: smartScale(3),
        fontFamily: 'audiowide-regular',
        alignSelf: 'center',
        marginTop: smartScale(8),
    },
    containertextstyle: {
        color: 'rgba(62,62,62,62)',
        fontFamily: 'audiowide-regular',
        marginTop: smartScale(2),
        fontSize: smartScale(3)
    },
})