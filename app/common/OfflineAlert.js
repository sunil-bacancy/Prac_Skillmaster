// @flow
import React, { Component } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { smartScale, WINDOW } from '../utils/AppUtils';

// type Props = {};

// type State = {
//     isConnected: boolean,
//     animatedHeight: any,
// };

export default class OfflineAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            animatedHeight: new Animated.Value(0),
        };
    }

    animateTo = (height) => {
        Animated.timing(this.state.animatedHeight, {
            toValue: height,
            duration: 2000,
        }).start();
    };

    componentDidMount() {
        this._subscription = NetInfo.addEventListener(
            this.handleConnectivityChange,
        );
    }

    componentWillUnmount() {
        this._subscription && this._subscription();
    }

    handleConnectivityChange = (state) => {
        if (state.isConnected) {
            this.setState({ isConnected: state.isConnected });
            this.animateTo(0);
        } else {
            this.setState({ isConnected: state.isConnected });
            this.animateTo(40);
        }
    };

    render() {
        const theColor = this.state.isConnected
            ? { backgroundColor: 'green' }
            : { backgroundColor: 'red' };
        const theMessage = this.state.isConnected
            ? 'Back Online'
            : 'No Internet Connection!';
        return (
            <Animated.View
                style={[
                    newstyle.offlineContainer,
                    theColor,
                    { height: this.state.animatedHeight },
                ]}>
                <Text style={newstyle.offlineText}> {theMessage} </Text>
            </Animated.View>
        );
    }
}

const newstyle = StyleSheet.create({
    offlineContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        bottom: 0,
        overflow: 'hidden',
    },
    offlineText: {
        color: '#fff',
        fontFamily: 'roboto-regular',
        fontSize: smartScale(4),
    },
});