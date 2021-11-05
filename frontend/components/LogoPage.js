import React from "react";
import { ImageBackground, StyleSheet, Button, View } from "react-native";
import image from "../assets/frontPageLogo.png";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function LogoPage ({navigation}) {
    return (
        <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          </ImageBackground>
          <Button title  = "presss meeee!!??!" onPress = {() => {navigation.navigate('Occasions')}}/>
          
        </View>
      );
    
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});

