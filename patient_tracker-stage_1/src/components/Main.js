import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import { DrawerNavigator } from 'react-navigation';
import { AddPatient, AllPatient, Logout } from './index.js';


const Main = DrawerNavigator({

    "Add Patient": {
        screen: AddPatient
    },

    "All Patient": {
        screen: AllPatient
    },

    "Logout": {
        screen: Logout
    }
})

export default Main;