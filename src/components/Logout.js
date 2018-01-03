import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export class Logout extends Component {

    componentWillMount() {

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'login'
            })]
        });

        this.props.navigation.dispatch(resetAction);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    }

    render() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
}