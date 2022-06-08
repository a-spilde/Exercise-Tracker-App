import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';







class RealExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "",
            duration: "",
            date: "",
            cb: "",
            token: "",
            id: ""

        };
    };

    componentDidMount() {
        this.loadInitialState();
    }

    async loadInitialState() {




        this.setState({

            name: this.props.name,
            duration: this.props.duration,
            date: this.props.date,
            cb: this.props.cb,
            token: this.props.token,
            id: this.props.id


        })

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
        }).then(() => {
            fetch('http://cs571.cs.wisc.edu:5000/activities/', {
                method: 'GET',
                headers: {
                    'x-access-token': t
                }
            })
        }).then(() => this.props.delete(true))//fetch exercises








    }



    edit() {

        var arr = []



        arr.push(this.state.name)
        arr.push(this.state.duration)
        arr.push(this.state.date)
        arr.push(this.state.cb)
        arr.push(this.state.token)
        arr.push(this.state.id)

        this.props.callback(arr)

    }

    render() {



        return (
            //set all content to be accessible with a label of "Exercise " so that it is not distracting for the given tasks
            <View style={styles.container} accessible={false} accessibilityLabel="Exercise" >

                <Text style={styles.name}  accessible={false}>{this.props.name}</Text>
                <Text accessible={false}>{"Duration: " + this.props.duration + " mins"} </Text>
                <Text accessible={false}>{"Date: " + this.props.date.toString()} </Text>
                <Text accessible={false}>{"Calories Burned: " + this.props.cb + " calories"} </Text>

                <View style={styles.fixToText}>
                    <View style={{ marginRight: 5 }}>
                        <Button
                            title="REMOVE EXERCISE"
                            onPress={() => this.deleteExercise()}
                            color='red'
                        />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <Button
                            title="EDIT EXERCISE"
                            onPress={() => this.edit()}
                            color='grey'
                        />
                    </View>
                </View>

                <StatusBar style="auto" />
            </View>
        );


    }

}

const styles = StyleSheet.create({
    container: {

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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});

export default RealExercise;
