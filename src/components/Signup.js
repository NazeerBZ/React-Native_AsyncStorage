import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, Alert } from 'react-native';

export class Signup extends Component {


    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            emailText: '',
            passwordText: ''
        }
    }

    signup = () => {

        var flag = true;

        if (this.state.nameText !== '' && this.state.emailText !== '' && this.state.passwordText !== '') {

            var validationcode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (validationcode.test(this.state.emailText)) {

                AsyncStorage.getItem('docters', (err, result) => {
                    var docters = [];
                    JSON.parse(result) !== null ?
                        docters = JSON.parse(result)
                        :
                        docters = []
                        ;

                    for (var i = 0; i < docters.length; i++) {
                        if (docters[i].docterName === this.state.nameText) {
                            Alert.alert(
                                'error',
                                'username already exists'
                            )
                            flag = false;
                        }
                    }

                    if (flag === true) {
                        var docObj = {
                            id: docters.length + 1,
                            docterName: this.state.nameText,
                            docterEmail: this.state.emailText,
                            docterPassword: this.state.passwordText
                        }

                        docters.push(docObj)

                        AsyncStorage.setItem('docters', JSON.stringify(docters));

                        this.props.navigation.navigate('login')
                    }
                })
            }
            else {
                Alert.alert(
                    'error',
                    'badly formatted email'
                )
            }
        }
    }

    render() {

        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Left>
                        <Icon name='arrow-back' onPress={() => { this.props.navigation.navigate('login') }} />
                    </Left>
                    <Body>
                        <Title>Patient Tracker</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(nameText) => { this.setState({ nameText }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                        </Item>
                    </Form>

                    <Button block onPress={this.signup} style={style.loginBtn}><Text>SignUp</Text></Button>
                    {/*{/*<Button onPress={() => { AsyncStorage.removeItem('patients') }}><Text>remove patient</Text></Button>*/}
                    {/*<Button onPress={() => { AsyncStorage.removeItem('docters') }}><Text>remove patient</Text></Button>*/}

                </Content>
            </Image>
        )
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
}
