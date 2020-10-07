import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../common/Header';
import BottomBar from '../../common/BottomBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import withUser from '../../redux/actionCreator/withUser';
import withLoader from '../../redux/actionCreator/withLoader';
import InputField from '../../common/InputField';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { setUser } from '../../redux/actions';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ActionButton from '../../common/ActionButton';
import { Actions } from 'react-native-router-flux';

class AccountSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValue: false,
            dateOfBirth: '',
            visiblePicker: false,
            first_name: '',
            last_name: '',
        };
    }
    componentDidMount() {
        const { user } = this.props;
        console.log('user? ', user);
        var tempDate = '';
        if (user != null) {
            if (user.dob != null) {
                tempDate = moment(user.dob).format('DD/MM/YYYY');
            }
        }
        this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            dateOfBirth: tempDate
        });
    }

    doUpdateUser() {

    }
    // renderData = (item) => {
    //     return (
    //         <View>
    //             <InputField
    //                 {...item}
    //                 refProp={ref => this[item.name] = ref}
    //                 style={{ width: WINDOW.width - 90, alignSelf: 'center', fontSize: smartScale(2.1) }}
    //                 onChangeText={(text) => this.setState({})}
    //             ></InputField>
    //         </View>
    //     )
    // }
    render() {
        const { first_name, last_name, dateOfBirth, visiblePicker } = this.state;
        const { handleSubmit } = this.props;
        console.log(first_name);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1)
        // const FIELD_DATA = [
        //     {
        //         name: firstname,
        //         placeholder: 'Enter First Name',
        //         containerStyle: { marginTop: smartScale(5) },
        //         onSubmitEditing: () => this.lastname.focus(),
        //     },
        //     {
        //         name: lastname,
        //         placeholder: 'Enter Last Name',
        //         containerStyle: { marginTop: smartScale(5) },
        //     }
        // ]

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
                    <View style={{ marginTop: smartScale(2), alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            name='first_name'
                            refProp={ref => this.first_name = ref}
                            style={{
                                alignSelf: 'center',
                                height: 40,
                                width: WINDOW.width - 90,
                                paddingHorizontal: smartScale(2),
                                borderRadius: smartScale(0.5),
                                backgroundColor: Colors.skillSectionColor,
                                marginTop: smartScale(5),
                            }}
                            onChangeText={(text) =>
                                this.setState({
                                    first_name: text,
                                })
                            }
                            value={first_name}
                            placeholder={'Enter First Name'}
                        />

                        <TextInput
                            name='last_name'
                            refProp={ref => this.last_name = ref}
                            style={{
                                alignSelf: 'center',
                                height: 40,
                                width: WINDOW.width - 90,
                                paddingHorizontal: smartScale(2),
                                borderRadius: smartScale(0.5),
                                backgroundColor: Colors.skillSectionColor,
                                marginTop: smartScale(2.5),
                            }}
                            onChangeText={(text) =>
                                this.setState({
                                    last_name: text,
                                })
                            }
                            value={last_name}
                            placeholder={'Enter Last Name'}
                        />
                        {/* {FIELD_DATA.map((Value) => this.renderData(Value))} */}
                        <TouchableOpacity
                            onPress={() => this.setState({ visiblePicker: true })}
                            style={[
                                newstyle.loginButtonContainer,
                                {
                                    // marginBottom: smartScale(10),
                                    width: WINDOW.width - 90,
                                    height: 40,
                                    backgroundColor: Colors.skillSectionColor,
                                    alignItems: 'flex-start',
                                    marginTop: smartScale(2.5),
                                    borderRadius: smartScale(0.5),
                                    paddingHorizontal: smartScale(2)
                                },
                            ]}>
                            <Text style={newstyle.loginText}>
                                {dateOfBirth.toString().length > 0
                                    ? dateOfBirth.toString()
                                    : 'Select Date of Birth'}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            maximumDate={yesterday}
                            isVisible={visiblePicker}
                            mode="date"
                            onConfirm={(date) => {
                                var currentDate = moment().format('DD/MM/YYYY');
                                var selectedDate = moment(date).format('DD/MM/YYYY');
                                if (selectedDate === currentDate) {
                                    this.setState({
                                        dateOfBirth: moment(yesterday).format('DD/MM/YYYY'),
                                        visiblePicker: false
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
                        ></DateTimePickerModal>
                        <ActionButton
                            title={'Update'}
                            containerStyle={[
                                newstyle.loginButtonContainer,
                                {
                                    marginTop: smartScale(3),
                                    width: smartScale(20)
                                }

                            ]}
                            onPress={() => this.doUpdateUser}
                        />
                        <ActionButton
                            title={'Change Password'}
                            containerStyle={[
                                newstyle.loginButtonContainer,
                                {
                                    marginTop: smartScale(5),
                                    backgroundColor: 'rgba(233,117,22,1)',
                                    width: smartScale(20)
                                },
                            ]}
                            onPress={() => Actions.changepassword()}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

// const validate = (values) => {
//     let errors = {};
//     errors.first_name = !values.first_name
//         ? 'First name is required'
//         : 'undefined'
//     return errors
// }

const withForm = reduxForm({
    login: 'accountsettings',
    // validate
})

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, { setUser })(withForm(withUser(withLoader(AccountSettings))));

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
        // borderRadius: 5,
        width: smartScale(40),
        height: smartScale(6),
        alignSelf: 'center',
        // marginTop: smartScale(8)
    },
    loginText: {
        fontSize: smartScale(2.5),
        color: Colors.authenticationButtonColor,
        fontFamily: 'roboto-regular',
    },
})