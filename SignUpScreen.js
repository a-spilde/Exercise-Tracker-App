import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';







class SignUpScreen extends Component {

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


    this.setState({


    });
  }

  async changeUser(t) {



    await this.setState({ username: t })


  }

  changePW(t) {


    this.setState({ password: t })

  }

  createUser(t) {



    fetch('http://cs571.cs.wisc.edu:5000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    }).then(res => {
      if (!res.ok) {
        res.text().then(text => Alert.alert(JSON.parse(text).message))
      }
      else {

        Alert.alert("User created!")
        this.props.navigation.navigate('HomeScreen')

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
          accessibilityLabel="Sign Up"
          accessibilityHint="Input sign up information below">
          <Text style={styles.title}>Sign Up</Text>
          <Text style={{
            fontSize: 12, alignItems: 'center',
            justifyContent: 'center',
          }}>New here? Let's get started!</Text>
          <Text style={{
            fontSize: 12, alignItems: 'center',
            justifyContent: 'center',
          }}>Please create an account below</Text>
        </View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Username"
          onChangeText={text => this.changeUser(text)}
          defaultValue={text}
          accessible={true}
          accessibilityLabel="Username Input"
          accessibilityHint="Input username for new account"
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={text1 => this.changePW(text1)}
          defaultValue={text1}
          accessible={true}
          accessibilityLabel="Password Input"
          accessibilityHint="Input password for new account"
        />



        <View style={styles.fixToText}>
          <View style={{ marginRight: 5 }}>
            <Button
              title="CREATE ACCOUNT"
              onPress={text1 => this.createUser(text1)}
              color='green'
              accessible={true}
              accessibilityLabel="Create Account"
              accessibilityHint="Click to create account and return to log in screen"
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            <Button
              title="Back"
              onPress={() => this.props.navigation.navigate('HomeScreen')}
              accessible={true}
              accessibilityLabel="Back"
              accessibilityHint="Return to log in screen without creating account"
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

export default SignUpScreen;
