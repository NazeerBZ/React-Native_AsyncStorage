import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Tab, Tabs, Title, Icon, Input, Item, TabHeading } from 'native-base';
import { AsyncStorage, View, Alert, Image } from 'react-native';


export class AllPatient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            patientsList: [],
            filteredListByName: [],
            filteredListByDate: [],
            searchBarUpforDate: false
        }
        this.newPatientList = [];
    }

    componentWillMount() {

        AsyncStorage.getItem('patients', (err, result) => {
            AsyncStorage.getItem('currentDocterId', (err, currentDocId) => {

                var tempPatientsList = JSON.parse(result);
                console.log(tempPatientsList)
                this.newPatientList = [];
                if (tempPatientsList !== null) {
                    for (var i = 0; i < tempPatientsList.length; i++) {
                        if (tempPatientsList[i].docId.toString() === currentDocId) {
                            this.newPatientList.push(tempPatientsList[i])

                            console.log(tempPatientsList[i].docId)
                            console.log(currentDocId)
                        }
                    }
                }
                this.setState({
                    patientsList: this.newPatientList
                })
            })
        })
    }

    deletePatientOfCurrentDr = (index) => {

        this.state.patientsList.splice(index, 1);

        this.setState({
            patientsList: this.state.patientsList
        })

        AsyncStorage.setItem('patients', JSON.stringify(this.state.patientsList))
    }


    allPatientsOfCurrentDr() {
        return (
            <View>
                {this.state.patientsList.length !== 0 ?
                    <List>
                        {this.state.patientsList.map((patObj, index) => {
                            return (
                                <ListItem key={index} onPress={() => {
                                    Alert.alert(
                                        'Details',
                                        "Medication: " + patObj.medicationProvided + "\n" + "Cost: " + patObj.cost,

                                        [
                                            { text: 'Delete', onPress: () => this.deletePatientOfCurrentDr(index) },
                                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                                        ]

                                    )
                                }}>
                                    <Body>
                                        <Text>{patObj.patientName}</Text>
                                        <Text note>{patObj.disease}</Text>
                                    </Body>
                                    <Right>
                                        <Text note>{patObj.dateOfArrival}</Text>
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List>
                    :
                    <Button block light>
                        <Text>No Patient Added</Text>
                    </Button>
                }
            </View>
        )
    }

    searchByName = (text) => {
        var duplicateSignal = false;
        var NeedToClear = true;

        if (text !== '') {
            console.log(text.length)
            for (var i = 0; i < this.state.patientsList.length; i++) {
                slicedWord = this.state.patientsList[i].patientName.slice(0, text.length);
                console.log(slicedWord, text)
                if (slicedWord === text) {

                    for (var j = 0; j < this.state.filteredListByName.length; j++) {
                        if (this.state.filteredListByName[j].patientName === this.state.patientsList[i].patientName) {
                            duplicateSignal = true;
                            NeedToClear = false;

                            this.state.filteredListByName = [];
                            this.state.filteredListByName.push(this.state.patientsList[i]);
                            this.setState({
                                filteredListByName: this.state.filteredListByName
                            })
                            console.log('duplicate');
                        }
                    }

                    if (duplicateSignal === false) {
                        this.state.filteredListByName.push(this.state.patientsList[i])
                        NeedToClear = false;
                        this.setState({
                            filteredListByName: this.state.filteredListByName
                        })
                        console.log('Add into list')
                    }
                }
                else {
                    console.log(NeedToClear)
                    if (i === this.state.patientsList.length - 1) {
                        if (NeedToClear === true) {

                            this.setState({
                                filteredListByName: []
                            })
                            console.log('2nd clear')
                        }
                    }
                }
            }
        }
        else {
            this.setState({
                filteredListByName: []
            })
            // console.log('1nd clear')
        }
    }

    allPatientsFilteredByNameOfCurrentDr() {
        return (
            <List>
                {this.state.filteredListByName.map((patObj, index) => {
                    return (
                        <ListItem key={index} onPress={() => {
                            Alert.alert(
                                'Details',
                                "Medication: " + patObj.medicationProvided + "\n" + "Cost: " + patObj.cost,

                                [
                                    { text: 'Delete', onPress: () => this.deletePatientOfCurrentDr(index) },
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]

                            )
                        }}>
                            <Body>
                                <Text>{patObj.patientName}</Text>
                                <Text note>{patObj.disease}</Text>
                            </Body>
                            <Right>
                                <Text note>{patObj.dateOfArrival}</Text>
                            </Right>
                        </ListItem>
                    )
                })}
            </List>
        )
    }


    searchByDate = (text) => {
        var duplicateSignal = false;
        var NeedToClear = true;

        if (text !== '') {
            console.log(text.length)
            for (var i = 0; i < this.state.patientsList.length; i++) {
                slicedWord = this.state.patientsList[i].dateOfArrival.slice(0, text.length);
                console.log(slicedWord, text)
                if (slicedWord === text) {

                    for (var j = 0; j < this.state.filteredListByDate.length; j++) {
                        if (this.state.filteredListByDate[j].dateOfArrival === this.state.patientsList[i].dateOfArrival) {
                            duplicateSignal = true;
                            NeedToClear = false;

                            this.state.filteredListByDate = [];
                            this.state.filteredListByDate.push(this.state.patientsList[i]);
                            this.setState({
                                filteredListByDate: this.state.filteredListByDate
                            })
                            console.log('duplicate');
                        }
                    }

                    if (duplicateSignal === false) {
                        this.state.filteredListByDate.push(this.state.patientsList[i])
                        NeedToClear = false;
                        this.setState({
                            filteredListByDate: this.state.filteredListByDate
                        })
                        console.log('Add into list')

                    }
                }
                else {
                    console.log(NeedToClear)
                    if (i === this.state.patientsList.length - 1) {
                        if (NeedToClear === true) {

                            this.setState({
                                filteredListByDate: []
                            })
                            console.log('2nd clear')
                        }
                    }
                }
            }
        }
        else {
            this.setState({
                filteredListByDate: []
            })
            console.log('1nd clear')
        }
    }

    allPatientsFilteredByDateOfCurrentDr = () => {
        return (
            <List>
                {this.state.filteredListByDate.map((patObj, index) => {
                    return (
                        <ListItem key={index} onPress={() => {
                            Alert.alert(
                                'Details',
                                "Medication: " + patObj.medicationProvided + "\n" + "Cost: " + patObj.cost,

                                [
                                    { text: 'Delete', onPress: () => this.deletePatientOfCurrentDr(index) },
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]

                            )
                        }}>
                            <Body>
                                <Text>{patObj.patientName}</Text>
                                <Text note>{patObj.disease}</Text>
                            </Body>
                            <Right>
                                <Text note>{patObj.dateOfArrival}</Text>
                            </Right>
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    presentOnDateSearchBar = () => {
        console.log('asdf')
        this.setState({
            searchBarUpforDate: true
        })
    }

    render() {

        console.log('filterdList By Name', this.state.filteredListByName)

        return (
            <Content>
                <Tabs initialPage={1} >

                    <Tab heading={<TabHeading style={style.headerStyle}><Icon name="person" style={{ color: 'white' }}></Icon><Text style={{ color: 'white' }}>Name</Text></TabHeading>} activeTabStyle={style.headerStyle}>

                        <Header searchBar rounded style={style.headerStyle}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="search by name" onChangeText={(text) => { this.searchByName(text) }} />
                                <Icon name="ios-people" />
                            </Item>
                        </Header>

                        {
                            this.state.filteredListByName.length === 0 ?
                                this.allPatientsOfCurrentDr()
                                :
                                this.allPatientsFilteredByNameOfCurrentDr()
                        }
                    </Tab>

                    <Tab heading={<TabHeading style={style.headerStyle}><Icon name="grid" style={{ color: 'white' }}></Icon><Text style={{ color: 'white' }}>Date</Text></TabHeading>} activeTabStyle={style.headerStyle}>

                        <Header searchBar rounded style={style.headerStyle}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="search by date" onChangeText={(text) => { this.searchByDate(text) }} />
                                <Icon name="ios-people" />
                            </Item>
                        </Header>

                        {
                            this.state.filteredListByDate.length === 0 ?
                                this.allPatientsOfCurrentDr()
                                :
                                this.allPatientsFilteredByDateOfCurrentDr()
                        }

                    </Tab>
                </Tabs>
            </Content>
        );
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
}

{/*<Button onPress={() => { console.log(this.state.filteredListByName) }}><Text>get value</Text></Button>*/ }