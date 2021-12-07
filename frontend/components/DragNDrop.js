import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { DraxProvider, DraxScrollView, DraxView, DraxList, DraxSnapbackTargetPreset } from 'react-native-drax';
import {
  NativeBaseProvider,
  ScrollView,
  Button,
} from "native-base";
//import { BoardRepository } from 'react-native-draganddrop-board';
import DragNDropItem from './DragNDropItem';
import { FontAwesome5 } from '@expo/vector-icons';
import { height } from 'dom-helpers';
import { color } from 'react-native-elements/dist/helpers';



function DragNDrop({ route, navigation }) {
  const { selectedOptions, lat, long } = route.params;
  

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
        let tempString = "";
        filter.forEach((item) => {
          tempString = tempString + item + ":";

        })
        tempString = tempString.substr(0, tempString.length - 1);
        setSearchFilter(tempString);
        //console.log(searchFilter);
        const response = await fetch('https://ancient-island-59052.herokuapp.com/business/' + lat + "/" + long+ "/"+ searchFilter);
         console.log('https://ancient-island-59052.herokuapp.com/' + lat + "/" + long+ "/"+ searchFilter);
        const json = await response.json();

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
      <View>
        <View style={{ top: -3 }}>
          <HeaderComponent text="Drag and Drop" />
        </View>
        <Text>
          There is no local business with "{searchFilter}" near you.
        </Text>
      </View>)

  } else {
    return (
      <NativeBaseProvider>
        <View style={{ padding: 0, color: "mistyrose"}}>
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




                {listBusinesses()}




              </SafeAreaView>
              {/* </DraxScrollView> */}






              <View style={styles.receiverArea}>
                <Text>
                  Morning
                </Text>
                <DraxView
                  style={styles.receiver}
                  receivingStyle={styles.receiving}
                  receptive={true}

                  onReceiveDragDrop={({ dragged: { payload } }) => {

                    payload?.setCardPos?.({ x: 207, y: 17 - offset * 100 });
                    payload?.setDayTime?.("morning");
                    setMorningPlanner({
                      "name": payload?.name, "address": payload?.address,
                      "picture": payload?.picture, "distance": payload?.distance,
                      "tags": payload?.tags
                    });


                    return DraxSnapbackTargetPreset.None;
                  }}
                />
                <Text>
                  Afternoon
                </Text>
                <DraxView
                  style={styles.receiver}
                  receivingStyle={styles.receiving}
                  receptive={true}

                  onReceiveDragDrop={({ dragged: { payload } }) => {
                    payload?.setCardPos?.({ x: 207, y: 135 - offset * 100 });
                    payload?.setDayTime?.("afternoon");
                    setAfternoonPlanner({
                      "name": payload?.name, "address": payload?.address,
                      "picture": payload?.picture, "distance": payload?.distance,
                      "tags": payload?.tags
                    });


                    return DraxSnapbackTargetPreset.None;
                  }}
                />
                <Text>
                  Night
                </Text>
                <DraxView
                  style={styles.receiver}
                  receivingStyle={styles.receiving}
                  receptive={true}

                  onReceiveDragDrop={({ dragged: { payload } }) => {
                    payload?.setCardPos?.({ x: 207, y: 252 - offset * 100 });
                    payload?.setDayTime?.("night");
                    setNightPlanner({
                      "name": payload?.name, "address": payload?.address,
                      "picture": payload?.picture, "distance": payload?.distance,
                      "tags": payload?.tags
                    });

                    return DraxSnapbackTargetPreset.None;
                  }}
                />

                <Button onPress={() => { switchPage() }} onLongPress = {() => style= {... {backgroundColor:"linen"}}} style={{backgroundColor: "darksalmon"}}>
                  Checkout the planner
                </Button>

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
  alphaItem: {
    backgroundColor: '#aaaaff',
    borderRadius: 8,
    margin: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphaText: {
    fontSize: 28,
  },
  draggableArea: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height - 200,
    backgroundColor: 'white',

  },
  receiverArea: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height - 200,
    backgroundColor: 'white',
    zIndex: -1,

  },
  deleteArea: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'whitesmoke',
    zIndex: 0,
    top: -90,
  },
  draggable: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: 'peachpuff',
    zIndex: 5,
    padding: 5,
  },
  receiver: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: 'linen',
    zIndex: 0,
  },
  deleteReceiver: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'whitesmoke',
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