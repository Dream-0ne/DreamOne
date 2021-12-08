import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { DraxProvider, DraxScrollView, DraxView, DraxList, DraxSnapbackTargetPreset } from 'react-native-drax';
import { LogBox } from 'react-native';

import {
  NativeBaseProvider,
  ScrollView,
  Button,
  Box,
  Text,
  extendTheme,
} from "native-base";
//import { BoardRepository } from 'react-native-draganddrop-board';
import DragNDropItem from './DragNDropItem';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

function DragNDrop({ route, navigation }) {
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
  const { selectedOptions, lat, long, json } = route.params;
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications


  const [originalCardPos, setOriginalCardPos] = useState({ x: 0, y: 0 });
  const [business, setBusiness] = useState([]);
  const [filter, setFilter] = useState(selectedOptions);
  const [offset, setOffset] = useState(0);
  const [deleteShow, setDeleteShow] = useState(false);
  const [plannerShow, setPlannerShow] = useState(true);
  const [height1, setHeight] = useState(0);
  const [morningPlanner, setMorningPlanner] = useState({});
  const [afternoonPlanner, setAfternoonPlanner] = useState({});
  const [nightPlanner, setNightPlanner] = useState({});
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(
    function effectFunction() {
      async function fetchBusiness() {


        setBusiness(json);


      }
      fetchBusiness();
      let heightOffset = 100;
      if (business.length > 1) {
        setHeight(heightOffset * business.length);
        setPlannerShow(true);
      } else {
        setPlannerShow(false);
      }


    });
  //console.log(business);

  function listBusinesses() {
    const temp = [];
    let y = 0;
    let offset = 0;
    business.forEach((item) => {
      if (y === 100) {
        y -= 100;
      }
      //console.log(item.photo_ref);

      temp.push(

        <DragNDropItem name={item.name} address={item.address} y={y} offset={offset}
          picture={item.photo_ref} distance={item.distance} tags={item.tags}
          setOffset={(value) => setOffsetFunction(value)}
          showDelete={(bool) => showDeleteFunction(bool)} />
      )
      y += 100;
      offset += 1;
    })
    return temp;
  }

  function setOffsetFunction(value) {
    setOffset(value);
  }

  function showDeleteFunction(bool) {
    //console.log(bool);
    setDeleteShow(bool);
  }
  function switchPage() {
    navigation.navigate('Detail View', { morning: morningPlanner, afternoon: afternoonPlanner, night: nightPlanner });
  }

  if (plannerShow === false) {
    return (
      <NativeBaseProvider>
        <View style={{ top: -3 }}>
          <HeaderComponent text="Drag and Drop" />
        </View>
        <Text>
          There is no local business with "{searchFilter}" near you.
        </Text>

      </NativeBaseProvider>
    )

  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <View style={{ padding: 0, color: "mistyrose" }}>
          <HeaderComponent text="Drag and Drop" />
        </View>


        <DraxProvider >
          <DraxScrollView vertical showsVerticalScrollIndicator={true}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              height: height1,

            }}>


              {/* <DraxScrollView showsVerticalScrollIndicator= {true}> */}
              <SafeAreaView style={styles.draggableArea}>
                <View style={{ padding: 4 }}>
                  <Box
                    shadow="2"
                    rounded="lg"
                    w={{ base: "20", md: "100", lg: "md" }}
                    bg="primary.55"
                    style={{ padding: 4, left: -4, width: Dimensions.get('window').width / 2 - 1 }}
                  >
                    <Text fontWeight="medium" color="white" fontSize="sm" textAlign="center">
                      {/* <Feather name="sunrise" size={20} color="white" /> */}
                      BUSINESSES
                    </Text>
                    {listBusinesses()}
                  </Box>
                </View>









              </SafeAreaView>
              {/* </DraxScrollView> */}

              <View style={styles.receiverArea}>
                <View style={{ padding: 4 }}>
                  <Box
                    shadow="2"
                    rounded="lg"
                    w={{ base: "20", md: "100", lg: "md" }}
                    bg="primary.55"
                    style={{ padding: 4, left: -4, width: Dimensions.get('window').width / 2 - 1 }}
                  >

                    <Text fontWeight="medium" color="white" fontSize="sm" textAlign="center">
                      {/* <Feather name="sunrise" size={20} color="white" /> */}
                      MORNING
                    </Text>
                    <DraxView
                      style={styles.receiver}
                      receivingStyle={styles.receiving}
                      receptive={true}
                      renderContent={() => {
                        return (
                          <View alignItems="center" style={{ top: 10 }}>
                            <Feather name="sunrise" size={80} color="peachpuff" />

                          </View>)
                      }}

                      onReceiveDragDrop={({ dragged: { payload } }) => {

                        payload?.setCardPos?.({ x: 196, y: 0 - offset * 100 });
                        payload?.setDayTime?.("morning");
                        setMorningPlanner({
                          "name": payload?.name, "address": payload?.address,
                          "picture": payload?.picture, "distance": payload?.distance,
                          "tags": payload?.tags
                        });


                        return DraxSnapbackTargetPreset.None;
                      }}
                    />

                  </Box>
                </View>


                <View style={{ padding: 4 }}>
                  <Box
                    shadow="2"
                    rounded="lg"
                    w={{ base: "20", md: "100", lg: "md" }}
                    bg="primary.55"
                    style={{ padding: 4, left: -4, width: Dimensions.get('window').width / 2 - 1 }}
                  >
                    <Text fontWeight="medium" color="white" fontSize="sm" textAlign="center">
                      {/* <Feather name="sunset" size={20} color="white" /> */}
                      AFTERNOON
                    </Text>
                    <DraxView
                      style={styles.receiver}
                      receivingStyle={styles.receiving}
                      receptive={true}
                      renderContent={() => {
                        return (
                          <View alignItems="center" style={{ top: 10 }}>
                            <Feather name="sunset" size={80} color="peachpuff" />

                          </View>)
                      }}

                      onReceiveDragDrop={({ dragged: { payload } }) => {
                        payload?.setCardPos?.({ x: 196, y: 136 - offset * 100 });
                        payload?.setDayTime?.("afternoon");
                        setAfternoonPlanner({
                          "name": payload?.name, "address": payload?.address,
                          "picture": payload?.picture, "distance": payload?.distance,
                          "tags": payload?.tags
                        });


                        return DraxSnapbackTargetPreset.None;
                      }}
                    />
                  </Box>
                </View>
                <View style={{ padding: 4 }}>
                  <Box
                    shadow="2"
                    rounded="lg"
                    w={{ base: "20", md: "100", lg: "md" }}
                    bg="primary.55"
                    style={{ padding: 4, left: -4, width: Dimensions.get('window').width / 2 - 1 }}
                  >
                    <Text fontWeight="medium" color="white" fontSize="sm" textAlign="center">

                      NIGHT
                    </Text>
                    <DraxView
                      style={styles.receiver}
                      receivingStyle={styles.receiving}
                      receptive={true}
                      renderContent={() => {
                        return (
                          <View alignItems="center" style={{ top: 10 }}>
                            <Feather name="moon" size={80} color="peachpuff" />

                          </View>)
                      }}

                      onReceiveDragDrop={({ dragged: { payload } }) => {
                        payload?.setCardPos?.({ x: 196, y: 272 - offset * 100 });
                        payload?.setDayTime?.("night");
                        setNightPlanner({
                          "name": payload?.name, "address": payload?.address,
                          "picture": payload?.picture, "distance": payload?.distance,
                          "tags": payload?.tags
                        });

                        return DraxSnapbackTargetPreset.None;
                      }}
                    />
                  </Box>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <Button onPress={() => { switchPage() }} style={{ paddingTop: 10, backgroundColor: "#C99789" }}>
                    Checkout Planner
                  </Button>
                </View>

              </View>

            </View>


          </DraxScrollView>
          {deleteShow && <View style={styles.deleteArea}>
            <DraxView
              style={styles.deleteReceiver}
              receptive={true}
              receivingStyle={styles.receiving}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                payload?.setCardPos?.({ x: originalCardPos.x, y: originalCardPos.y });
                if (payload?.dayTime === "morning") {
                  setMorningPlanner(null);
                } else if (payload?.dayTime === "afternoon") {
                  setAfternoonPlanner(null);
                } else if (payload?.dayTime === "night") {
                  setNightPlanner(null);
                }


                return DraxSnapbackTargetPreset.None;
              }}
              renderContent={() => {
                return (
                  <View style={{ alignItems: "center", top: 20 }}>
                    <FontAwesome5 name="trash-alt" size={40} color="black" />
                  </View>
                )
              }}
            />

          </View>}


        </DraxProvider>
      </NativeBaseProvider>


    );
  }




}

const styles = StyleSheet.create({
  listContainer: {
    padding: 4,
    paddingTop: 0,
  },
  draggableArea: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height - 200,


  },
  receiverArea: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height - 200,
    zIndex: -1,
  },
  deleteArea: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: '#ff6347',
    zIndex: 0,
    top: -90,
  },
  receiver: {
    width: Dimensions.get('window').width / 2 - 10,
    height: 100,
    backgroundColor: 'linen',
    zIndex: 0,
  },
  deleteReceiver: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: '#ff6347',
    zIndex: 0,
  },
  dragging: {
    opacity: 0.2,
  },
  receiving: {
    borderColor: 'black',
    borderWidth: 5,
  },


});

export default DragNDrop;