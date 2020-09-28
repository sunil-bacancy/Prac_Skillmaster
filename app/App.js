import React, { Component } from 'react';
import Routers from './Routers';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainContainer from './container/MainContainer/MainContainer';
import { View } from 'react-native';
import styles from './theme/index';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <View style={{ flex: 1 }}> */}
                    <View style={{ flex: 1 }}>
                        <Routers />
                        <MainContainer />
                    </View>
                    {/* </View> */}
                </PersistGate>
            </Provider>
        )
    }
}