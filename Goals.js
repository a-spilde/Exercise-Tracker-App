import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';







class Goals extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {
        this.loadInitialState();
    }

    async loadInitialState() {


    }





    render() {

        

        return (
            <View style={styles.container}>

                <Text>{this.props.category + ": " + this.props.actual + "/" + this.props.goal + " " + this.props.measurement} </Text>

                <StatusBar style="auto" />
            </View>
        );


    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Goals;
