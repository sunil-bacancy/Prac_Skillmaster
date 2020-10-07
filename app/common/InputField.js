/**
 * SkillMaster App
 * https://github.com/bacancy/SkillMaster.git
 *
 * @Developer : Harsh Patel
 * @Author : Bacancy Technology Pvt Ltd
 * @Date : 1 May 2020
 *
 * @Screen : InputField
 * @Description :
 *
 * @providesModule InputField
 */

import React, { Component } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Field } from 'redux-form';
import styles from '../theme/index';
import Colors from '../theme/Colors';
import { smartScale } from '../utils/AppUtils';


class CustomField extends Component {

    focusInput() {
        if (this.input) {
            this.input.focus();
        }
    }

    // _doFormat = (mask, reference) => {
    //     const { onChangeText } = this.props;
    //     let newReference = mask;
    //     let ignoreCount = 0;
    //     for (let n = 0; n < reference.length; n++) {
    //         if (reference.charAt(n) != mask.charAt(n)) {
    //             newReference = newReference.replace('X', reference.charAt(n));
    //             mask.charAt(n) != 'X' && ignoreCount++;
    //         }
    //     }
    //     newReference = newReference.substr(0, reference.length + ignoreCount);
    //     onChangeText(newReference);
    // };

    render() {
        const {
            refProp, input, multiline, keyboardType, inputFormat, onChangeText, changeSuccessColor, placeholder, secureTextEntry, _onFocus, _onBlur,
            selectTextOnFocus, containerStyle, onLayout, ellipsizeMode, numberOfLines, returnKeyType, autoFocus, onEndEditing, autoGrow, maxLength, autoCapitalize, placeholderTextColor, autoCorrect, style, disabled, meta: { touched, error, warning }, leftSideComponent, onSubmitEditing,
            labelComponent, info, onInfoPress, itemInputStyle, editable, textInputStyle, value
        } = this.props;
        const hasError = (typeof error !== 'undefined' ? true : false);
        // const itemStyle = (itemInputStyle) ? itemInputStyle : styles.itemInputField;
        // let returnKey = (returnKeyType) ? (Platform.OS === 'android') ? returnKeyType : (keyboardType && keyboardType === 'numeric') ? 'done' : returnKeyType : null;

        return (
            <View style={[containerStyle]}>
                {/* {labelComponent} */}
                <View style={[styles.itemInputField, textInputStyle]}>
                    {/* {
                        (leftSideComponent) &&
                        <View>
                            {leftSideComponent}
                        </View>
                    } */}
                    <TextInput {...input}
                        ref={refProp}
                        multiline={multiline}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        selectTextOnFocus={selectTextOnFocus}
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : Colors.placeholderTextColor}
                        style={[style]}
                        // placeholderStyle={styles.placeholder}
                        autoCapitalize={autoCapitalize}
                        autoCorrect={autoCorrect}
                        autoGrow={autoGrow}
                        returnKeyType={returnKeyType}
                        autoFocus={autoFocus}
                        onEndEditing={onEndEditing}
                        onSubmitEditing={onSubmitEditing}
                        numberOfLines={numberOfLines}
                        ellipsizeMode={ellipsizeMode}
                        maxLength={maxLength}
                        editable={editable}
                        underlineColorAndroid={'transparent'}
                        onChangeText={onChangeText}
                        value={value}
                    // {...(_onFocus) ? {
                    //     onFocus: () => {
                    //         _onFocus();
                    //     },
                    // } : {}}
                    // {...(_onBlur) ? {
                    //     onBlur: () => {
                    //         _onBlur();
                    //     },
                    // } : {}}
                    />
                </View>
                <View style={[styles.infoInputRaw, (info) ? { height: smartScale(5) } : { height: smartScale(2) }]}>
                    {(hasError && touched) ?
                        <View style={styles.errorInputRaw}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View> : null}

                    {(info) && <TouchableOpacity
                        style={styles.infoRaw}
                        onPress={onInfoPress}>
                        <Text style={styles.infoText}>{info}</Text>
                    </TouchableOpacity>}

                </View>
            </View>
        );
    }
}

class InputField extends Component {
    // focus() {
    //     this.foo.getRenderedComponent().focusInput();
    // }

    render() {
        return (
            <Field
                {...this.props}
                component={CustomField}
                withRef
            />
        );
    }

}

export default InputField;