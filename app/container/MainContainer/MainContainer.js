import React, { Component } from 'react';
import { View } from 'react-native';
import Loader from '../../common/Loader';
// import Toast from 'Toast';
import { WINDOW } from '../../utils/AppUtils';

class MainContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                position: 'absolute',
                right: 0,
                left: 0,
                width: WINDOW.width,
                zIndex: 9999,
            }}>
                <Loader />
                {/* <Toast /> */}
            </View>
        );
    }

}

export default MainContainer;