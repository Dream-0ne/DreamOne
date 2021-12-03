
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


export default function DetailView({ navigation, route }) {
    return (
        <NativeBaseProvider>
            <View style={{ padding: 0 }}>
                <HeaderComponent text="Detail View" />
            </View>
            <View>
                <Text>
                    Detail View
                </Text>
            </View>
        </NativeBaseProvider>
    );


};

const styles = StyleSheet.create({

});
