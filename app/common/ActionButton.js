import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import styles from '../theme';
import { fontSizeSmall, FONT_PRIMARY_REGULAR, smartScale } from '../utils/AppUtils';

function ActionButton(props) {
    return (
        <View>
            <TouchableOpacity
                style={[styles.navigationButton, props.containerStyle]}
                onPress={props.onPress}>
                <View
                    style={props.icon != null ?
                        newStyles.viewStyle :
                        [
                            newStyles.viewStyle,
                            {
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        ]}>
                    {props.icon != null ?
                        (
                            <Icons
                                name={props.icon}
                                resizeMode={'cover'}
                                style={[
                                    {
                                        marginRight: smartScale(1),
                                        // marginLeft: smartScale(20),
                                        // height: smartScale(20),
                                        // width: smartScale(20),
                                        color: 'white',
                                    },
                                    // props.iconStyle,
                                ]}
                                size={20}
                            ></Icons>
                        ) : null}
                    <Text
                        style={[newStyles.textstyle, props.textstyle]}
                        numberOfLines={1}
                    >
                        {props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ActionButton;

const newStyles = StyleSheet.create({
    textstyle: {
        fontSize: smartScale(2),
        color: 'white',
        fontWeight: '400',
        // fontFamily: FONT_PRIMARY_REGULAR,
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})