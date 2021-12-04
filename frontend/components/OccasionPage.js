
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
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
  // Component did mount function that does api call
  useEffect(function effectFunction() {
    async function fetchOccasions() {
      const response = await fetch('https://ancient-island-59052.herokuapp.com/occasions');
      const json = await response.json();
      updateOccasions(json);
    }
    fetchOccasions();
  }, []);


  //list component just to list occasions for now 
  const list = () => {
    return occasions.map((element) => {
      return (
        <Picker.Item label={element} value={element} />

      );
    });
  };
  function switchPage() {

    navigation.navigate('Filter', { selectedOccasion: selectedOccasion });

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
