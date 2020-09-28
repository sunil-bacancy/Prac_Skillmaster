import React, { Component } from 'react';
import { BackHandler, Keyboard, Text, View, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import BottomBar from '../../common/BottomBar';
import Header from '../../common/Header';
import { smartScale } from '../../utils/AppUtils'
import withUser from '../../redux/actionCreator/withUser';
import { Actions } from 'react-native-router-flux';
import AppImages from '../../assets/images/index';
import withLoader from '../../redux/actionCreator/withLoader';
import Colors from '../../theme/Colors';
import Icon from 'react-native-vector-icons/Entypo';

const list_Data = [
    {
        user_skill_map_id: 1,
        title: 'Basketball',
        icon_img: AppImages.basketball,
    },
    {
        user_skill_map_id: 2,
        title: 'Baseball',
        icon_img: AppImages.baseball,
    },
    {
        user_skill_map_id: 3,
        title: 'Swimming',
        icon_img: AppImages.swimming,
    },
    {
        user_skill_map_id: 4,
        title: 'Batminton',
        icon_img: AppImages.batminton,
    },
    {
        user_skill_map_id: 5,
        title: 'Test skill',
        icon_img: AppImages.testskill,
    },
    {
        user_skill_map_id: 6,
        title: 'Soccer',
        icon_img: AppImages.soccor
    },
]

class SkillScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            skilldata: null,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backAction);
        this.callGetAllSkillMap();
    }

    backAction = () => {
        if (Actions.currentScene === 'skills') {
            BackHandler.exitApp();
            return false;
        }
        return true;
    }

    callGetAllSkillMap = () => {
        const { loader } = this.props
        Keyboard.dismiss()
        loader(true)
        var tempArr = list_Data
        console.log('------>>', tempArr)
        this.setState({
            skilldata: tempArr,
        })
        loader(false);
    }

    navigateToTrophy(skillMapDetail) {
        if (skillMapDetail.user_skill_map_id != null && skillMapDetail.user_skill_map_id != undefined) {
            Actions.trophy({ skillMapDetail: skillMapDetail })
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingBottom: smartScale(8) }}>
                        <View style={{ marginHorizontal: smartScale(7), marginTop: smartScale(4) }}>
                            <Text style={{ fontSize: smartScale(2.5), textAlign: 'center' }}>
                                {'What sport do you want to improve your skill level?'}
                            </Text>
                        </View>
                        <View style={{ marginTop: smartScale(6) }}>
                            <FlatList
                                data={this.state.skilldata}
                                // contentContainerStyle={{ marginBottom: smartScale(15) }}
                                // showsVerticalScrollIndicator={true}
                                // showsHorizontalScrollIndicator={true}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.navigateToTrophy(item)}>
                                            <View style={[newstyle.skillContainer]}>
                                                <View style={newstyle.skillSubContainer}>
                                                    <Image
                                                        source={item.icon_img}
                                                        style={{ height: smartScale(5), width: smartScale(5), marginEnd: smartScale(1.5), marginVertical: smartScale(2.5) }}
                                                        resizeMode={'contain'}
                                                    ></Image>
                                                    <Text style={newstyle.skillTest}>{item.title}</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                    <Icon size={smartScale(2.5)} name="chevron-with-circle-right"></Icon>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            ></FlatList>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

export default withLoader(SkillScreen);

const newstyle = StyleSheet.create({
    skillContainer: {
        marginHorizontal: smartScale(2.5),
        borderRadius: smartScale(0.5),
        marginBottom: smartScale(2),
        paddingHorizontal: smartScale(2),
        // // paddingVertical: smartScale(10),
        // marginVertical: smartScale(10),
        backgroundColor: Colors.skillSectionColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: smartScale(10),
    },
    skillSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skillTest: {
        color: Colors.black,
        alignItems: 'center',
        fontSize: smartScale(2.5),
    },
})