
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import GetLocation from 'react-native-get-location'
import * as Location from "expo-location";


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


export default function OccasionPage({ navigation }) {
  const [selectedOccasion, setSelectedOccasion] = useState();
  const [showPicker, setPicker] = useState(false);


  const [occasions, updateOccasions] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // Component did mount function that does api call
  useEffect(function effectFunction() {

       (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();



    async function fetchOccasions() {
      const response = await fetch('https://ancient-island-59052.herokuapp.com/occasions');
      const json = await response.json();
      updateOccasions(json);
    }
    fetchOccasions();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);


  //list component just to list occasions for now 
  const list = () => {
    return occasions.map((element) => {
      return (
        <Picker.Item label={element} key= {element} value={element} />

      );
    });
  };
  function switchPage() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      console.log(location);
      // setLatitude(location.coords.latitude);
      // setLongitude(location.coords.longitude);
      

  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
    navigation.navigate('Filter', 
      { selectedOccasion: selectedOccasion, lat : latitude, long: longitude });

  }
  function showPickerHelper() {
    
    setPicker(true);
  }
  if (showPicker === true) {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <HeaderComponent text="Occasions" />

          <Text style={{ fontSize: 18, paddingTop: 30, color: "grey" }}>Please choose an occasion to start your plan</Text>



          <Picker
            selectedValue={selectedOccasion}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOccasion(itemValue)}
            style={{
              marginVertical: 10,
              width: 200,
              top: -10,
            }}>
            {list()}

          </Picker>
          <Button title="Select Occasion" containerStyle={styles.button}
            buttonStyle={{ backgroundColor: "#C0988D", borderRadius: 100, top: -40 }} onPress={() => { switchPage() }} />
          {/* onPress */}

        </View>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <HeaderComponent text="Occasions" />

          <Text style={{ fontSize: 18, paddingTop: 30, color: "grey" }}>Please choose an occasion to start your plan</Text>

          <Button title="Choose Your Occasion" containerStyle={styles.button}
            buttonStyle={{ backgroundColor: "#C0988D", borderRadius: 100, }} onPress={() => { showPickerHelper() }} />


        </View>
      </NativeBaseProvider>

    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  picker: {
    marginVertical: 10,
    width: 200,
    top: -100,


  },
  button: {
    paddingTop: 50,

  }
});
