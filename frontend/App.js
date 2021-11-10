import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  OccasionPage from "./components/OccasionPage";
import LogoPage from "./components/LogoPage";
import FilterPage from "./components/FilterPage";
//import image from "./assets/banner.png";
import HeaderImage from './components/HeaderImage';
import { Header } from 'react-native/Libraries/NewAppScreen';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Logo">
      <Stack.Screen name="Logo" component={LogoPage} options = {{headerShown : false}}/>
      <Stack.Screen name="Occasions" component={OccasionPage} options = {{ headerBackVisible : false,
     headerStyle: {
      backgroundColor: '#C99789',
     },
      headerTitle: props => <HeaderImage {...props} />
      
      }}/>
      <Stack.Screen name="Filter" component={FilterPage} options = {{ 
     headerStyle: {
      backgroundColor: '#C99789',
     },
     headerTintColor: 'white',
      headerTitle: props => <HeaderImage {...props} />
      
      }}/>

      
    </Stack.Navigator> 
  );
}


export default function App () {
 

  return ( 
    <NavigationContainer>
    <MyStack />
  </NavigationContainer>);
};