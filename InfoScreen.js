import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from "./TodayScreen";
import HomeScreen from "./HomeScreen";







class InfoScreen extends Component {

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


        this.props.navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => this.props.navigation.navigate('HomeScreen')} title="Sign Out" />
            ),
        });







        var u = this.props.username
        var t = this.props.token

        

        t = t.replace(/\"/g, "")
        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");

        u = u.replace(/\"/g, "")
        u = u.replace(/\"/g, "")
        u = u.replace(/\\/g, "");

        

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
            username: this.props.username,
            password: this.props.password,
            firstname: tfirst,
            lastname: tlast,
            calories: tcals,
            protein: tprotein,
            carbs: tcarbs,
            fat: tfat,
            activity: tactivity,
            token: this.props.token

        });
    }

    async changeFirst(t) {

        await this.setState({ firstname: t })


    }

    changeLast(t) {


        this.setState({ lastname: t })

    }

    changeCals(t) {


        this.setState({ calories: t })

    }

    changeProtein(t) {


        this.setState({ protein: t })

    }

    changeCarbs(t) {


        this.setState({ carbs: t })

    }

    changeFat(t) {


        this.setState({ fat: t })

    }
    changeActivity(t) {


        this.setState({ activity: t })

    }

    submitInfo(t) {


        var u = this.state.username
        var t = this.state.token
        t = t.replace(/\"/g, "")

        u = u.replace(/\"/g, "")
        u = u.replace(/\"/g, "")
        u = u.replace(/\\/g, "")

        var url = 'http://cs571.cs.wisc.edu:5000/users/' + u

        url = url.replace(/\"/g, "")
        t = t.replace(/\"/g, "")
        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");


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

        }).then(() => this.props.cb())


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
            activity: this.state.activity,
            token: this.state.token,
            data: true
        })

    }





    render() {


        var text = ""
        var text1 = ""
        var text2 = ""
        var text3 = ""
        var text4 = ""
        var text5 = ""
        var text6 = ""
        var text7 = ""
        var text8 = ""
        var text9 = ""

        return (


            //set all content to be accessible with a label of " " so that it is not distracting for the given tasks
            <View style={styles.container}  accessible={false} accessibilityLabel=" " > 





                <Text style={styles.title} accessible={false}>About Me</Text>
                <Text style={{ fontSize: 12 }} accessible={false}>Let's get to know you!</Text>
                <Text style={{ fontSize: 12 }} accessible={false}>Specify your information below</Text>
                <Text style={styles.s} accessible={false}>Personal Information</Text>
                <Text style={styles.ss} accessible={false}>First Name</Text>

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Test"
                    textAlign="center"
                    onChangeText={text => this.changeFirst(text)}
                    defaultValue={this.state.firstname}
                    accessible={false}
                />
                <Text style={styles.ss} accessible={false}>Last Name</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="User"
                    textAlign="center"
                    onChangeText={text1 => this.changeLast(text1)}
                    defaultValue={this.state.lastname}
                    accessible={false}
                />
                <Text style={styles.s}  accessible={false}>Fitness Goals</Text>
                <Text style={styles.ss} accessible={false}>Daily Calories (kcal)</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="2200"
                    textAlign="center"
                    onChangeText={text2 => this.changeCals(text2)}
                    defaultValue={String(this.state.calories)}
                    accessible={false}
                />
                <Text style={styles.ss} accessible={false}>Daily Protein (grams)</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="120"
                    textAlign="center"
                    onChangeText={text3 => this.changeProtein(text3)}
                    defaultValue={String(this.state.protein)}
                    accessible={false}
                />
                <Text style={styles.ss} accessible={false}>Daily Carbs (grams)</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="50"
                    textAlign="center"
                    onChangeText={text4 => this.changeCarbs(text4)}
                    defaultValue={String(this.state.carbs)}
                    accessible={false}
                />
                <Text style={styles.ss} accessible={false}>Daily Fat (grams)</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="70"
                    textAlign="center"
                    onChangeText={text5 => this.changeFat(text5)}
                    defaultValue={String(this.state.fat)}
                    accessible={false}
                />
                <Text style={styles.ss} accessible={false}>Daily Activity (mins)</Text>
                <View style={{ textAlign: 'center', alignItems:"center", justifyContent:"center" }}>
                    <TextInput
                        style={{ height: 40 }}
                        placeholder="90"
                        textAlign="center"
                        onChangeText={text6 => this.changeActivity(text6)}
                        defaultValue={String(this.state.activity)}
                    />
                </View>

                <View style={styles.fixToText}>
                    <View style={{ marginRight: 5 }}>
                        <Button
                            title="SAVE PROFILE"
                            onPress={text1 => this.submitInfo(text1)}
                            color="green"
                        />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <Button
                            title="EXIT"
                            onPress={() => this.props.navigation.navigate('HomeScreen')}
                            color="red"
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        fontSize: 30,
        fontWeight: 'bold',

    },
    s: {

        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600'

    },

    ss: {


        fontSize: 15,


    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default InfoScreen;
