import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { smartScale } from '../../utils/AppUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import PrivacyPolicy from '../../common/PrivacyPolicy.json';
import TermsOfService from '../../common/TermsOfService.json';

class PrivacyPolicyScreen extends Component {
    render() {
        const { title } = this.props;
        console.log('title', title);
        return (
            <View style={{ flex: 1 }}>
                <View style={[newStyle.buttonViewStyle, { marginTop: smartScale(3), marginHorizontal: smartScale(2) }]}>
                    <AntDesign
                        name='back'
                        color={Colors.trophyTextColor}
                        size={smartScale(5.5)}
                    ></AntDesign>
                    <Text style={newStyle.sectionTextStyle}>{title}</Text>
                </View>
                <ScrollView
                    style={{
                        flex: 1,
                        marginBottom: smartScale(3.5),
                        marginTop: smartScale(1),
                        marginHorizontal: smartScale(2)
                    }}
                >
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para1}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para1}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para2}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para2}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para3}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para3}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para4}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para4}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para5}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para5}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para6}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para6}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para7}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para7}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para8}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para8}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para9}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para9}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para10}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para10}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para11}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para11}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para12}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para12}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para13}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para13}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        <Text style={newStyle.privacyTextStyle}>{PrivacyPolicy.privacypolicy.para14}</Text>
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>{TermsOfService.termsofservice.para14}</Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para15}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para16}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para17}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para18}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para19}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para20}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para21}
                            </Text>
                        )}
                    {this.props.title === 'Privacy Policy' ? (
                        null
                    ) : (
                            <Text style={newStyle.privacyTextStyle}>
                                {TermsOfService.termsofservice.para22}
                            </Text>
                        )}
                </ScrollView>
            </View>
        )
    }
}

export default PrivacyPolicyScreen;

const newStyle = StyleSheet.create({
    buttonViewStyle: {
        flexDirection: 'row',
    },
    sectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        marginTop: smartScale(0.3),
        fontSize: smartScale(4),
        marginLeft: smartScale(1.5)
    },
    privacyTextStyle: {
        fontFamily: 'roboto-regular',
        color: Colors.trophyTextColor,
        fontSize: smartScale(2.5),
    },
})