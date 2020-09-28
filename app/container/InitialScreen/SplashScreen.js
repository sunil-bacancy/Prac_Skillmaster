import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import styles from '../../theme/index'
import { Actions } from 'react-native-router-flux'
import AppImages from '../../assets/images/index';
import { smartScale, WINDOW, fontSizeContent } from '../../utils/AppUtils';
import Colors from '../../theme/Colors';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            const { user } = this.props;
            if (user != null && user != undefined) {
                Actions.skills();
            } else {
                Actions.login();
            }
        }, 2000)
    }

    renderData = (value, index) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={newStyles.DescText}>{value.desc}</Text>
            </View>
        )
    }

    render() {

        let FIELDS_DATA = [
            {
                name: 'line_1',
                desc: '"There may be people that'
            },
            {
                name: 'line_2',
                desc: 'have more telant than you,'
            },
            {
                name: 'line_3',
                desc: "but there's no excuse for"
            },
            {
                name: 'line_4',
                desc: 'anyoneto work harder than'
            },
            {
                name: 'line_5',
                desc: 'you do."'
            },
        ]
        return (
            <View style={[styles.container, { backgroundColor: 'rgba(74,74,74,1)' }]}>
                <Image source={AppImages.app_icon} resizeMode={'contain'} style={newStyles.appIconStyle}></Image>
                <View style={{ position: 'absolute', bottom: 25 }}>
                    {FIELDS_DATA.map((Value, key) => { return this.renderData(Value, key) })}
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={newStyles.DescText}>Derek Jeter</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default SplashScreen;

const newStyles = StyleSheet.create({
    appIconStyle: {
        height: 55,
        width: WINDOW.width - 90,
    },
    DescText: {
        color: Colors.white,
        fontSize: 14
    }
})