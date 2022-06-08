import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import HomeScreen from "./HomeScreen";








class ExerciseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      duration: "",
      date: new Date(),
      newDate: new Date(),
      dateChanged: false,
      timeChanged: false,
      time: '00:00:00',
      cb: "",
      username: "",
      password: "",
      token: "",
      id: "",
      show: true,
      mode: 'date',
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

    const { username, password, token } = this.props.route.params



    var u = JSON.stringify(username)
    var t = JSON.stringify(token)
    t = t.replace(/\"/g, "")
    t = t.replace(/\\/g, "");


    var url = 'http://cs571.cs.wisc.edu:5000/activities'

    url = url.replace(/\"/g, "")

    
    

    var tlength

    fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': t
      }
    }).then(res => res.json())
      .then(res => {

        
        tlength = res.activities.tlength

      })

    if (tlength == null) {

      tlength = 0;

    }

    this.setState({
      username: JSON.stringify(username),
      password: JSON.stringify(password),
      token: t,
      id: tlength + 1
    });

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



  submitInfo() {


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

    this.props.navigation.navigate('RealExerciseScreen', {

      username: this.state.username,
      password: this.state.password,
      token: this.state.token


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
      <View style={styles.container}>

        <Text style={styles.title}>Add Exercise</Text>
        <Text style={styles.ss}>Name</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Jogging"
          onChangeText={text2 => this.changeName(text2)}
          defaultValue={String(this.state.name)}
        />
        <Text style={styles.ss}>Duration</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="60"
          onChangeText={text3 => this.changeDuration(text3)}
          defaultValue={String(this.state.duration)}
        />

        <Text style={styles.ss}>Set Date</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="MM-DD-YYYY (optional)"
          onChangeText={text8 => this.changeDate(text8)}

        />

        <Text style={styles.ss}>Set Time</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="00:00 (optional)"
          onChangeText={text9 => this.changeTime(text9)}
        />
        <Text style={styles.ss}>Calories Burned</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="70"
          onChangeText={text5 => this.changeCB(text5)}
          defaultValue={String(this.state.cb)}
        />

        <Button
          title="ADD EXERCISE"
          onPress={() => this.submitInfo()}
          color="green"
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
  title: {

    fontSize: 30,
    fontWeight: 'bold',

  },
  s: {

    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'

  },

  ss: {

    fontSize: 15,
    fontWeight: '600'


  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExerciseScreen;
