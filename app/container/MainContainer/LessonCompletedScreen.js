import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import BottomBar from '../../common/BottomBar';
import Header from '../../common/Header';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';
import ActionButton from '../../common/ActionButton';

class LessonCompletedScreen extends Component {
    render() {
        const { lessonData } = this.props
        console.log(lessonData)
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
                            onPress={() => this.callLessonMaster()}
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