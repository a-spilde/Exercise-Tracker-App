import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';







class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  };

  componentDidMount() {
    this.loadInitialState();
  }

  async loadInitialState() {

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



          this.props.navigation.navigate('Root', {


            data: false,
            username: this.state.username,
            password: this.state.password,
            token: res.token,


          });


        } else if (!res.ok) {
          Alert.alert("Incorrect username or password! Please try again.")
        }
      })






  }



  render() {

    var text = ""
    var text1 = ""

    return (
      <View style={styles.container}>
        <View style={styles.container1}
          accessible={true}
          accessibilityLabel="Log In"
          accessibilityHint="enter login information below">
          <Text style={styles.title}>Login</Text>
          <Text style={{ marginBottom: 7 }}>Welcome! Please login or signup to continue.</Text>
        </View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Username"
          onChangeText={text => this.changeUser(text)}
          defaultValue={text}
          accessible={true}
          accessibilityLabel="Username Input"
          accessibilityHint="Input username for existing account"
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={text1 => this.changePW(text1)}
          defaultValue={text1}
          accessible={true}
          accessibilityLabel="Password Input"
          accessibilityHint="Input password for existing account"
        />

        <View style={styles.fixToText}>
          <View style={{ marginRight: 5 }}>
            <Button
              title="LOGIN"
              onPress={text1 => this.submitInfo(text1)}
              accessible={true}
              accessibilityLabel="Log In"
              accessibilityHint="Click to log in with given account information"
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            <Button
              title="SIGNUP"
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
              accessible={true}
              accessibilityLabel="Sign Up"
              accessibilityHint="Click to put in information to create an account"
            />
          </View>
          {/* <TouchableOpacity
            accessible={true}
            accessibilityLabel="Tap me!"
            onPress={onPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Press me!</Text>
            </View>
          </TouchableOpacity> */}
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
  container1: {
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


  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
