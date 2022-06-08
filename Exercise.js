import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { color } from 'react-native-reanimated';







class Exercise extends Component {

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


    deleteExercise() {


        var t = this.props.token
        t = t.replace(/\"/g, "")

        var url = 'http://cs571.cs.wisc.edu:5000/activities/' + this.props.id

        url = url.replace(/\"/g, "")
        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "")


        fetch(url, {
            method: 'DELETE',
            headers: {
                'x-access-token': t
            }
        })



    }

    editExercise() { }

    render() {

        

        return (
            //set all content to be accessible with a label of "Exercise " so that it is not distracting for the given tasks
            <View style={styles.container} accessible={false} accessibilityLabel="Exercise" >

                <Text style={styles.name}  accessible={false}>{this.props.name} </Text>
                <Text accessible={false}>{"Duration: " + this.props.duration  + " mins"} </Text>
                <Text accessible={false}>{"Date: " + this.props.date.toString()} </Text>
                <Text accessible={false}>{"Calories Burned: " + this.props.cb  + " calories"} </Text>

                <StatusBar style="auto" />
            </View>
        );


    }

}

const styles = StyleSheet.create({
    container: {

        marginTop: 5,   
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 7
    },

    name: {
        fontWeight: 'bold',

    },
});

export default Exercise;
