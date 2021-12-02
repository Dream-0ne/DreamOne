import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { DraxProvider, DraxScrollView, DraxView, DraxList, DraxSnapbackTargetPreset } from 'react-native-drax';
import {
  NativeBaseProvider,

  Button,
} from "native-base";
//import { BoardRepository } from 'react-native-draganddrop-board';
import DragNDropItem from './DragNDropItem';
import { FontAwesome5 } from '@expo/vector-icons';



function DragNDrop({ route, navigation }) {
  const { selectedOptions } = route.params;

  const [originalCardPos, setOriginalCardPos] = useState({ x: 0, y: 0 });
  const [business, setBusiness] = useState([]);
  const [filter, setFilter] = useState(selectedOptions);
  const [offset, setOffset] = useState(0);
  const [deleteShow,setDeleteShow] = useState(false);
  console.log(filter);

  useEffect(
    function effectFunction() {
       async function fetchBusiness() {
        const response = await fetch('https://ancient-island-59052.herokuapp.com/business/' + filter);
        const json = await response.json();

        setBusiness(json);
        
      }
      fetchBusiness();

    });
  //console.log(business);

  function listBusinesses() {
    const temp = [];
    let y = 0;
    let offset = 0;
    business.forEach((item) => {
      if (y ===100){
        y -= 100;
      }
     
      
      temp.push(

        <DragNDropItem name={item.name} address={item.address} y={y} offset = {offset}
                        setOffset = {(value)=>setOffsetFunction(value)}
                        showDelete = {(bool) => showDeleteFunction(bool)}/>
      )
      y += 100;
      offset += 1;
    })
    return temp;
  }

  function setOffsetFunction(value){
    setOffset(value);
  }

  function showDeleteFunction(bool){
    console.log(bool);
    setDeleteShow(bool);
  }

  
    return (
   
      <NativeBaseProvider>
  
        <View style={{ top: -3 }}>
          <HeaderComponent text="Drag and Drop" />
        </View>
  
  
  
        <DraxProvider>
          <SafeAreaView>
  
            <View style={styles.areaContainer}>
  
  
              <View style={styles.draggableArea}>
  
                {listBusinesses()}
  
  
  
  
              </View>
  
  
              <View style={styles.receiverArea}>
  
                <DraxView
                  style={styles.receiver}
                  receivingStyle={styles.receiving}
                  receptive={true}
                  onReceiveDragDrop={({ dragged: { payload } }) => {
                    payload?.setCardPos?.({ x: 207, y: 0 - offset*100 });
                    
  
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
                    payload?.setCardPos?.({ x: 207, y: 100- offset*100});
                    
  
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
                    payload?.setCardPos?.({ x: 207, y :200 - offset*100});
  
                    return DraxSnapbackTargetPreset.None;
                  }}
                />
  
  
  
              </View>
            </View>
  
          </SafeAreaView>
          {deleteShow && <View style={styles.deleteArea}>
            <DraxView
              style={styles.deleteReceiver}
              receptive={true}
              receivingStyle={styles.receiving}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                payload?.setCardPos?.({ x: originalCardPos.x, y: originalCardPos.y });
                return DraxSnapbackTargetPreset.None;
              }}
              renderContent={()=>{
                return(
                  <View style = {{alignItems : "center", top : 20}}>
                  <FontAwesome5 name="trash-alt" size={40} color="black" />
                  </View>
                )
              }}
            />
  
          </View> }
          
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
    backgroundColor: 'red',
    zIndex: 0,
    top: -12,
  },
  draggable: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: 'gray',
    zIndex: 5,
    padding: 5,
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
    backgroundColor: 'red',
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
