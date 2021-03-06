import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { DraxProvider, DraxScrollView, DraxView, DraxList, DraxSnapbackTargetPreset } from 'react-native-drax';
import { LogBox } from 'react-native';

import {
  NativeBaseProvider,
  Text,
  Button,
} from "native-base";
//import { BoardRepository } from 'react-native-draganddrop-board';



export default function DragNDropItem({ name, address, y, offset, setOffset, showDelete, picture, distance, tags }) {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const [cardPos, setCardPos] = useState({ x: 0, y: y });
  const [dayTime, setDayTime] = useState("");
  //console.log(picture);
  return (
    <View>
      <DraxView

        style={[styles.draggable,
        {
          width: Dimensions.get('window').width / 2 - 10,
          height: 100,
          top: cardPos.y,
          left: cardPos.x,
          backgroundColor: "papayawhip",
          borderColor: "peru",
          borderWidth: 1.5,
          marginBottom: 0.5,
          marginLeft: -0.5,
        }
        ]
        }

        onDragStart={() => {
          setOffset(offset);
          showDelete(true);
        }}
        onDragEnd={() => {

          showDelete(false);
        }}
        onDragDrop={() => {
          showDelete(false);
        }}

        draggingStyle={styles.dragging}
        dragPayload={{ setCardPos, name, address, picture, distance, tags, setDayTime, dayTime }}
        renderContent={() => {
          return (
            <NativeBaseProvider>
              <View style={{ borderColor: "peru" }}>
                <Text fontWeight="medium" color="black" fontSize="sm" textAlign="center">
                  {name}
                </Text>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                  textAlign="center"
                >
                  {distance} from you
                </Text>
                <Text fontWeight="300" fontSize="12" textAlign = "center">
                  {address}
                </Text>

              </View>
            </NativeBaseProvider>
          )
        }}
      />


    </View>

  );

}

const styles = StyleSheet.create({


  draggable: {
    zIndex: 100,
    padding: 5,
  },

  dragging: {
    opacity: 0.2,
  },

});

