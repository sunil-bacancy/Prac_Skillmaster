import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from '../../common/Header';
import Icon from 'react-native-vector-icons/Fontisto';
import { smartScale } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';

class LessonsScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
                <View>
                    <TouchableOpacity>
                        <View style={newstyle.renderSportsViewStyle}>
                            <Icon name='stopwatch' size={smartScale(9)}></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default LessonsScreen;

const newstyle = StyleSheet.create({
    renderSportsViewStyle: {
        borderRadius: smartScale(50),
        height: smartScale(15),
        width: smartScale(15),
        backgroundColor: Colors.skillSectionColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
})