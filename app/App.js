import React, { Component } from 'react';
import Routers from './Routers';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainContainer from './container/MainContainer/MainContainer';
import { View } from 'react-native';
import styles from './theme/index';
import Toast from './common/Toast';
import OfflineAlert from './common/OfflineAlert';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <View style={{ flex: 1 }}> */}
                    <View style={{ flex: 1 }}>
                        <Routers />
                        <MainContainer />
                        <Toast></Toast>
                    </View>
                    {/* </View> */}
                </PersistGate>
                <OfflineAlert></OfflineAlert>
            </Provider>
        )
    }
}