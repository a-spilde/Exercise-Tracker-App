import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, Modal, Pressable } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Goals from "./Goals";
import InfoScreen from "./InfoScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RealExercise from './RealExercise';
import EditExerciseScreen from './EditExerciseScreen';
import HomeScreen from "./HomeScreen";







class RealExerciseScreen extends Component {

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
            username: "",
            password: "",
            change: 0,
            modalVisible: false,
            emodalVisible: false,

            name: "",
            duration: "",
            date: new Date(),
            newDate: new Date(),
            dateChanged: false,
            timeChanged: false,
            time: '00:00:00',
            cb: "",
            id: "",
            show: true,
            mode: 'date',

            ename: "",
            eduration: "",
            edate: new Date(),
            enewDate: new Date(),
            edateChanged: false,
            etimeChanged: false,
            etime: '00:00:00',
            ecb: "",
            eid: "",
            eshow: true,
            emode: 'date',
            eFullDate: new Date()
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
        var p = this.props.password
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
            username: u,
            password: p
        });


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



                this.setState({ acts: res.activities })

                for (let i = 0; i < res.activities.length; i++) {

                    cnt += res.activities[i].duration


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

    forceUpdateHandler(t) {



        var t = this.state.token

        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");

        var cnt = 0


        var url = 'http://cs571.cs.wisc.edu:5000/activities'

        url = url.replace(/\"/g, "")




        this.setState({

            change: this.state.change++

        })

        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': t
            }
        }).then(res => res.json())
            .then(res => {


                this.setState({ acts: res.activities })



            }).then(() => {
                for (let i = 0; i < this.state.acts.length; i++) {

                    cnt += this.state.acts[i].duration


                }



                this.setState({ currAct: cnt })
            }).then(() => this.showExercises())

        this.setState({

            change: this.state.change++

        })


    };

    editExercise(info) {



        var editDate = info[2]



        var d = editDate.slice(0, editDate.indexOf(' ')).replace(/\"/g, "")
        var t = editDate.slice(editDate.indexOf(' ') + 1).replace(/\"/g, "")





        var year = d.slice(0, 4)
        var month = d.slice(5, 7)
        var day = d.slice(8, 10)

        var hour = t.slice(0, 2)
        var min = t.slice(3, 5)

        var finalD = month + "-" + day + "-" + year
        var finalT = hour + ":" + min




        this.setState({
            ename: info[0],
            eduration: info[1],
            eFullDate: info[2],
            edate: finalD,
            etime: finalT,
            ecb: info[3],
            etoken: info[4],
            eid: info[5],
            eusername: this.state.username,
            epassword: this.state.password,
        })

        this.seteModalVisible(true)


    }

    showExercises() {





        var actArr = this.state.acts

        let e = []

        for (let i = 0; i < actArr.length; i++) {



            e.push(
                <RealExercise
                    name={actArr[i].name.replace(/\"/g, "").replace(/\\/g, "")}
                    duration={actArr[i].duration}
                    date={actArr[i].date.replace('T', " ")}
                    cb={actArr[i].calories}
                    token={this.state.token}
                    id={actArr[i].id}
                    navigation={this.props.navigation}
                    callback={(info) => this.editExercise(info)}
                    delete={(t) => this.forceUpdateHandler(t)}
                />
            )


        }

        return e

    }

    //------------------------------------------ EXERCISE SCREEN VVV -----------------------------------------

    dailyActivity() {

        return <Text>Daily Activity: {this.state.currAct + "/" + this.state.activity}</Text>

    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });

        if (!visible) {

            var t = this.state.token

            t = t.replace(/\"/g, "")
            t = t.replace(/\\/g, "");

            var cnt = 0


            var url = 'http://cs571.cs.wisc.edu:5000/activities'

            url = url.replace(/\"/g, "")




            this.setState({

                change: this.state.change++

            })

            fetch(url, {
                method: 'GET',
                headers: {
                    'x-access-token': t
                }
            }).then(res => res.json())
                .then(res => {



                    this.setState({ acts: res.activities })

                    for (let i = 0; i < res.activities.length; i++) {

                        cnt += res.activities[i].duration


                    }



                    this.setState({ currAct: cnt })


                }).then(() => this.showExercises()).then(() => this.showExercises())

        }

    }

    changeName(t) {


        this.setState({ name: t })

    }

    changeDuration(t) {


        this.setState({ duration: t })

    }

    changeDate(t) {

        this.setState({ newDate: t, dateChanged: true })

    }

    changeTime(t) {


        this.setState({ time: t, timeChanged: true })

    }

    changeCB(t) {


        this.setState({ cb: t })

    }

    addSubmitInfo() {


        var u = this.state.username


        var url = 'http://cs571.cs.wisc.edu:5000/activities'



        var today = new Date()



        var hour = 0
        var min = 0
        var sec = 0

        if (this.state.timeChanged) {





            hour = parseInt(this.state.time.slice(0, 2))
            min = parseInt(this.state.time.slice(3, 5))



            today.setUTCHours(hour, min)

        }

        if (this.state.dateChanged) {



            var monthArr = ['NA', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var d = this.state.newDate
            var month = parseInt(d.slice(0, 2) - 1)
            var day = d.slice(3, 5)
            var year = d.slice(6, 10)





            var changedDate = Date.parse(day + " " + monthArr[month] + " " + year + " " + this.state.time + " GMT");

            changedDate = new Date(parseInt(year), month, parseInt(day), hour, min, sec)

            today.setUTCFullYear(parseInt(year), month, parseInt(day))



        }





        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            },
            body: JSON.stringify({

                id: this.state.id,
                name: this.state.name,
                duration: this.state.duration,
                date: today,
                calories: this.state.cb

            })
        }).then(res => {
            if (!res.ok) {
                res.text().then(text => Alert.alert(JSON.parse(text).message))

            }
            else {

                Alert.alert("Your profile has been updated!")

            }

        })



        this.setState({

            name: "",
            duration: "",
            date: new Date(),
            newDate: new Date(),
            dateChanged: false,
            timeChanged: false,
            time: '00:00:00',
            cb: "",
            id: "",
            show: true,
            mode: 'date',

        })

        var t = this.state.token

        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");

        var cnt = 0


        url = 'http://cs571.cs.wisc.edu:5000/activities'

        url = url.replace(/\"/g, "")




        this.setState({

            change: this.state.change++

        })

        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': t
            }
        }).then(res => res.json())
            .then(res => {



                this.setState({ acts: res.activities })

                for (let i = 0; i < res.activities.length; i++) {

                    cnt += res.activities[i].duration


                }



                this.setState({ currAct: cnt })


            }).then(() => this.showExercises())

        this.setModalVisible(false)

    }

    //------------------------------------------ EXERCISE SCREEN ^^^ -----------------------------------------

    //------------------------------------------ EDIT EXERCISE SCREEN vvv -----------------------------------------

    seteModalVisible = (visible) => {
        this.setState({ emodalVisible: visible });

        if (!visible) {

            var t = this.state.token

            t = t.replace(/\"/g, "")
            t = t.replace(/\\/g, "");

            var cnt = 0


            var url = 'http://cs571.cs.wisc.edu:5000/activities'

            url = url.replace(/\"/g, "")




            this.setState({

                change: this.state.change++

            })

            fetch(url, {
                method: 'GET',
                headers: {
                    'x-access-token': t
                }
            }).then(res => res.json())
                .then(res => {



                    this.setState({ acts: res.activities })

                    for (let i = 0; i < res.activities.length; i++) {

                        cnt += res.activities[i].duration


                    }



                    this.setState({ currAct: cnt })



                }).then(() => this.showExercises())

        }
    }

    echangeName(t) {


        this.setState({ ename: t })

    }

    echangeDuration(t) {


        this.setState({ eduration: t })

    }

    echangeDate(t) {

        this.setState({ enewDate: t, edateChanged: true })

    }

    echangeTime(t) {


        this.setState({ etime: t, etimeChanged: true })

    }

    echangeCB(t) {


        this.setState({ ecb: t })

    }

    esubmitInfo() {

        var today = new Date()





        var eyr = this.state.eFullDate.slice(0, 4)
        var em = this.state.eFullDate.slice(5, 7)
        var ed = this.state.eFullDate.slice(8, 10)

        var ehr = this.state.eFullDate.slice(11, 13)
        var emn = this.state.eFullDate.slice(14, 16)
        var esc = this.state.eFullDate.slice(17, 19)



        today.setUTCHours(parseInt(ehr), parseInt(emn), parseInt(esc))
        today.setUTCFullYear(parseInt(eyr), parseInt(em), parseInt(ed))

        var hour = 0
        var min = 0
        var sec = 0

        if (this.state.etimeChanged) {




            hour = parseInt(this.state.etime.slice(0, 2))
            min = parseInt(this.state.etime.slice(3, 5))



            today.setUTCHours(hour, min)

        }

        if (this.state.edateChanged) {



            var monthArr = ['NA', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var d = this.state.enewDate
            var month = parseInt(d.slice(0, 2) - 1)
            var day = d.slice(3, 5)
            var year = d.slice(6, 10)




            var changedDate = Date.parse(day + " " + monthArr[month] + " " + year + " " + this.state.etime + " GMT");

            changedDate = new Date(parseInt(year), month, parseInt(day), hour, min, sec)

            today.setUTCFullYear(parseInt(year), month, parseInt(day))



        }







        var t = this.state.etoken
        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "")

        var d = this.state.edate
        d = d.replace(/\"/g, "")
        d = d.replace(/\\/g, "")

        var url = 'http://cs571.cs.wisc.edu:5000/activities/' + this.state.eid

        url = url.replace(/\"/g, "")



        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': t
            },
            body: JSON.stringify({

                name: this.state.ename,
                duration: this.state.eduration,
                date: today,
                cb: this.state.ecb,

            })
        }).then(res => {
            if (!res.ok) {
                res.text().then(text => Alert.alert(JSON.parse(text).message))

            }
            else {

                Alert.alert("Your profile has been updated!")

            }

        })

        this.setState({



        })



        var t = this.state.token

        t = t.replace(/\"/g, "")
        t = t.replace(/\\/g, "");

        var cnt = 0


        url = 'http://cs571.cs.wisc.edu:5000/activities'

        url = url.replace(/\"/g, "")




        this.setState({

            change: this.state.change++

        })

        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': t
            }
        }).then(res => res.json())
            .then(res => {



                this.setState({ acts: res.activities })

                for (let i = 0; i < res.activities.length; i++) {

                    cnt += res.activities[i].duration


                }



                this.setState({ currAct: cnt })


            }).then(() => this.showExercises())

        this.seteModalVisible(false)

    }

    //------------------------------------------ EDIT EXERCISE SCREEN ^^^ -----------------------------------------


    render() {

        var text2 = ""
        var text3 = ""
        var text4 = ""
        var text5 = ""
        var text6 = ""
        var text7 = ""
        var text8 = ""
        var text9 = ""

        var text = ""
        var text1 = ""

        const Tab = createBottomTabNavigator();

        const { modalVisible } = this.state;
        const { emodalVisible } = this.state;

        return (

            <View style={styles.container}>

                {/* ADD EXERCISE MODAL VVV */}

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <Text style={styles.title}
                                    accessible={true}
                                    accessibilityLabel="Add Exercise">Add Exercise</Text>
                                <Text style={styles.ss} accessible={false}>Name</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="Jogging"
                                    onChangeText={text2 => this.changeName(text2)}
                                    defaultValue={String(this.state.name)}
                                    accessible={true} accessibilityLabel="Name input" accessibilityHint="enter the Name of your exercise"
                                />
                                <Text style={styles.ss} accessible={false}>Duration</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="60"
                                    onChangeText={text3 => this.changeDuration(text3)}
                                    defaultValue={String(this.state.duration)}
                                    accessible={true} accessibilityLabel="Duration input" accessibilityHint="enter the Duration of your exercise"
                                />

                                <Text style={styles.ss} accessible={false}>Set Date</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="MM-DD-YYYY (optional)"
                                    onChangeText={text8 => this.changeDate(text8)}
                                    accessible={true} accessibilityLabel="Date input, optional" accessibilityHint="enter the Date of your exercise"
                                />

                                <Text style={styles.ss} accessible={false}>Set Time</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="00:00 (optional)"
                                    onChangeText={text9 => this.changeTime(text9)}
                                    accessible={true} accessibilityLabel="Time input, optional" accessibilityHint="enter the Time of your exercise"
                                />
                                <Text style={styles.ss} accessible={false}>Calories Burned</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="70"
                                    onChangeText={text5 => this.changeCB(text5)}
                                    defaultValue={String(this.state.cb)}
                                    accessible={true} accessibilityLabel="Calories Burned input" accessibilityHint="enter the Calories burned of your exercise"
                                />

                                <Button
                                    title="ADD EXERCISE"
                                    onPress={() => this.addSubmitInfo()}
                                    color="green"
                                    accessible={true}
                                    accessibilityLabel="Add exercise"
                                    accessibilityHint="click to add exercise with given information and return to Exercise view"
                                />

                            </View>
                        </View>
                    </Modal>

                </View>

                {/* ADD EXERCISE MODAL ^^^ */}

                {/* EDIT EXERCISE MODAL vvv */}

                <View style={styles.centeredView}  accessible={false}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={emodalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.seteModalVisible(!emodalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <Text style={styles.title}>Edit Exercise</Text>
                                <Text style={styles.ss}>Name</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="Jogging"
                                    onChangeText={text2 => this.echangeName(text2)}
                                    defaultValue={String(this.state.ename)}
                                />
                                <Text style={styles.ss}>Duration</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="60"
                                    onChangeText={text3 => this.echangeDuration(text3)}
                                    defaultValue={String(this.state.eduration)}
                                />

                                <Text style={styles.ss}>Date</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="MM-DD-YYYY (optional)"
                                    onChangeText={text8 => this.echangeDate(text8)}
                                    defaultValue={String(this.state.edate)}
                                />

                                <Text style={styles.ss}>Time</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="00:00 (optional)"
                                    onChangeText={text9 => this.echangeTime(text9)}
                                    defaultValue={String(this.state.etime)}
                                />
                                <Text style={styles.ss}>Calories Burned</Text>
                                <TextInput
                                    style={{ height: 40 }}
                                    placeholder="70"
                                    onChangeText={text5 => this.echangeCB(text5)}
                                    defaultValue={String(this.state.ecb)}
                                />

                                <Button
                                    title="SAVE"
                                    onPress={() => this.esubmitInfo()}
                                    color="green"
                                />

                            </View>
                        </View>
                    </Modal>

                </View>

                {/* EDIT EXERCISE MODAL ^^^ */}
                <View style={styles.container1}
                    accessible={true}
                    accessibilityLabel="Exercise View"
                    accessibilityHint="View, add, remove, and edit exercises"
                >
                    <Text style={styles.title}>Exercise </Text>

                    <Text style={styles.s}> Exercises </Text>
                </View>
                {this.showExercises()}
                <Button
                    title="ADD EXERCISE"
                    onPress={() => this.setModalVisible(true)}
                    color='green'
                    accessible={true}
                    accessibilityLabel="Add exercise"
                    accessibilityHint="Click to add an exercise"
                />

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
    container1: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',

    },
    s: {

        marginTop: 10,
        marginBottom: 10,
        fontSize: 20

    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default RealExerciseScreen;
