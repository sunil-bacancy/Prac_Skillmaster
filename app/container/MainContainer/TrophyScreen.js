import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../common/Header';
import { smartScale } from '../../utils/AppUtils';
import withUser from '../../redux/actionCreator/withUser';
import Colors from '../../theme/Colors';
import AppImages from '../../assets/images';
import withLoader from '../../redux/actionCreator/withLoader';
import { Actions } from 'react-native-router-flux';

const SPORTS_LIST = [
    {
        sports_img: AppImages.learning_rules,
        title: 'Learning the Rules',
    },
    {
        sports_img: AppImages.dribble_passing,
        title: 'Dribbling and Passing',
    },
    {
        sports_img: AppImages.shooting1,
        title: 'Shooting',
    },
    {
        sports_img: AppImages.playing_defense,
        title: 'Playing Defense',
    },
    {
        sports_img: AppImages.playing_well4,
        title: 'Playing Well',
    },
    {
        sports_img: AppImages.basketball_variations1,
        title: 'Basketball Variations',
    },
    {
        sports_img: AppImages.basketball_test1,
        title: 'Basketball test',
    },
]

class TrophyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sportsData: null
        }
    }

    componentDidMount() {
        console.log('ssss--->', this.props.skillMapDetail)
        this.callGetAllWorkouts()
    }

    callGetAllWorkouts() {
        const { loader } = this.props;
        Keyboard.dismiss();
        loader(false);

        const workout = {
            user_id: this.props.user != null && this.props.user != undefined
                ? this.props.user.id
                : '',
            user_skill_map_id: this.props.skillMapDetail != null && this.props.skillMapDetail != undefined
                ? this.props.skillMapDetail.user_skill_map_id
                : '',
            sportsData: SPORTS_LIST
        }
        this.setState({
            sportsData: workout.sportsData
        })
        loader(false);
    }

    navigateToLesson = (workoutDetail) => {
        Actions.lessons({
            workoutDetail: workoutDetail,
            skillMapDetail: this.props.skillMapDetail,
        })
    }

    render() {
        // console.log('Trophy Screen --->', this.state.sportsData)
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <ScrollView>
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: smartScale(1),
                        alignItems: 'center',
                        marginHorizontal: smartScale(2)
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={this.props.skillMapDetail.icon_img} style={{ height: smartScale(6), width: smartScale(6) }}></Image>
                            <Text style={newstyle.SectionTextStyle}>{this.props.skillMapDetail.title}</Text>
                        </View>
                        <View>
                            <Text style={newstyle.SectionTextStyle}>{'level0'}</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            numColumns={2}
                            style={{ alignSelf: 'center' }}
                            data={this.state.sportsData}
                            renderItem={({ item }) => (
                                // console.log('----', item),
                                <TouchableOpacity
                                    onPress={() => { this.navigateToLesson(item) }}
                                >
                                    <View style={{ marginHorizontal: smartScale(2), marginVertical: smartScale(2), alignItems: 'center' }}>
                                        <View style={newstyle.renderSportsViewStyle}>
                                            <Image
                                                source={item.sports_img}
                                                resizeMode={'contain'}
                                                style={{ height: smartScale(15), width: smartScale(12), borderRadius: smartScale(20) }}
                                            ></Image>
                                        </View>
                                        <View style={{ width: smartScale(21), flexDirection: 'row' }}>
                                            <Text style={newstyle.sportstextstyle}>{item.title}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        ></FlatList>
                    </View>
                </ScrollView>
            </View >
        )
    }
}

export default withLoader(withUser(TrophyScreen));

const newstyle = StyleSheet.create({
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3),
        alignSelf: 'center'
    },
    renderSportsViewStyle: {
        borderRadius: smartScale(50),
        height: smartScale(15),
        width: smartScale(15),
        backgroundColor: Colors.skillSectionColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sportstextstyle: {
        color: Colors.sportsnameColor,
        alignItems: 'center',
        fontSize: smartScale(3.5),
        fontFamily: 'audiowide-regular',
    },
})