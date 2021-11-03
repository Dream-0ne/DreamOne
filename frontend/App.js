import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,Picker } from 'react-native';
import Constants from "expo-constants";


export default function App() {
  const { manifest } = Constants;
  const [selectedValue, setSelectedValue] = useState("java");
  async function getOccasions() {
    const url = `http://${manifest.debuggerHost.split(':').shift()}:5000/occasions`;
    console.log(url);
    await fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
  }
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue)
        getOccasions()}}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
