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
        id: 1,
        sports_img: AppImages.learning_rules,
        title: 'Learning the Rules',
    },
    {
        id: 2,
        sports_img: AppImages.dribble_passing,
        title: 'Dribbling and Passing',
    },
    {
        id: 3,
        sports_img: AppImages.shooting1,
        title: 'Shooting',
    },
    {
        id: 4,
        sports_img: AppImages.playing_defense,
        title: 'Playing Defense',
    },
    {
        id: 5,
        sports_img: AppImages.playing_well4,
        title: 'Playing Well',
    },
    {
        id: 6,
        sports_img: AppImages.basketball_variations1,
        title: 'Basketball Variations',
    },
    {
        id: 7,
        sports_img: AppImages.basketball_test1,
        title: 'Basketball test',
    },
]

const LESSONS_DATA = [
    {
        id: 1,
        data: [
            {
                lesson_id: 1,
                title: 'Get a ball and a hoop'
            },
            {
                lesson_id: 2,
                title: 'Break into two teams'
            },
        ]
    },
    {
        id: 2,
        data: [
            {
                lesson_id: 1,
                title: 'Stand correctly'
            },
            {
                lesson_id: 2,
                title: 'Ball Bouncing'
            },
        ]
    },
    {
        id: 3,
        data: [
            {
                lesson_id: 1,
                title: 'Balance the ball'
            },
            {
                lesson_id: 2,
                title: 'push off with your feet'
            },
        ]
    },
    {
        id: 4,
        data: [
            {
                lesson_id: 1,
                title: 'Learn your role on defense'
            },
            {
                lesson_id: 2,
                title: 'Practice your side-to-side movements'
            },
            {
                lesson_id: 2,
                title: 'Practice'
            },
        ]
    },
    {
        id: 5,
        data: [
            {
                lesson_id: 1,
                title: 'Pass frequently and keep the ball moving'
            },
        ]
    },
    {
        id: 6,
        data: [
            {
                lesson_id: 1,
                title: 'Play knockout'
            },
        ]
    },
]

class TrophyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sportsData: null,
            lessonsData2: [],
            selectedLessonMap: [],
        }
    }

    componentDidMount() {
        console.log('ssss--->', this.props.skillMapDetail)
        console.log('userLevel===>', this.props.userLevel)
        // var tempArr = LESSONS_DATA;
        // this.setState({
        //     lessonsData2: tempArr
        // })
        this.callGetAllWorkouts()
    }

    callGetAllWorkouts(workoutDetail) {
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
            sportsData: SPORTS_LIST,
            lessonsData2: LESSONS_DATA
        }

        // this.state.lessonsData2.forEach((element) => {
        //     if (element.id === workoutDetail.id) {
        //         this.setState({
        //             selectedLessonMap: element.data
        //         })
        //     }
        // })

        var tempArr = [];
        tempArr = SPORTS_LIST;
        var element = [];
        if (this.props.userLevel === 'Beginner') {
            for (let index = 0; index < tempArr.length; index++) {
                element.push(tempArr[index])
            }
            this.setState({ sportsData: element })
        } else if (this.props.userLevel === 'Intermediate') {
            for (let index = 2; index < tempArr.length; index++) {
                element.push(tempArr[index])
            }
            this.setState({ sportsData: element })
        } else {
            for (let index = 4; index < tempArr.length; index++) {
                element.push(tempArr[index])
            }
            this.setState({ sportsData: element })
        }

        // this.setState({
        //     sportsData: workout.sportsData
        // })
        loader(false);
    }

    navigateToLesson = (workoutDetail) => {
        // this.callGetAllWorkouts(workoutDetail)
        var lessonData = [];
        lessonData = LESSONS_DATA;
        var element = [];
        for (let index = 0; index < lessonData.length; index++) {
            if (workoutDetail.id === lessonData[index].id) {
                element.push(lessonData[index].data)
            }
        }
        Actions.lessons({
            workoutDetail: workoutDetail,
            skillMapDetail: this.props.skillMapDetail,
            lessonData: element
        })
    }

    render() {
        // console.log('Trophy Screen --->', this.state.lessonsData2)
        // console.log('selectedLessonMap --->', this.state.selectedLessonMap)
        // this.callGetAllWorkouts()
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