import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import OccasionPage from './OccasionPage';

export default function filterPage({route, navigation}){
    const {selectedOccasion} = route.params;
    console.log(selectedOccasion);
    const [occasion,useOccasion] = useState(selectedOccasion);
    return(
        <View style = {styles.container}> 
            <HeaderComponent text = {occasion}/>
            <Text style = {styles.text}>
                You have chosen {occasion}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      overflow : "hidden"
    },
    picker: {
      marginVertical: 10,
      width: 200,
      top: -100,
      
      
    },
    button : {
      paddingTop : 50,
      color : "#C0988D"
    },
    text : {
       fontSize:18,
       paddingTop : 30,
       color : "grey"
    }
  });