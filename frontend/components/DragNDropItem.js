import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { DraxProvider,DraxScrollView, DraxView, DraxList, DraxSnapbackTargetPreset } from 'react-native-drax';
import {
  NativeBaseProvider,

  Button,
} from "native-base";
//import { BoardRepository } from 'react-native-draganddrop-board';



export default function DragNDropItem({name ,address,y,offset,setOffset,showDelete,picture ,distance ,tags}) {
  const [cardPos, setCardPos] = useState({ x: 0, y: y });
  const [dayTime,setDayTime] = useState("");
  //console.log(picture);
  return (
    <View>
    <DraxView

      style={[styles.draggable,
      {
        width: Dimensions.get('window').width / 2,
        height: 100,
        top: cardPos.y,
        left: cardPos.x,
        backgroundColor: "papayawhip", 
        borderColor: "peru", 
        borderWidth: 1, 
        paddingBottom: 5, 
        paddingRight: 5
      }
      ]
      }
     
      onDragStart={()=>{
        setOffset(offset);
        showDelete(true);
      }}
      onDragEnd={()=>{
        
        showDelete(false);
      }}
      onDragDrop={() => {
        showDelete(false);
      }}

      draggingStyle={styles.dragging}
      dragPayload={{ setCardPos , name, address, picture, distance, tags,setDayTime, dayTime}}
      renderContent={() => {
        return (
        <View style={{borderColor: "peru"}}>
          <Text>
            {name} 
          </Text>
          <Text>
            {address}
          </Text>
          
        </View>)
      }}
    />


  </View>

  );
    
}

const styles = StyleSheet.create({
 
 
  draggable: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'gray',
    zIndex: 100,
    padding: 5,
  },
  
  dragging: {
    opacity: 0.2,
  },

});

