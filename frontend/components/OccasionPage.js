
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import GetLocation from 'react-native-get-location'
import * as Location from "expo-location";
import { LogBox } from 'react-native';



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
  extendTheme,
} from "native-base"


export default function OccasionPage({ navigation }) {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#FCE9DB',
        55: '#C99789',
        60: "#fed7aa",
        65: "FFE9DC"
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#FCE9DB',
      },

    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
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
      <NativeBaseProvider theme = {theme}>
          <HeaderComponent text="Occasions" />
          <View style = {{alignItems :"center", alignContent : "center", top : 50}}>
          <Box
            shadow="2"
            rounded="lg"
            w={{ base: "20", md: "100", lg: "md" }}
            bg="primary.55"
            style={{ padding: 10, width: 360 }}
          >
          
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom : 10, color: "white" , textAlign : "center"}}>Please choose an occasion</Text>
          <View style= {{alignItems : "center", alignContent : "center", paddingBottom : 20}}>
          <Box  shadow="2" rounded="lg"style = {{ backgroundColor : "white", width : 250,}}>
          <Picker
            selectedValue={selectedOccasion}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOccasion(itemValue)}
            style={{
              marginVertical: 20,
              width: 250,
              top: -10,
            }}>
            {list()}

          </Picker>
          </Box>
          </View>
          </Box>
         
          <Button title="Select Occasion" containerStyle={styles.button}
            buttonStyle={{ backgroundColor: "#C0988D", borderRadius: 100, top: -20 }} onPress={() => { switchPage() }} />
          {/* onPress */}

        </View>
       
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <HeaderComponent text="Occasions" />

          <Text style={{ fontSize: 20, paddingTop: 30, color: "grey" }}>Choose an occasion to start your plan</Text>

          <Button title="Choose Your Occasion" containerStyle={styles.button}
            buttonStyle={{ backgroundColor: "#C0988D", borderRadius: 100, }} onPress={() => { showPickerHelper() }} />


        </View>
      </NativeBaseProvider>

    );
  }

};

const styles = StyleSheet.create({
  
  picker: {
    marginVertical: 10,
    width: 200,
    top: -100,


  },
  button: {
    paddingTop: 50,

  }
});
