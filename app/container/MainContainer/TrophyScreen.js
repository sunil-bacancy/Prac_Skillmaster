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
                title: 'Get a ball and a hoop',
                video_url: 'https://www.youtube.com/watch?v=Sm0GgQKySBE',
                tip_video_url: 'https://www.youtube.com/watch?v=Sm0GgQKySBE',
                desclaimer: 'get ball',
                description: 'this section describes about get a ball and hoop',
                tip_title: 'how to play',
                tip_desclaimer: 'get ball',
                lesson_type: 'counter'
            },
            {
                lesson_id: 2,
                title: 'Break into two teams',
                video_url: 'https://www.youtube.com/watch?v=EE5UVmfA19s',
                tip_video_url: 'https://www.youtube.com/watch?v=EE5UVmfA19s',
                desclaimer: 'create teams',
                description: 'this section describes about breaking teams',
                tip_title: 'Team creation',
                tip_desclaimer: 'team creation',
                lesson_type: 'counter'
            },
        ]
    },
    {
        id: 2,
        data: [
            {
                lesson_id: 1,
                title: 'Stand correctly',
                video_url: 'https://www.myactivesg.com/Sports/Basketball/How-To-Play/Basketball-Rules/Basketball-Positions-and-Roles',
                tip_video_url: 'https://www.myactivesg.com/Sports/Basketball/How-To-Play/Basketball-Rules/Basketball-Positions-and-Roles',
                desclaimer: 'get your standing position',
                description: 'this section describes about standing position',
                tip_title: 'your position before start',
                tip_desclaimer: 'get your standing position',
                lesson_type: 'counter'
            },
            {
                lesson_id: 2,
                title: 'Ball Bouncing',
                video_url: 'https://www.youtube.com/watch?v=8Av6T7AcnyQ',
                tip_video_url: 'https://www.youtube.com/watch?v=8Av6T7AcnyQ',
                desclaimer: 'learn to bounce',
                description: 'this section describes how to bounce the ball with your fingertips',
                tip_title: 'bounce bal welll',
                tip_desclaimer: 'learn to bounce',
                lesson_type: 'counter'
            },
        ]
    },
    {
        id: 3,
        data: [
            {
                lesson_id: 1,
                title: 'Balance the ball',
                video_url: 'https://www.youtube.com/watch?v=5AcYUQJ5RfE',
                tip_video_url: 'https://www.youtube.com/watch?v=5AcYUQJ5RfE',
                desclaimer: 'balance while shooting',
                description: 'this section describes about balancing ball while playing',
                tip_title: 'balancing tips',
                tip_desclaimer: 'balance while shooting',
                lesson_type: 'counter'
            },
            {
                lesson_id: 2,
                title: 'push off with your feet',
                video_url: 'https://www.youtube.com/watch?v=xzvrn1SzU2M',
                tip_video_url: 'https://www.youtube.com/watch?v=xzvrn1SzU2M',
                desclaimer: 'jump well',
                description: 'Push off with your feet, jumping straight up',
                tip_title: 'what should be your position?',
                tip_desclaimer: 'jump well',
                lesson_type: 'counter'
            },
        ]
    },
    {
        id: 4,
        data: [
            {
                lesson_id: 1,
                title: 'Learn your role on defense',
                video_url: 'https://www.youtube.com/watch?v=J9KL8YjFMm4',
                tip_video_url: 'https://www.youtube.com/watch?v=J9KL8YjFMm4',
                desclaimer: 'your role',
                description: 'this section describes about your role on defense',
                tip_title: 'perform well while defencing',
                tip_desclaimer: 'playing with defense',
                lesson_type: 'counter'
            },
            {
                lesson_id: 2,
                title: 'Practice your side-to-side movements',
                video_url: 'https://www.youtube.com/watch?v=mTkNmMqfTWs',
                tip_video_url: 'https://www.youtube.com/watch?v=mTkNmMqfTWs',
                desclaimer: 'practice well',
                description: 'this section describes about practice  side-to-side movements',
                tip_title: 'how to practice',
                tip_desclaimer: 'practice well',
                lesson_type: 'counter'
            },
            {
                lesson_id: 3,
                title: 'Practice',
                video_url: 'https://www.youtube.com/watch?v=YYUy4pF2eto&vl=en',
                tip_video_url: 'https://www.youtube.com/watch?v=YYUy4pF2eto&vl=en',
                desclaimer: 'hello',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including',
                tip_title: 'Hello',
                tip_desclaimer: 'fhdsihfhds',
                lesson_type: 'timer'
            },
        ]
    },
    {
        id: 5,
        data: [
            {
                lesson_id: 1,
                title: 'Pass frequently and keep the ball moving',
                video_url: 'https://www.youtube.com/watch?v=6paohDgJtjA',
                tip_video_url: 'https://www.youtube.com/watch?v=6paohDgJtjA',
                desclaimer: 'play well',
                description: 'this section describes about Pass frequently and keep the ball moving',
                tip_title: 'ball passing tips',
                tip_desclaimer: 'ball passing tips',
                lesson_type: 'counter'
            },
        ]
    },
    {
        id: 6,
        data: [
            {
                lesson_id: 1,
                title: 'Play knockout',
                video_url: 'https://www.youtube.com/watch?v=8ZQV3vsgzCU',
                tip_video_url: 'https://www.youtube.com/watch?v=8ZQV3vsgzCU',
                desclaimer: 'play well',
                description: 'A good game for practicing free-throws and playing with a big group of people is knockout',
                tip_title: 'Play horse',
                tip_desclaimer: 'play well',
                lesson_type: 'counter'
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
            lessonData: element,
            userLevel: this.props.userLevel
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