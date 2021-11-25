
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import {
  Pressable,
  Box,
  HStack,
  Spacer,
  Flex,
  Center,
  NativeBaseProvider,
  Modal,
  FormControl,
  Input,
  Checkbox,
} from "native-base"


export default function DragNDrop ({route,navigation}) {
    const {selectedOptions} = route.params; //{selectedOptions : selecttedOptions}
    console.log(selectedOptions);
    return (
      <NativeBaseProvider> 
      <View style={styles.container}>
       <HeaderComponent text = "Drag and Drop"/>
       
       
    
       
        </View>
        </NativeBaseProvider>
        
        );
  
 
};

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
    
  }
});

