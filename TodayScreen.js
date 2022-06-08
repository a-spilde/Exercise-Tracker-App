import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Goals from "./Goals";
import InfoScreen from "./InfoScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Exercise from './Exercise';
import HomeScreen from "./HomeScreen";







class TodayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calories: "",
            protein: "",
            carbs: "",
            fat: "",
            activity: 0,
            token: "",
            currAct: 0,
            acts: [],
            change: this.props.change
        };
    };

    componentDidMount() {
        this.loadInitialState();
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
                        activity: tactivity,
                        token: t
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
            calories: tcals,
            protein: tprotein,
            carbs: tcarbs,
            fat: tfat,
        });

        //----------------------------------------------------------------------


        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");


        var url = 'http://cs571.cs.wisc.edu:5000/activities'

        url = url.replace(/\"/g, "")

        
        

        var tlength
        var acts
        var cnt = 0


        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': t
            }
        }).then(res => res.json())
            .then(res => {

                var currDay = new Date().toISOString()



                var yr = currDay.slice(0, 4)
                var mn = currDay.slice(5, 7)
                var dy = currDay.slice(8, 10)



  





                

                this.setState({ acts: res.activities })

                for (let i = 0; i < res.activities.length; i++) {

                    let dparse = res.activities[i].date

                    

                    var cyr = dparse.slice(0, 4)
                    var cmn = dparse.slice(5, 7)
                    var cdy = dparse.slice(8, 10)


                    if (cyr === yr && cmn === mn && cdy === dy) {
                        cnt += res.activities[i].duration
                        
                    }
                }

                

                this.setState({ currAct: cnt })


            })

        if (tlength == null) {

            tlength = 0;

        }

        var actCnt = 0

        


        
        







    }

    async changeUser(t) {



        await this.setState({ username: t })


    }

    changePW(t) {


        this.setState({ password: t })

    }



    submitInfo(t) {




        fetch('http://cs571.cs.wisc.edu:5000/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + base64_encode(this.state.username + ":" + this.state.password)
            }
        }).then(res => res.json())
            .then(res => {
                if (res.token) {


                    this.props.navigation.navigate('InfoScreen', {
                        username: this.state.username,
                        password: this.state.password,
                        token: res.token,
                    });
                } else if (!res.ok) {
                    Alert.alert("Incorrect username or password! Please try again.")
                }
            })






    }



    showExercises() {


        


        var actArr = this.state.acts

        var currDay = new Date().toISOString()


        var yr = currDay.slice(0, 4)
        var mn = currDay.slice(5, 7)
        var dy = currDay.slice(8, 10)

        let e = []

        var total = 0;

        for (let i = 0; i < actArr.length; i++) {

            

            

            let dparse = actArr[i].date

            var cyr = dparse.slice(0, 4)
            var cmn = dparse.slice(5, 7)
            var cdy = dparse.slice(8, 10)

            if (cyr === yr && cmn === mn && cdy === dy) {

                total += actArr[i].duration

                e.push(
                    <Exercise
                        name={actArr[i].name.replace(/\"/g, "").replace(/\\/g, "")}
                        duration={actArr[i].duration}
                        date={actArr[i].date.replace('T', " ")}
                        cb={actArr[i].calories}
                        token={this.state.token}
                        id={actArr[i].id}
                        navigation={this.props.navigation}

                    />
                )

            }






        }



        return e

    }

    dailyActivity() {

        return <Text>Daily Activity: {this.state.currAct + "/" + this.state.activity}</Text>

    }

    componentDidUpdate() {




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

                    if (this.state.activity != tactivity) {

                        this.setState({
                            activity: tactivity,
                        });

                    }





                    

                } else {




                }
            })





        //----------------------------------------------------------------------

        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");


        var url = 'http://cs571.cs.wisc.edu:5000/activities'

        url = url.replace(/\"/g, "")

        
        

        var tlength
        var acts
        var cnt = 0


        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': t
            }
        }).then(res => res.json())
            .then(res => {




                var currDay = new Date().toISOString()


                var yr = currDay.slice(0, 4)
                var mn = currDay.slice(5, 7)
                var dy = currDay.slice(8, 10)



                this.setState({ acts: res.activities })

                for (let i = 0; i < res.activities.length; i++) {

                    let dparse = res.activities[i].date

                    var cyr = dparse.slice(0, 4)
                    var cmn = dparse.slice(5, 7)
                    var cdy = dparse.slice(8, 10)


                    if (cyr === yr && cmn === mn && cdy === dy) {
                        cnt += res.activities[i].duration
                        
                    }
                }

                

                if (cnt != this.state.currAct) {

                    this.setState({ currAct: cnt })

                }



            })

        if (tlength == null) {

            tlength = 0;

        }

        var actCnt = 0



        
        





    }





    render() {

        var text = ""
        var text1 = ""

        const Tab = createBottomTabNavigator();

        

        return (

            //set all content to be accessible with a label of "Today View" so that it is not distracting for the given tasks
            <View style={styles.container} accessible={false} accessibilityLabel="Today View" >

                <Text style={styles.title}  accessible={false}>Today Screen</Text>


                <Text style={styles.s}  accessible={false}>Goals</Text>
                {this.dailyActivity()}



                <Text style={styles.s} accessible={false}> Exercises </Text>

                {this.showExercises()}


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
        fontSize: 20

    }
});

export default TodayScreen;
