import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Title } from 'native-base';
import { Provider } from 'react-redux';
import Store from './store/Store';
import Nav from './Nav';

class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <Nav />
            </Provider>
        )
    }
}

export default App;