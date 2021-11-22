import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  OccasionPage from "./components/OccasionPage";
import LogoPage from "./components/LogoPage"

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Logo">
      <Stack.Screen name="Logo" component={LogoPage} options={{headerShown: false}} />
      <Stack.Screen name="Occasions" component={OccasionPage} options={{headerShown:false}} />
      
    </Stack.Navigator> 
  );
}


export default function App () {
 

  return ( 
    <NavigationContainer>
    <MyStack />
  </NavigationContainer>);
};