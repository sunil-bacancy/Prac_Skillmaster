import React, { Component } from 'react';
import { Keyboard, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../common/Header'
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import ActionButton from '../../common/ActionButton';
import BottomBar from '../../common/BottomBar';
import { Actions } from 'react-native-router-flux';

class LessonDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessonDetailData: null,
            showVideo: true,
            videoURL: '',
            videoURLTip: '',
        }
    }

    componentDidMount() {
        console.log('lessonDetails', this.props.lessonDetail)
        // this.setState({
        //     lessonDetailData: this.props.lessonDetail
        // })
        this.callGetLesson();
    }

    callGetLesson() {
        const { loader } = this.props;
        const { lessonDetailData } = this.state;
        Keyboard.dismiss()
        loader(true)
        // const lesson = {
        //     lesson_id: this.state.lessonDetail != null && this.props.lessonDetail != undefined
        //         ? this.props.lessonDetail.id
        //         : '',
        // }

        const data = {
            lesson: this.props.lessonDetail != null && this.props.lessonDetail
                ? this.props.lessonDetail
                : ''
        }

        var tempVidUrl = '';
        var tempVidUrlTip = '';
        if (data.lesson.video_url != '') {
            tempVidUrl = data.lesson.video_url.replace('watch?v=', 'embed/');
        }
        if (data.lesson.tip_video_url != '') {
            tempVidUrlTip = data.lesson.tip_video_url.replace('watch?v=', 'embed/');
        }

        this.setState({
            lessonDetailData: data,
            videoURL: tempVidUrl,
            videoURLTip: tempVidUrlTip
        })
        loader(false)
    }

    onTipPress(lessonDetailData, videoURLTip) {
        this.setState({
            showVideo: false
        });
        Actions.lessontip({
            // lessonsData: lessonsData,
            videoURLTip: videoURLTip,
            lessonDetail: this.props.lessonDetail,
            skillMapDetail: this.props.skillMapDetail,
            userLevel: this.props.userLevel
        });
    }

    callLessonMaster() {
        Actions.lessoncompleted({
            lessonDetail: this.props.lessonDetail,
            lessonData: this.state.lessonDetailData,
            allLessons: this.props.allLessons,
            skillMapDetail: this.props.skillMapDetail,
            userLevel: this.props.userLevel
        })
    }

    render() {
        const { lessonDetailData, videoURL, showVideo, videoURLTip } = this.state;
        console.log('====>', this.state.lessonDetailData)
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <KeyboardAwareScrollView >
                    <View style={{ marginHorizontal: smartScale(2), marginBottom: smartScale(8) }}>
                        <View style={newstyle.lessonTitleContainer}>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={2} style={newstyle.SectionTextStyle}>{lessonDetailData != null ? lessonDetailData.lesson.title : ''}</Text>
                            </View>
                            <TouchableOpacity
                                style={newstyle.needhelpContainer}
                                onPress={() => this.onTipPress(lessonDetailData, videoURLTip)}>
                                <Icon name='lightbulb-on-outline' style={newstyle.icon}></Icon>
                                <Text style={newstyle.needHelp}>{'need help?'}  </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: smartScale(1) }}>
                            {showVideo ?
                                <WebView
                                    style={newstyle.lessonVideo}
                                    source={{ uri: videoURL != null ? videoURL : '' }}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    startInLoadingState={false}
                                    scrollEnabled={false}
                                    mixedContentMode={'always'}
                                    scalesPageToFit={false}
                                    allowsInlineMediaPlayback={true}
                                    automaticallyAdjustContentInsets={false}>
                                </WebView>
                                : null}
                        </View>
                        <View style={{ marginTop: smartScale(1.2) }}>
                            <Text style={newstyle.SectionTextStyle}>{lessonDetailData != null ? lessonDetailData.lesson.description : ''}</Text>
                            <Text style={newstyle.SectionTextStyle}>{lessonDetailData != null ? lessonDetailData.lesson.desclaimer : ''}</Text>
                        </View>
                        <ActionButton
                            onPress={() => this.callLessonMaster()}
                            title={'Lesson Mastered'}
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
                </KeyboardAwareScrollView>
                <BottomBar></BottomBar>
            </View>
        )
    }
}

export default withLoader(withUser(LessonDetailScreen));

const newstyle = StyleSheet.create({
    lessonTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: smartScale(2),
        // marginHorizontal: smartScale(2),
    },
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3),
        // alignSelf: 'center',
    },
    icon: {
        color: '#de16e9',
        fontSize: 25,
    },
    needHelp: {
        fontFamily: 'roboto-regular',
        color: Colors.purpleDF16E9,
        fontSize: smartScale(1.5),
    },
    needhelpContainer: {
        // marginTop: smartScale(10),
        // marginStart: smartScale(5),
        alignItems: 'center',
    },
    lessonVideo: {
        height: smartScale(45),
        // backgroundColor: 'red'
    },
    loginButtonContainer: {
        backgroundColor: Colors.authenticationButtonColor,
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
})