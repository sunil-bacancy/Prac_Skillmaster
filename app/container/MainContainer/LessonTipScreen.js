import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../common/Header';
import { Actions } from 'react-native-router-flux';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import { WebView } from 'react-native-webview';
import BottomBar from '../../common/BottomBar';
import ActionButton from '../../common/ActionButton';

class LessonTipScreen extends Component {
    render() {
        const { lessonDetail, videoURLTip } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn onBackBtnClick={() => Actions.lessondetail({ lessonDetail: this.props.lessonDetail })}></Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ marginTop: smartScale(2), marginHorizontal: smartScale(2) }}>
                        <View>
                            <Text style={newstyle.SectionTextStyle}>
                                Tips - {lessonDetail != null ? lessonDetail.tip_title : ''}
                            </Text>
                        </View>
                        <View style={{ marginTop: smartScale(1) }}>
                            <WebView
                                style={newstyle.lessonVideo}
                                source={{ uri: videoURLTip != null ? videoURLTip : '' }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                startInLoadingState={false}
                                scrollEnabled={false}
                                mixedContentMode={'always'}
                                scalesPageToFit={false}
                                allowsInlineMediaPlayback={true}
                                automaticallyAdjustContentInsets={false}
                            ></WebView>
                        </View>
                        <View style={{ marginTop: smartScale(3) }}>
                            <Text style={newstyle.SectionTextStyle}>
                                {lessonDetail != null ? lessonDetail.tip_desclaimer : ''}
                            </Text>
                        </View>
                        <ActionButton
                            title={'Return to Lesson'}
                            onPress={() => Actions.lessondetail({ lessonDetail: this.props.lessonDetail })}
                            containerStyle={[
                                newstyle.loginButtonContainer,
                                {
                                    // width: WINDOW.width - 120,
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

export default LessonTipScreen;

const newstyle = StyleSheet.create({
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3),
        // alignSelf: 'center',
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
        width: smartScale(30),
        height: smartScale(6),
        alignSelf: 'center',
        marginTop: smartScale(7.5)
    },
})