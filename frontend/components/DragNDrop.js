import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { DraxProvider, DraxView, DraxList, DraxSnapbackTargetPreset } from 'react-native-drax';
import {
  NativeBaseProvider,
  
  Button,
} from "native-base";
//import { BoardRepository } from 'react-native-draganddrop-board';



function DragNDrop({ route, navigation }) {
  //const {selectedOptions} = route.params;
  //console.log(selectedOptions);
  const [moving, setMoving] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [originalCardPos, setOriginalCardPos] = useState({ x: 0, y: 0 });
  const [business,setBusiness] = useState([]);

  // useEffect(
  //   function effectFunction() {
  //     async function fetchFilters() {
  //       const response = await fetch('https://ancient-island-59052.herokuapp.com/business/');
  //       const json = await response.json();
  //       let selectedFilterState = {};
  //       for (const [filter, options] of Object.entries(json)) {
  //         selectedFilterState[filter] = [];
  //       }
  //       setSelectedFilter(selectedFilterState);
  //       //console.log("test:"  + JSON.stringify(selectedFilterState));
  //     }
  //     fetchFilters();

  //   });


  function listBusinesses(){
    
  }





  return (
    <NativeBaseProvider>
      <View style={{ top: -3 }}>
        <HeaderComponent text="Drag and Drop" />
      </View>



      <DraxProvider>
        <View style={styles.areaContainer}>


          <View style={styles.draggableArea}>

            <View>
              <DraxView

                style={[styles.draggable,
                {
                  width: Dimensions.get('window').width / 2,
                  height: 100,
                  top: cardPos.y,
                  left: cardPos.x,
                }
                ]
                }
                onDragStart={() => {
                  console.log('start drag');
                  setMoving(true);
                }}
                onDragEnd={() => {
                  setMoving(false);
                }}
                onDragDrop={() => {
                  setOriginalCardPos({ x: 0, y: 0 })
                }}

                draggingStyle={styles.dragging}
                dragPayload={{ setCardPos }}
              />


            </View>
            {/* <View>
              <DraxView

                style={[styles.draggable,
                {
                  width: Dimensions.get('window').width / 2,
                  height: 100,
                  top: cardPos.y,
                  left: cardPos.x,
                }
                ]
                }
                onDragStart={() => {
                  console.log('start drag');
                  setMoving(true);
                }}
                onDragEnd={() => {
                  setMoving(false);
                }}
                onDragDrop={() => {
                  setOriginalCardPos({ x: 0, y: 100 })
                }}

                draggingStyle={styles.dragging}
                dragPayload={{ setCardPos }}
              />


            </View> */}



          </View>


          <View style={styles.receiverArea}>

            <DraxView
              style={styles.receiver}
              // onReceiveDragEnter={({ dragged: { payload } }) => {
              //   console.log(`hello ${payload}`);
              // }}
              // onReceiveDragExit={({ dragged: { payload } }) => {
              //   console.log(`goodbye ${payload}`);
              // }}
              receivingStyle={styles.receiving}
              receptive={true}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                payload?.setCardPos?.({ x: 207, y: 0 });
                console.log(`received ${payload}`);

                return DraxSnapbackTargetPreset.None;
              }}
            />
            <DraxView
              style={styles.receiver}
              // onReceiveDragEnter={({ dragged: { payload } }) => {
              //   console.log(`hello ${payload}`);
              // }}
              // onReceiveDragExit={({ dragged: { payload } }) => {
              //   console.log(`goodbye ${payload}`);
              // }}
              receivingStyle={styles.receiving}
              receptive={true}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                payload?.setCardPos?.({ x: 207, y: 100 });
                console.log(`received ${payload}`);

                return DraxSnapbackTargetPreset.None;
              }}
            />
            <DraxView
              style={styles.receiver}
              // onReceiveDragEnter={({ dragged: { payload } }) => {
              //   console.log(`hello ${payload}`);
              // }}
              // onReceiveDragExit={({ dragged: { payload } }) => {
              //   console.log(`goodbye ${payload}`);
              // }}
              receivingStyle={styles.receiving}
              receptive={true}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                payload?.setCardPos?.({ x: 207, y: 200 });
                console.log(`received ${payload}`);

                return DraxSnapbackTargetPreset.None;
              }}
            />



          </View>

        </View>
        <View style={styles.deleteArea}>
          <DraxView
            style={styles.deleteReceiver}
            receptive={true}
            receivingStyle={styles.receiving}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              payload?.setCardPos?.({ x: originalCardPos.x, y: originalCardPos.y });
              return DraxSnapbackTargetPreset.None;
            }}
          />

        </View>
      </DraxProvider>






    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  areaContainer: {
    display: 'flex',
    flexDirection: 'row',
    top: -12,

  },
  listContainer: {
    flex: 1,
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
    backgroundColor: 'red',

  },
  receiverArea: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height - 200,
    backgroundColor: 'black',
    zIndex: -1,

  },
  deleteArea: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'orange',
    zIndex: 0,
    top: -12,
  },
  draggable: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: 'blue',
    zIndex: 5,
  },
  receiver: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: 'green',
    zIndex: 0,
  },
  deleteReceiver: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'orange',
    zIndex: 0,


  },
  dragging: {
    opacity: 0.2,
  },
  receiving: {
    borderColor: '#ff00ff',
    borderWidth: 5,
  },


});

export default DragNDrop;
