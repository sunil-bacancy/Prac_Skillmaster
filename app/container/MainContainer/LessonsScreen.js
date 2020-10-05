import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Keyboard } from 'react-native';
import Header from '../../common/Header';
import Icon from 'react-native-vector-icons/Fontisto';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import withUser from '../../redux/actionCreator/withUser';
import withLoader from '../../redux/actionCreator/withLoader';
import ActionButton from '../../common/ActionButton';
import { Actions } from 'react-native-router-flux';
import BottomBar from '../../common/BottomBar';

class LessonsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalLessons: 0,
            completedLessons: 0,
            lessonsData: [],
            selectedLessonMap: [],
        }
    }

    componentDidMount() {
        // console.log('user===>', this.props.user);
        console.log('workDetail===>', this.props.workoutDetail)
        console.log('selectedLessonData===>', this.props.lessonData)
        // var tempArr = LESSONS_DATA;
        this.setState({
            lessonsData: this.props.lessonData
        })

        this.callGetAllLessons();
    }

    callGetAllLessons() {
        const { loader } = this.props;
        Keyboard.dismiss();
        loader(true)
        // const lesson = {
        //     user_id: this.props.user != null && this.props.user != undefined
        //         ? this.props.user.dismiss
        //         : '',
        //     workout_id: this.props.workoutDetail != null && this.props.workoutDetail != undefined
        //         ? this.props.workoutDetail.id
        //         : ''
        // }
        // console.log('LESSON_DSTA====>', this.state.lessonsData2)
        // this.state.lessonsData2.forEach((element) => {
        //     // console.log('element --=>', element)
        //     if (element.id === this.props.workoutDetail.id) {
        //         this.setState({
        //             selectedLessonMap: element.data
        //         })

        //     }
        // })

        // for (let index = 0; index < LESSONS_DATA.length; index++) {
        // console.log('workout id', this.state.lessonsData2.id)
        // if (this.props.workoutDetail.id === LESSONS_DATA.id) {
        //     this.setState({ lessonsData2: LESSONS_DATA.data })
        // }
        // }
        this.setState({
            lessonsData: this.props.lessonData,
            totalLessons: this.props.lessonData.length,
        })
        loader(false);
    }

    navigateToLessonDetail(lessonDetail) {
        var tempCompLessons = 0;
        for (let index = 0; index < lessonDetail.length; index++) {
            if (lessonDetail.lesson_id == index + 1) {
                tempCompLessons = tempCompLessons + 1;
            }
        }
        this.setState({ completedLessons: tempCompLessons })
        console.log('lesson ==>', lessonDetail)
        Actions.lessondetail({
            lessonDetail: lessonDetail,
            workoutDetail: this.props.workoutDetail,
            skillMapDetail: this.props.skillMapDetail
        })
    }

    render() {
        console.log('LessonData2 -=-=-> ', this.state.lessonsData)
        // console.log('selectedLessonMap --->', this.state.selectedLessonMap)
        // this.callGetAllLessons()
        return (
            <View style={{ flex: 1 }}>
                {/* {this.callGetAllLessons()} */}
                <Header showBackBtn></Header>
                <View style={newstyle.buttonViewStyle}>
                    <TouchableOpacity>
                        <View style={newstyle.renderSportsViewStyle}>
                            <Icon name='stopwatch' size={smartScale(9)}></Icon>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: smartScale(1) }}>
                        <Text style={newstyle.SectionTextStyle}>{this.state.completedLessons}/{this.state.totalLessons} lessons completed</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ marginTop: smartScale(3.5), marginBottom: smartScale(10) }}>
                        <FlatList
                            data={this.state.lessonsData}
                            renderItem={({ item }) => (
                                console.log('item========>', item),
                                item.map(subItem => (
                                    console.log('item========>', subItem.title),
                                    <View style={{ borderTopWidth: smartScale(0.2) }}>
                                        <View style={{ marginHorizontal: smartScale(2), marginTop: smartScale(2) }}>
                                            <Text style={newstyle.SectionTextStyle}>{subItem.title}</Text>
                                        </View>
                                        <View style={{ marginTop: smartScale(2.5), justifyContent: 'center', alignItems: 'center' }}>
                                            <ActionButton
                                                onPress={() => { this.navigateToLessonDetail(subItem) }}
                                                title={'Begin'}
                                                containerStyle={[
                                                    newstyle.loginButtonContainer,
                                                    {
                                                        width: WINDOW.width - 90,
                                                        borderRadius: smartScale(50),
                                                        // paddingLeft: smartScale(0),
                                                        backgroundColor: Colors.headerColor,
                                                        marginBottom: smartScale(2),
                                                    }]}
                                            ></ActionButton>
                                        </View>
                                    </View>
                                ))
                            )}
                        ></FlatList>
                    </View>
                </ScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

export default withLoader(withUser(LessonsScreen));

const newstyle = StyleSheet.create({
    renderSportsViewStyle: {
        borderRadius: smartScale(50),
        height: smartScale(15),
        width: smartScale(15),
        backgroundColor: Colors.skillSectionColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: smartScale(6)
    },
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3),
        // alignSelf: 'center'
    },
    loginButtonContainer: {
        backgroundColor: Colors.authenticationButtonColor,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight: 16,
        // paddingLeft: 16,
        // borderRadius: 5,
        width: smartScale(40),
        height: smartScale(7),
    },
})