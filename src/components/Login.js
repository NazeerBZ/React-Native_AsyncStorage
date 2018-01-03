import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, View, Alert, ActivityIndicator } from 'react-native';

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            passwordText: '',
            isloggedIn: ''
        }

        AsyncStorage.getItem('isLoggedIn', (err, result) => {
            this.res = JSON.parse(result);
        })
            .then(() => {
                this.setState({
                    nameText: '',
                    passwordText: '',
                    isloggedIn: this.res
                })
            })
    }

    login = () => {

        if (this.state.nameText !== '' && this.state.passwordText !== '') {

            var docters = [];
            var flag = false;
            AsyncStorage.getItem('docters', (err, result) => {
                if (JSON.parse(result) !== null) {
                    docters = JSON.parse(result)

                    for (var i = 0; i < docters.length; i++) {
                        dr = docters[i]

                        if (dr.docterName === this.state.nameText && dr.docterPassword === this.state.passwordText) {
                            flag = true
                            AsyncStorage.setItem('currentDocterId', JSON.stringify(dr.id));
                            this.props.navigation.navigate('main');
                            AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                            break;
                        }
                    }
                }

                if (flag === false) {
                    Alert.alert(
                        'error',
                        'wrong Username and Password'
                    )
                }
            })
        }
    }

    goToSignup = () => {
        this.props.navigation.navigate('signup')
    }

    render() {
        if (this.state.isloggedIn === false || this.state.isloggedIn === null) {
            return (
                <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                    <Header style={style.headerStyle} >
                        <Body>
                            <Title>Patient Tracker</Title>
                        </Body>
                    </Header>
                    <Content padder>
                        <Form>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input onChangeText={(nameText) => { this.setState({ nameText }) }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                            </Item>
                        </Form>

                        <Button block onPress={this.login} style={style.loginBtn}><Text>Login</Text></Button>
                        <Title onPress={this.goToSignup} style={style.createAccountStyle}>Create a new account <Text style={style.signupStyle}>Signup</Text></Title>
                    </Content>
                </Image>
            )
        }
        else if (this.state.isloggedIn === '') {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                    animating={true}
                />
            )
        }
        else {
            return (
                <View>
                    {this.props.navigation.navigate('main')}
                </View>
            )
        }
    }
}

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    createAccountStyle: { color: 'black', fontSize: 15, marginTop: 7 },
    signupStyle: { color: '#365899' },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}

