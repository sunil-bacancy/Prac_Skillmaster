import { Dimensions, Platform } from 'react-native';
import Colors from '../theme/Colors';

export const WINDOW = Dimensions.get('window');
export const deviceType = WINDOW.width < 480 ? 'phone' : 'tablet';
export const iPhoneX = (Platform.OS === 'ios' && (WINDOW.height === 812 || WINDOW.height === 896));

export const FONT_PRIMARY_REGULAR = 'robote-regular';
export const FONT_SECONDARY_LIGHT = 'roboto-regular';
export const FONT_PRIMARY_BOLD = 'roboto-regular';
export const FONT = ''

//Login type
export const LOGIN_FACEBOOK = 'FACEBOOK';
export const LOGIN_GOOGLE = 'GOOGLE';
export const LOGIN_APPLE = 'APPLE';

export const smartScale = (value) => {
    const height = Platform.OS === 'ios' ? iPhoneX ? WINDOW.height - 78 : WINDOW.height : WINDOW.height - 24;
    if (deviceType == 'phone') {
        return (value * height) / 100;
    } else {
        return (value * height) / 100;
    }
}

const screenPaddingValue = iPhoneX ? smartScale(17) : smartScale(26);
export const screenChatPaddingValue = iPhoneX ? smartScale(34) : smartScale(26);
const scalarSpace = iPhoneX ? smartScale(11) : smartScale(13);

export const getWidthByColumn = (column = 1) => {
    const totalPixel = WINDOW.width;
    const totalSpace = ((screenPaddingValue * 2) + (scalarSpace * (column - 1)));
    return ((totalPixel - totalSpace) / column);
};

export const headerHeight = Platform.OS === 'ios' ? iPhoneX ? smartScale(87) : smartScale(65) : smartScale(45);
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const webSiteRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const noSpace = /^\S+$/;
export const numberRegex = /^\d+$/;

export const fontSizeLarge = smartScale((deviceType == 'phone') ? 20 : 36);
export const fontSizeMedium = smartScale((deviceType == 'phone') ? 14 : 14);
export const fontSizeSmall = smartScale((deviceType == 'phone') ? 14 : 16);
export const fontSizeExtraSmall = smartScale((deviceType == 'phone') ? 10 : 14);
export const fontSizeContent = smartScale((deviceType == 'phone') ? 12 : 14);

export const TIMEUNIT = [
    { value: "hour" },
    { value: "minute" },
]

export const DURATION_DATA = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
];

export const GROUP_SIZE_DATA = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
];
export const WORKING_DAY = [
    { value: 'Sunday' },
    { value: 'Monday' },
    { value: 'Tuesday' },
    { value: 'Wednesday' },
    { value: 'Thursday' },
    { value: 'Friday' },
    { value: 'Saturday' },
];

export const TIMEDATA = [
    { value: "06:00 AM" },
    { value: "07:00 AM" },
    { value: "08:00 AM" },
    { value: "09:00 AM" },
    { value: "10:00 AM" },
    { value: "11:00 AM" },
    { value: "12:00 PM" },
    { value: "01:00 PM" },
    { value: "02:00 PM" },
    { value: "03:00 PM" },
    { value: "04:00 PM" },
    { value: "05:00 PM" },
    { value: "06:00 PM" },
    { value: "07:00 PM" },
    { value: "08:00 PM" },
    { value: "09:00 PM" },
    { value: "10:00 PM" },
    { value: "11:00 PM" },
    { value: "12:00 AM" },
    { value: "01:00 AM" },
    { value: "02:00 AM" },
    { value: "03:00 AM" },
    { value: "04:00 AM" },
    { value: "05:00 AM" },
]