import { StyleSheet, Platform } from 'react-native';
import { smartScale, fontSizeMedium, FONT_PRIMARY_REGULAR, fontSizeContent, WINDOW, FONT_PRIMARY_BOLD, FONT_SECONDARY_LIGHT, fontSizeSmall } from '../utils/AppUtils';
import Colors from '../theme/Colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    placeholder: {
        letterSpacing: 0.5,
        color: Colors.placeholderTextColor,
        fontSize: smartScale(5)
    },
    itemInputField: {
        backgroundColor: Colors.white,
        // borderColor: Colors.authenticationButtonColor,
        // borderWidth: smartScale(0.5),
        height: smartScale(6),
        flexDirection: 'row',
        borderRadius: smartScale(1),
        // borderColor: Colors.white,
        // backgroundColor: Colors.white,
        // borderRadius: smartScale(1),
        // borderWidth: 0.7,
        // width: '70%',
        // height: smartScale(6.5),
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
    },

    // inputStyle: {
    //     height: smartScale(30),
    //     // width: '90%',
    //     // color: 'black',
    //     fontSize: fontSizeMedium,
    //     fontFamily: fontSizeSmall,
    //     letterSpacing: 0.5,
    //     // paddingLeft: smartScale(5),
    // },
    loginButtonContainer: {
        backgroundColor: Colors.authenticationButtonColor,
        height: smartScale(6),
        width: smartScale(23),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: smartScale(0.5),
        // marginTop: smartScale(2.3),
    },
    loginText: {
        color: Colors.white,
        fontSize: smartScale(2.5),
        fontFamily: FONT_SECONDARY_LIGHT
    },
    navigationButton: {
        borderRadius: smartScale(1),
        width: WINDOW.width,
        // height: smartScale(40),
        // alignItems: 'center',
        // padding: smartScale(10),
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        // backgroundColor: 'white',
        // borderRadius: smartScale(5),
        // marginVertical: smartScale(10),
        // marginTop: smartScale(5)
    },
    errorText: {
        color: Colors.errorText,
        // fontFamily: FONT_PRIMARY_REGULAR,
        fontSize: smartScale(1.6),
        // letterSpacing: smartScale(0.5) >= 0.25 ? smartScale(0.5) : 0.25,
    },
    errorInputRaw: {
        flex: 1,
        paddingLeft: smartScale(1.5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    infoInputRaw: {
        flexDirection: 'row',
        height: smartScale(2),
    },
    infoRaw: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    infoText: {
        // fontFamily: FONT_PRIMARY_REGULAR,
        fontSize: smartScale(2),
        color: Colors.authenticationButtonColor,
        marginTop: smartScale(2),
    },
    tabContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: smartScale(5),
        paddingRight: smartScale(5),
        marginTop: Platform.OS === 'ios' ? smartScale(0) : smartScale(0),
        height: smartScale(40),
    },
    SectionTextStyle: {
        fontFamily: 'audiowide-regular',
        color: Colors.trophyTextColor,
        // marginTop: smartScale(3),
        fontSize: smartScale(3.5),
    },
})

export default styles;

