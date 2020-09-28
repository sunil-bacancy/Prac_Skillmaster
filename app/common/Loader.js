import React, { Component } from 'react';
import { Modal, View, ActivityIndicator, Platform } from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import Colors from '../theme/Colors';

class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loaderState } = this.props;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loaderState}
                onRequestClose={() => {
                    console.log('close modal');
                }}>
                <View
                    style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flex: 1,
                    }}>
                    <View
                        style={{
                            borderRadius: 20,
                            overflow: 'hidden',
                            backgroundColor: 'rgba(74,74,74,1)',
                            padding: 10,
                            borderWidth: 2,
                            borderColor: Colors.black
                        }}>
                        <ActivityIndicator
                            size="large"
                            color={'#E6E6E6'}
                            size={Platform.OS == 'ios' ? 1 : 25}
                            animating={loaderState}
                            style={{
                                margin: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

export default withLoader(Loader);
