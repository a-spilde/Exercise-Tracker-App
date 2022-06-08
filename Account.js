import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from "./TodayScreen";
import InfoScreen from "./InfoScreen";







class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            calories: "",
            protein: "",
            carbs: "",
            fat: "",
            activity: "",
            token: "",
        };
    };

    componentDidMount() {
        this.loadInitialState();
    }

    async loadInitialState() {




        const { username, password, token } = this.props.route.params



        var u = JSON.stringify(username)
        var t = JSON.stringify(token)
        t = t.replace(/\"/g, "")

        var url = 'http://cs571.cs.wisc.edu:5000/users/' + u

        url = url.replace(/\"/g, "")


        var tfirst
        var tlast
        var tcals
        var tprotein
        var tcarbs
        var tfat
        var tactivity

        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': t
            }
        }).then(res => res.json())
            .then(res => {



                if (true) {




                    tfirst = res.firstName
                    tlast = res.lastName
                    tcals = res.goalDailyCalories
                    tprotein = res.goalDailyProtein
                    tcarbs = res.goalDailyCarbohydrates
                    tfat = res.goalDailyFat
                    tactivity = res.goalDailyActivity

                    this.setState({
                        firstname: res.firstName,
                        lastname: res.lastName,
                        calories: res.goalDailyCalories,
                        protein: res.goalDailyProtein,
                        carbs: res.goalDailyCarbohydrates,
                        fat: res.goalDailyFat,
                        activity: res.goalDailyActivity

                    });




                } else {

                    this.setState({
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fat: 0,
                        activity: 0

                    });


                }
            })



        this.setState({
            username: JSON.stringify(username),
            password: JSON.stringify(password),
            firstname: tfirst,
            lastname: tlast,
            calories: tcals,
            protein: tprotein,
            carbs: tcarbs,
            fat: tfat,
            activity: tactivity,
            token: JSON.stringify(token)

        });
    }

    submitInfo(t) {


        var u = this.state.username
        var t = this.state.token
        t = t.replace(/\"/g, "")

        var url = 'http://cs571.cs.wisc.edu:5000/users/' + u

        url = url.replace(/\"/g, "")


        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': t
            },
            body: JSON.stringify({

                firstName: this.state.firstname,
                lastName: this.state.lastname,
                goalDailyCalories: this.state.calories,
                goalDailyProtein: this.state.protein,
                goalDailyCarbohydrates: this.state.carbs,
                goalDailyFat: this.state.fat,
                goalDailyActivity: this.state.activity
            })
        }).then(res => {
            if (!res.ok) {
                res.text().then(text => Alert.alert(JSON.parse(text).message))

            }
            else {

                Alert.alert("Your profile has been updated!")

            }

        })


    }

    async getActivity() {

        var ret = await this.state.activity

        return ret

    }

    today() {

        this.props.navigation.navigate('TodayScreen', {
            cals: this.state.calories,
            protein: this.state.protein,
            carbs: this.state.carbs,
            fat: this.state.fat,
            activity: this.state.activity
        })

    }



    render() {

        // const Tab = createBottomTabNavigator();

        const Tab = createBottomTabNavigator();

        return (

                <Tab.Navigator>
                    <Tab.Screen name="TodayScreen" component={TodayScreen} />
                    <Tab.Screen name="InfoScreen" component={InfoScreen} />
                </Tab.Navigator>

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

export default Account;
