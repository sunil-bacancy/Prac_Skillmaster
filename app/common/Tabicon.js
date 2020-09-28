import React, { Component } from 'react';
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../theme/Colors';
import styles from '../theme/index';

class Tabicon extends Component {
    render() {
        const { title } = this.props;
        if (title === 'Shop') {
            return (
                <View style={styles.tabContainerStyle}>
                    <Entypo name="shop" size={smartScale(2)} color={this.props.focused ? Colors.errorText : Colors.tabIconActiveColor} />
                </View>
            )
        } else if (this.props.title === 'Trophy') {
            return (
                <View style={styles.tabContainerStyle}>
                    <Ionicons name="md-trophy" size={smartScale(2)}
                        color={this.props.focused ? Colors.black : Colors.tabIconActiveColor}
                    />
                </View>
            );
        } else if (this.props.title === 'Teach') {
            return (
                <View style={styles.tabContainerStyle}>
                    <MaterialCommunityIcons name="teach" size={smartScale(2)}
                        color={this.props.focused ? Colors.black : Colors.tabIconActiveColor}
                    />

                </View>
            );
        } else if (this.props.title === 'Accountswitch') {
            return (
                <View style={styles.tabContainerStyle}>
                    <MaterialCommunityIcons name="account-switch" size={smartScale(2)}
                        color={this.props.focused ? Colors.black : Colors.tabIconActiveColor}
                    />
                </View>
            );
        }
    }
}

export default Tabicon;