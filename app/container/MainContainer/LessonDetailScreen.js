import React from 'react';
import { Component } from 'react';
import { Keyboard, Text, View } from 'react-native';
import Header from '../../common/Header'
import withLoader from '../../redux/actionCreator/withLoader';
import withUser from '../../redux/actionCreator/withUser';

class LessonDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessonData: null,
        }
    }

    componentDidMount() {
        this.callGetLesson();
    }

    callGetLesson() {
        const { loader } = this.props;
        Keyboard.dismiss()
        loader(true)
        loader(false)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header showBackBtn></Header>
            </View>
        )
    }
}

export default withLoader(withUser(LessonDetailScreen));