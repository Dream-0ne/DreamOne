import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,Picker } from 'react-native';
import Constants from "expo-constants";


export default function App () {
  const [occasions, updateOccasions] = React.useState([]);
// Component did mount function that does api call
  useEffect(function effectFunction() {
      async function fetchOccasions() {
          const response = await fetch('https://ancient-island-59052.herokuapp.com/occasions');
          const json = await response.json();
          updateOccasions(json);
      }
      fetchOccasions();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }
  });
  
  //list component just to list occasions for now 
  const list = () => {
    return occasions.map((element) => {
      return (
        <View key={element} style={{margin: 10}}>
          <Text>{element}</Text>
        </View>
      );
    });
  };
// main render return
  return (<View style={styles.container}>
    <Text style={{fontSize:25,padding:15}}>OCCASIONS FROM API BELOW</Text>
    {list()}
    </View>);
};