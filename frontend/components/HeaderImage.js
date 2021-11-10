import * as React from 'react';
import { Button, View, Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function HeaderImage() {
  return (
    <View>
        <Image style={{ width: 60, height: 50,zIndex : -1, top: -10, right : -9 }} source={require("../assets/banner.png")} />
    </View>
  );
}


