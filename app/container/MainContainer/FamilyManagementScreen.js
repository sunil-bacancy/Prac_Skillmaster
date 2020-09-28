import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Keyboard, FlatList } from 'react-native';
import Header from '../../common/Header';
import { smartScale } from '../../utils/AppUtils';
import BottomBar from '../../common/BottomBar';
import withLoader from '../../redux/actionCreator/withLoader';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import styles from '../../theme/index';
import AppImages from '../../assets/images/index';
import Colors from '../../theme/Colors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import withUser from '../../redux/actionCreator/withUser';
// import withAddMember from '../../redux/actionCreator/withAddMember';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

const dropDown_Data = [
    {
        title: 'Swimming',
        // icon_img: AppImages.swimming,
    },
    {
        title: 'Batminton',
        // icon_img: AppImages.batminton,
    },
    {
        title: 'Test skill',
        // icon_img: AppImages.testskill,
    },
    {
        title: 'Soccer',
        // icon_img: AppImages.soccor
    }
]



class FamilyManagementScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            childData: null,
        }
    }

    async componentDidMount() {
        // console.log('this.props.user.id =====>', this.props.user);
        // console.log('this.props.addMember =====>', this.props.addmember);
        // // this.callGetChilds();
        // // const { loader } = this.props;
        // Keyboard.dismiss();
        // this.props.loader(true);
        // const addmember = (this.props.addmember != undefined && this.props.addmember != null
        //     ? this.props.addmember
        //     : '')
        // console.log('add member ))))))', addmember)
        // // this.callGetChilds();
        // // const l = this.state.childData;
        // // l.push(addmember);
        // this.setState({
        //     childData: addmember
        // });
        // // this.changeHandler(addmember);
        // // console.log('child Data ----->', this.state.childData)
        // this.props.loader(false);

        var addmember = await AsyncStorage.getItem('addmember')
        var member = JSON.parse(addmember)
        console.log('AsyncStorage =======>', member)
        this.setState({
            childData: member
        })
    }

    // callGetChilds = async () => {
    //     // let getMember = await AsyncStorage.getItem('addmember')
    //     // let familyMember = JSON.parse(getMember);
    //     // console.log('AsyncStorage data  ======>', familyMember)
    //     //     const { loader } = this.props;
    //     //     Keyboard.dismiss();
    //     //     loader(true);
    //     //     const user = {
    //     //         parent_user_id: this.props.user != undefined && this.props.user != null
    //     //             ? this.props.user.id
    //     //             : '',
    //     //     }
    //     //     this.setState({
    //     //         childData: user
    //     //     })
    //     //     console.log('child Data ----->', this.state.childData)
    //     //     loader(false);
    // }

    render() {
        const { childData } = this.state
        console.log('State Child >>>>>>>>>>', childData);
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <View style={[newstyles.buttonViewStyle, { marginHorizontal: smartScale(2), marginTop: smartScale(1.4) }]}>
                    <TouchableOpacity>
                        <Icon name='account-switch' size={smartScale(6)}></Icon>
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.SectionTextStyle, { marginStart: smartScale(1) }]}>
                            {'Family Management'}
                        </Text>
                    </View>
                </View>
                {this.props.user ? (
                    this.props.user.role != 'parent' ? (
                        <Text style={newstyles.noItemAvail}>{'Only parent account can manage family members'}</Text>
                    ) : null
                ) : null}
                {this.props.user ? (
                    this.props.user.role === 'parent' ? (
                        <View style={{ marginTop: smartScale(2.5), }}>

                            {childData && <FlatList
                                data={this.state.childData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => Actions.familyaccountsettings({ profileData: item, })}
                                            style={newstyles.childUserListStyle}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={newstyles.skillTitle}>{item.first_name}</Text>
                                                <Text
                                                    style={[newstyles.skillTitle, { marginStart: smartScale(1) }]}>
                                                    {item.last_name}
                                                </Text>
                                            </View>
                                            <SimpleLineIconsIcon name="arrow-right" />
                                        </TouchableOpacity>

                                    )
                                }}
                            />}
                        </View>
                    ) : null
                ) : null}
                {this.props.user ? (
                    this.props.user.role === 'parent' ? (
                        <TouchableOpacity
                            style={newstyles.addMember}
                            onPress={() => Actions.addfamilymember()}>
                            <Icon1 name='md-person-add' size={smartScale(5)}></Icon1>
                            <Text style={newstyles.addFamilyMember1}>{'Add Family Member'}</Text>
                        </TouchableOpacity>
                    ) : null
                ) : null}
                <BottomBar></BottomBar>
            </View >
        )
    }
}

export default connect(null, {})(withUser(withLoader(FamilyManagementScreen)));

const newstyles = StyleSheet.create({
    buttonViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addMember: {
        marginHorizontal: smartScale(2),
        borderRadius: smartScale(1),
        // paddingHorizontal: smartScale(1.2),
        paddingVertical: smartScale(2.5),
        marginTop: smartScale(4),
        backgroundColor: Colors.skillSectionColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    soccer1: {
        fontSize: smartScale(2.5),
        color: Colors.white
    },
    noItemAvail: {
        fontFamily: 'audiowide-regular',
        fontSize: smartScale(2.5),
        textAlign: 'center',
        marginTop: smartScale(15)
    },
    addFamilyMember1: {
        color: '#121212',
        fontSize: smartScale(2.2),
        fontFamily: 'roboto-regular',
        marginLeft: smartScale(2.5),
    },
    childUserListStyle: {
        paddingHorizontal: smartScale(2),
        paddingVertical: smartScale(2.3),
        marginVertical: smartScale(1.4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.skillSectionColor,
        marginHorizontal: smartScale(3),
    },
    skillTitle: {
        color: '#121212',
        fontSize: smartScale(2.2),
        fontFamily: 'roboto-regular',
    },
})
