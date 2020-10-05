import React, { Component } from 'react';
import { Keyboard, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../common/Header'
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';
import { smartScale } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';

class LessonDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessonDetailData: null,
            showVideo: true,
        }
    }

    componentDidMount() {
        console.log('lessonDetails', this.props.lessonDetail)
        this.setState({
            lessonDetailData: this.props.lessonDetail
        })
        this.callGetLesson();
    }

    callGetLesson() {
        const { loader } = this.props;
        Keyboard.dismiss()
        loader(true)
        const lesson = {
            lesson_id: this.state.lessonDetail != null && this.props.lessonDetail != undefined
                ? this.props.lessonDetail.id
                : '',
        }
        loader(false)
    }

    render() {
        const { lessonDetailData } = this.state;
        console.log('====>', this.state.lessonDetailData)
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <KeyboardAwareScrollView>
                    <View style={newstyle.lessonTitleContainer}>
                        <View style={{}}>
                            <Text style={newstyle.SectionTextStyle}>{lessonDetailData != null ? lessonDetailData.title : ''}</Text>
                        </View>
                        <TouchableOpacity
                            style={newstyle.needhelpContainer}
                            onPress={() => { }}>
                            <Icon name='lightbulb-on-outline' style={newstyle.icon}></Icon>
                            <Text style={newstyle.needHelp}>{'need help?'}  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: smartScale(1), marginHorizontal: smartScale(2) }}>
                        <WebView
                            style={newstyle.lessonVideo}>

                        </WebView>
                    </View>
                </KeyboardAwareScrollView>
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
        marginHorizontal: smartScale(2)
    },
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3),
        alignSelf: 'center'
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
        height: smartScale(43),
        backgroundColor: 'red'
    },
})