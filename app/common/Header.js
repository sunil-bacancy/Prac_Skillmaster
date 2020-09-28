import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Headericon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../theme/Colors';
import { smartScale } from '../utils/AppUtils';
import { Actions } from 'react-native-router-flux';
import withLoader from '../redux/actionCreator/withLoader';
import withUser from '../redux/actionCreator/withUser';
import { connect } from 'react-redux';
import AppImages from '../assets/images/index';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModelVisible: false,
            user: {}
        }
    }

    componentDidMount() {
        const { user } = this.props;
        // console.log('user previous data ---->', user)
    }

    render() {
        const { isModelVisible } = this.state;
        return (
            <View style={newStyle.headerStyle}>
                <View style={newStyle.headerViewStyle}>
                    {this.props.showBackBtn ? (
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <AntDesign
                                color={Colors.white}
                                // style={{ backgroundColor: 'yellow' }}
                                name='back'
                                size={smartScale(5)}
                            ></AntDesign>
                        </TouchableOpacity>
                    ) : (
                            <View style={{ width: 30 }}></View>
                        )}
                    <Image source={AppImages.app_icon} style={{ width: 175, height: 45 }}></Image>
                    <Headericon
                        color={Colors.white}
                        name={'menu'}
                        // style={{ backgroundColor: 'pink' }}
                        size={smartScale(5)}
                        onPress={() => {
                            this.setState({ isModelVisible: !this.state.isModelVisible })
                        }}
                    ></Headericon>
                </View>
                {isModelVisible ? (
                    <View>
                        <View style={[newStyle.headerSubViewStyle, { height: smartScale(6) }]}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Icon name='person' size={smartScale(4.5)}></Icon>
                                <Text style={[newStyle.headerSubTextStyle, { marginTop: smartScale(0.5) }]}>
                                    {this.props.user != null ? this.props.user.first_name : 'Username'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ isModelVisible: false }, Actions.accountsettings());
                                }}>
                                <Text style={newStyle.headerSubTextStyle}>{'Settings'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                newStyle.headerSubViewStyle,

                                { height: smartScale(6) }
                            ]}>
                            <TouchableOpacity
                                onPress={() => { this.setState({ isModelVisible: false }, Actions.skills()) }}>
                                <Text style={newStyle.headerSubTextStyle}>{'Home'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.setState({ isModelVisible: false }, Actions.learnskills()) }}>
                                <Text style={newStyle.headerSubTextStyle}>{'Learn'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={newStyle.headerSubTextStyle}>{'Logout'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </View>
        )
    }
}

export default withUser(Header);

const newStyle = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.headerColor,
        zIndex: 999
    },
    headerViewStyle: {
        marginHorizontal: smartScale(2),
        flexDirection: 'row',
        marginTop: smartScale(1.5),
        justifyContent: 'space-between',
        paddingBottom: smartScale(1.5)
    },
    headerSubViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.skillSectionColor,
        alignItems: 'center',
        // paddingTop: smartScale(1.5),
        borderBottomWidth: smartScale(0.2),
    },
    headerSubTextStyle: {
        color: Colors.black,
        fontSize: smartScale(2.5),
        fontFamily: 'roboto-regular',
        // marginTop: smartScale(5),
    },
})