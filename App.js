import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Component } from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import SignUpScreen from "./SignUpScreen";
import InfoScreen from "./InfoScreen";
import TodayScreen from "./TodayScreen";
import Account from "./Account";
import { enableScreens } from 'react-native-screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExerciseScreen from './ExerciseScreen';
import Exercise from './Exercise';
import EditExerciseScreen from './EditExerciseScreen';
import RealExerciseScreen from './RealExerciseScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
enableScreens()




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      update: 0
    };

    this.getInfo = this.getInfo.bind(this)
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

  submitInfo() {






  }

  getInfo(u, p) {

    this.setState({ username: u, password: p })

  }





  render() {

    var text = ""
    var text1 = ""




    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="InfoScreen" component={InfoScreen} options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Sign Out"
                color="blue"
              />
            ),
          }} />
          <Stack.Screen name="TodayScreen" component={TodayScreen} options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Sign Out"
                color="blue"
              />
            ),
          }} />
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Sign Out"
                color="blue"
              />
            ),
          }} />
          <Stack.Screen name="RealExerciseScreen" component={RealExerciseScreen} />
          <Stack.Screen name="Exercise" component={Exercise} />
          <Stack.Screen name="EditExerciseScreen" component={EditExerciseScreen} options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Sign Out"
                color="blue"
              />
            ),
          }} />
          {/* <Stack.Screen name="Account" component={Account} /> */}

        </Stack.Navigator>

      </NavigationContainer>




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

export default App;

















function Root({ route }) {

  const [count, setCount] = useState(0);

  const { username, password, token } = route.params

  var u = JSON.stringify(username)
  var p = JSON.stringify(password)
  var t = JSON.stringify(token)



  return (





    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'TodayScreen') {
          iconName = 'star'
        } else if (route.name === 'InfoScreen') {
          iconName = 'male'
        } else if (route.name === 'RealExerciseScreen') {
          iconName = 'walking'
        }


        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      {/* <Tab.Screen name="TodayScreen" component={TodayScreen} initialParams={{ username: u, password: p, token: t }} options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }} />
      <Tab.Screen name="InfoScreen" component={InfoScreen} initialParams={{ username: u, password: p, token: t }} options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }} />
      <Tab.Screen name="RealExerciseScreen" component={RealExerciseScreen} initialParams={{ username: u, password: p, token: t }} options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }} /> */}
      {/* <Tab.Screen name="EditExerciseScreen" component={EditExerciseScreen} initialParams={{ username: u, password: p, token: t }} options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }} /> */}


      <Tab.Screen name="TodayScreen" options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }}
>
        {(props) => <TodayScreen {...props} username={u} password={p} token={t} change={count} />}
      </Tab.Screen>
      <Tab.Screen name="InfoScreen" options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }}
>
        {(props) => <InfoScreen {...props} username={u} password={p} token={t} cb={() => setCount(count + 1)} />}
      </Tab.Screen>
      <Tab.Screen name="RealExerciseScreen" options={{
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Sign Out"
            color="blue"
          />
        ),
      }}>
        {(props) => <RealExerciseScreen {...props} username={u} password={p} token={t} cb={() => setCount(count + 1)} />}
      </Tab.Screen>


    </Tab.Navigator>
  );
}




