import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { AsyncStorage, Image } from 'react-native';

export class AddPatient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            diseaseText: '',
            medicationText: '',
            arrivalText: '',
            costText: ''
        }
    }

    addPatient = () => {

        if (this.state.nameText !== '' && this.state.diseaseText !== '' && this.state.medicationText !== '' && this.state.arrivalText !== '' && this.state.costText !== '') {

            var patients = []
            AsyncStorage.getItem('patients', (err, result) => {

                JSON.parse(result) !== null ?
                    patients = JSON.parse(result)
                    :
                    patients = []
                    ;

                AsyncStorage.getItem('currentDocterId', (err, result) => {

                    var patObj = {
                        docId: JSON.parse(result),
                        patientName: this.state.nameText,
                        disease: this.state.diseaseText,
                        medicationProvided: this.state.medicationText,
                        dateOfArrival: this.state.arrivalText,
                        cost: this.state.costText
                    }

                    patients.push(patObj)
                    AsyncStorage.setItem('patients', JSON.stringify(patients))
                        .then(() => {
                            this.setState({
                                nameText: '',
                                diseaseText: '',
                                medicationText: '',
                                arrivalText: '',
                                costText: ''
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        });

                })
            })
        }
    }

    render() {
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Body>
                        <Title>Add Patient</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Label>Patient Name</Label>
                            <Input onChangeText={(nameText) => { this.setState({ nameText }) }} value={this.state.nameText} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Disease</Label>
                            <Input onChangeText={(diseaseText) => { this.setState({ diseaseText }) }} value={this.state.diseaseText} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Medication Provided</Label>
                            <Input onChangeText={(medicationText) => { this.setState({ medicationText }) }} value={this.state.medicationText} />
                        </Item>

                        {/*<Label style={style.dataLableStyle}>Date Of Arrival</Label>*/}

                        <DatePicker
                            style={style.dateStyle}
                            mode="date"
                            date={this.state.arrivalText}
                            placeholder='Date of Arrival'
                            format="DD-MM-YYYY"
                            minDate="01-01-2000"
                            maxDate="01-01-2050"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(arrivalText) => { this.setState({ arrivalText }) }}
                        />

                        <Item floatingLabel>
                            <Label>Cost</Label>
                            <Input onChangeText={(costText) => { this.setState({ costText }) }} value={this.state.costText} />
                        </Item>
                    </Form>

                    <Button block onPress={this.addPatient} style={style.loginBtn}><Text>Add Patient</Text></Button>
                </Content>
                {/*<Button onPress={() => { AsyncStorage.getItem('patients', (err, result) => { console.log(JSON.parse(result)) }) }}><Text>all patients</Text></Button>
                <Button onPress={() => { AsyncStorage.getItem('docters', (err, result) => { console.log(JSON.parse(result)) }) }}><Text>all docters</Text></Button>
                <Button onPress={() => { AsyncStorage.getItem('currentDocterId', (err, result) => { console.log(JSON.parse(result)) }) }}><Text>currentDocterId</Text></Button>*/}

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
    dataLableStyle: {
        marginLeft: '4%',
        marginTop: '8%'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    dateStyle: { width: 200, marginTop: 40, marginLeft: 10 }
}




// var docter = [
//     {
//         id: '1',
//         name: 'nazeer',
//         email: 'nazeer@gmail.com',
//         password: '123456'
//     },
//     {
//         id: '2',
//         name: 'nazeer',
//         email: 'nazeer@gmail.com',
//         password: '123456'
//     }
// ]

// var Patients = [
//     {
//         docId: '1',
//         PatientName: 'khalid',
//         Disease: 'headache',
//         MedicationProvided: 'panadol',
//         DateOfArrival: '23/4/2017',
//         Cost: '102'
//     },
//     {
//         docId: '2',
//         PatientName: 'khalid',
//         Disease: 'headache',
//         MedicationProvided: 'panadol',
//         DateOfArrival: '23/4/2017',
//         Cost: '102'
//     }
// ]