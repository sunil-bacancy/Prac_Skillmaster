// import React, { Component } from 'react';
// import { View } from 'react-native';
// import Loader from '../../common/Loader';
// import { WINDOW } from '../../utils/AppUtils';

// export default class MainContainer extends Component {
//     constructor(props) {
//         super(props);
//         console.disableYellowBox = true;
//     }

//     render() {

//         return (
//             <View style={{
//                 flex: 1,
//                 position: 'absolute',
//                 right: 0,
//                 left: 0,
//                 width: WINDOW.width,
//                 zIndex: 9999,
//             }}>
//                 <Loader />
//             </View>
//         )
//     }
// }

import React, { Component } from 'react';
import { View } from 'react-native';
import Loader from '../../common/Loader';
// import Toast from 'Toast';
import { WINDOW } from '../../utils/AppUtils';

class MainContainer extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
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