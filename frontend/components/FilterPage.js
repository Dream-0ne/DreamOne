import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { Chip } from "react-native-elements";
import {
  Pressable,
  Box,
  HStack,
  Spacer,
  Flex,
  Center,
  NativeBaseProvider,
  Modal,
  Button,
  FormControl,
  Input,
  Checkbox,
  extendTheme,
} from "native-base";
import { Entypo } from '@expo/vector-icons';


//import FilterButton from './FilterButton';



export default function filterPage({ route, navigation }) {
  const { selectedOccasion } = route.params;
  const [occasion, useOccasion] = useState(selectedOccasion);
  const [filters, setFilters] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [selecttedOptions, setSelectedOption] = useState([]);
  const [chips, setChips] = useState([]);
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
  function saveHelper() {
    let temp = chips;
    selecttedOptions.forEach((item) => {
      if (chips.indexOf(item) < 0)
        temp.push(item);
    })
    setChips(temp);
    setModalVisible(false);

  }
  useEffect(
    function effectFunction() {
      //console.log(JSON);
      async function fetchFilters() {
        const response = await fetch('https://ancient-island-59052.herokuapp.com/filters/' + occasion);
        const json = await response.json();
        //console.log("json" + JSON.stringify(json));
        //{"Food":["Chinese","Japenese","Mexican"],"shopping":["Local Small Market","Clothing Thrift Store"]
        //,"sightseeing":["Events","Local Festivals"]}
        setFilters(json);
        let selectedFilterState = {};
        for (const [filter, options] of Object.entries(json)) {
          selectedFilterState[filter] = [];
        }
        setSelectedFilter(selectedFilterState);
        //console.log("test:"  + JSON.stringify(selectedFilterState));
      }
      fetchFilters();

    }, [console.log(selecttedOptions)]);

  function getFilterFromItem(item) {
    return item.id.split(".")[0] // item.id.split(".")[0]
  };


  function list() {
    let temp = [];
    let x = -40;
    for (const [filter, options] of Object.entries(filters)) {
      let data = [];
      //console.log(JSON.stringify(selectedFilter[filter])); 
      options.map((item, index) => {
        data.push({ id: `${filter}.${index}`, name: item }); //id : Food.0 , name : Chinese
      })
      temp.push(
        <View style={{ alignItems: "center", justifyContent: "center", paddingBottom: 10 }}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              setOptions(data);

            }}
          >
            <Box p="5" rounded="8" bg="primary.50" width="300" >
              <Text style={{ textAlign: "center", color: "grey", fontSize: 20, }}>
                {filter}
              </Text>

            </Box>
          </Pressable>





        </View>
      );
    }
    return temp;

  };

  function switchPage(){
    navigation.navigate('Drag and Drop', {selectedOptions : selecttedOptions});
  }

  function showOptions() {
    let checkBox = []
    
    //console.log("options are: " + JSON.stringify(options));
    options.forEach((item) => {
      if (chips.indexOf(item.name) > -1){
        // checkBox.push(    
        //   <Checkbox value={item.name} defaultIsChecked colorScheme="amber">
        //     {item.name}
        //   </Checkbox>
        // );
      }else{
        checkBox.push(    
          <Checkbox value={item.name} colorScheme = "orange">
            {item.name}
          </Checkbox>
        );
      }
      
      
    })
    return checkBox;
  }

  function storeOption(value) {
    let temp = selecttedOptions;
    //console.log("value is "  +value);
    value.forEach((item) => {
      if (temp.indexOf(item) < 0) {
        temp.push(item);
      }

    })
    setSelectedOption(temp);
  }
  function removeChip(item){
    //console.log(item);
    let temp = chips;
    const returnList = temp.filter(chip => chip !== item);
    setChips(returnList);
    setSelectedOption(returnList);
  }
  function showChips() {
    let temp = [];
    chips.forEach((item) => {
      let itemName = item;
      temp.push(
        <View style={{ padding: 5 , alignItems : "center"}}>
          <Pressable onPress = {()=>{removeChip(itemName)}}>
            
            <Box p="3" rounded="100" width="170" bg="primary.50"  shadow={7}
            > 
              <View style = {styles.chipBoxContainer}>
              <Text style = {{top : 4, color : "black" , paddingRight : 15}}> 
                {/* style={{ textAlign: "center" }} */}
                {item}
              </Text>
              <Entypo name="circle-with-cross" size={24} color="primary.65" />
              </View>
            </Box>
          </Pressable>
        </View>
      )

    })
    return temp;
  }
  // }
  //console.log(filterButtons.length);
  //console.log("AndrewTesting: " + JSON.stringify(selectedFilter));
  return (
    <NativeBaseProvider theme={theme}>

      <HeaderComponent text={occasion} />

      <ScrollView >
        <View style={styles.instruction}>
          <Text style={{ color: "grey", fontSize: 20, top: -30, right: -30 }}>
            please specify your perferences from below
          </Text>

        </View>

        <View style={{ top: 30 }}>
          {list()}
        </View>
        <View style={styles.chipBox}>

          <Box p="5" rounded="8"  bg="primary.55" width="300" >
            <Text style={{ color: "#FCE9DB" , fontSize : 20, textAlign: "center"}}>
              Your chosen perferences:
            </Text>
            
            {showChips()}
            


          </Box>
        </View>
        <View>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Choose your perferences</Modal.Header>
              <Modal.Body>
                <Checkbox.Group onChange={(value) => { storeOption(value) }}>
                  {showOptions()}
                </Checkbox.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    color="primary.50"
                    onPress={() => {
                      setModalVisible(false)
                    }}
                  >
                    <Text style= {{color: "primary.55"}}>
                    Cancel
                    </Text>
                   
                  </Button>
                  <Button
                    onPress={() => {
                      saveHelper()
                    }}
                    bg="primary.50"
                  >
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>

        
      <Button onPress = {()=> switchPage()}
      bg = "primary.50">
      
        <View style= {{display : "flex",  flexDirection : "row" , justifyContent : "space-between"}}>
        <Text style = {{top : 4, color: "primary.50"}}>
          select preferences
        </Text>
        <Entypo name="arrow-with-circle-right" size={24} color="primary.50" style = {{left : 20, top: 0}}/>
        </View>
        
      </Button>
      </ScrollView>


    </NativeBaseProvider>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  picker: {
    marginVertical: 10,
    width: 200,
    top: -100,


  },
  button: {
    paddingTop: 50,
  },
  text: {
    fontSize: 18,
    paddingTop: 0,
    color: "grey",
    flex: 1,
    alignItems: "center",
  },
  instruction: {
    display: "flex",
    left: -30,
    top: 40,
    alignItems: "center",
  },
  chipBox: {
    alignItems: "center",
    justifyContent: "center",
    top: 40,
    paddingBottom: 100,
  },
  chipBoxContainer : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",

  }
});