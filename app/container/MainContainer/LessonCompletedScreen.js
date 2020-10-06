import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import BottomBar from '../../common/BottomBar';
import Header from '../../common/Header';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import ActionButton from '../../common/ActionButton';
import { Actions } from 'react-native-router-flux';

class LessonCompletedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLastLesson: false,
        }
    }

    componentDidMount() {
        const { allLessons, lessonData } = this.props;
        allLessons.map(item => {
            var last_element = item[item.length - 1];
            console.log('lessonData_id', lessonData.lesson.lesson_id)
            if (last_element.lesson_id === lessonData.lesson.lesson_id) {
                this.setState({ isLastLesson: true })
            }
        })
    }

    navigateToLessons() {
        this.state.isLastLesson ?
            Actions.trophy({ skillMapDetail: this.props.skillMapDetail, userLevel: this.props.userLevel })
            :
            Actions.lessons({
                lessonDetail: this.props.lessonDetail,
                lessonData: this.props.lessonData,
                isFormLessonCompleted: true,
                skillMapDetail: this.props.skillMapDetail,
                userLevel: this.props.userLevel,
                allLessons: this.props.allLessons,
            })
    }

    render() {
        const { lessonData, allLessons } = this.props
        const { isLastLesson } = this.state
        console.log(lessonData.lesson.lesson_id)
        console.log(allLessons)

        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <ScrollView>
                    <View style={{ marginTop: smartScale(2), marginHorizontal: smartScale(2) }}>
                        <View>
                            <Text style={newstyle.SectionTextStyle}>
                                {lessonData.lesson.title}
                            </Text>
                        </View>
                        <ActionButton
                            onPress={() => { }}
                            title={'Skill Passed'}
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
                        <View style={{ marginTop: smartScale(2.5), alignSelf: 'center' }}>
                            <Text style={newstyle.congoTextStyle}>
                                Congratulations..{'\n'}Keep Up the Hark Work!
                            </Text>
                            {isLastLesson ? (
                                <Text style={newstyle.congoTextStyle}>
                                    Workout Completed.
                                </Text>
                            ) : null}
                        </View>
                        <ActionButton
                            onPress={() => { this.navigateToLessons() }}
                            title={isLastLesson ? 'Back to workout' : 'Begin Next Lesson'}
                            containerStyle={[
                                newstyle.loginButtonContainer,
                                {
                                    width: WINDOW.width - 90,
                                    borderRadius: smartScale(50),
                                    // paddingLeft: smartScale(0),
                                    // backgroundColor: Colors.headerColor,
                                    marginBottom: smartScale(2),
                                }]}
                        ></ActionButton>
                    </View>
                </ScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

export default LessonCompletedScreen;

const newstyle = StyleSheet.create({
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3),
        // alignSelf: 'center',
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
        marginTop: smartScale(8)
    },
    congoTextStyle: {
        color: 'rgba(74,144,226,1)',
        fontSize: smartScale(3.5),
        fontFamily: 'roboto-regular',
        textAlign: 'center',
    },
})