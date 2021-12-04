
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
    AspectRatio,
    Image,
    Stack,
    Heading,
    ScrollView,

} from "native-base"


export default function DetailView({ navigation, route }) {
    const { morning, afternoon, night } = route.params;

    const [showMorningPlanner, setShowMorningPlanner] = useState(morning.name !== undefined);
    const [showAfternoonPlanner, setShowAfternoonPlanner] = useState(afternoon.name !== undefined);
    const [showNightPlanner, setShowNightPlanner] = useState(night.name !== undefined);
    console.log(showMorningPlanner + " " + showAfternoonPlanner + " " + showNightPlanner);
    function showTags(tags) {
        let temp = [];
        for (const [key, value] of Object.entries(tags)) {
            value.forEach(element => {
                temp.push(
                    <Center
                        bg="warning.400"
                        _dark={{
                            bg: "warning.50",
                        }}
                        _text={{
                            color: "warmGray.50",
                            fontWeight: "700",
                            fontSize: "xs",
                        }}
                        position="absolute"
                        bottom="0"
                        left = "250"
                        px="3"
                        py="1.5"
                    >
                        {element}
                    </Center>
                );
            });
        }
        return temp;
    }
    return (
        <NativeBaseProvider>

            <View style={{ padding: 0 }}>
                <HeaderComponent text="Detail View" />
            </View>
            <ScrollView>
                {showMorningPlanner && <View style={{ alignItems: "center" }}>
                    <Box
                        maxW="80"
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"

                        _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700",
                        }}
                        _web={{
                            shadow: 2,
                            borderWidth: 0,
                        }}
                        _light={{
                            backgroundColor: "gray.50",
                        }}
                    >
                        <Box >
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image
                                    source={{
                                        uri: morning.picture,
                                    }}
                                    alt="image"
                                />
                            </AspectRatio>
                            <Center
                                bg="orange.500"
                                _dark={{
                                    bg: "violet.400",
                                }}
                                _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs",
                                }}
                                position="absolute"
                                bottom="0"
                                px="3"
                                py="1.5"
                            >
                                MORNING
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {morning.name}
                                </Heading>
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
                                >
                                    {morning.distance} ft from you
                                </Text>
                            </Stack>
                            <Text fontWeight="400">
                                {morning.address}
                            </Text>
                            
                                {showTags(morning.tags)}
                           
                        </Stack>

                    </Box>

                </View>}

                {showAfternoonPlanner && <View style={{ alignItems: "center" }}>
                    <Box
                        maxW="80"
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"

                        _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700",
                        }}
                        _web={{
                            shadow: 2,
                            borderWidth: 0,
                        }}
                        _light={{
                            backgroundColor: "gray.50",
                        }}
                    >
                        <Box >
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image
                                    source={{
                                        uri: afternoon.picture,
                                    }}
                                    alt="image"
                                />
                            </AspectRatio>
                            <Center
                                bg="orange.500"
                                _dark={{
                                    bg: "violet.400",
                                }}
                                _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs",
                                }}
                                position="absolute"
                                bottom="0"
                                px="3"
                                py="1.5"
                            >
                                AFTERNOON
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {afternoon.name}
                                </Heading>
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
                                >
                                    {afternoon.distance} ft from you
                                </Text>
                            </Stack>
                            <Text fontWeight="400">
                                {afternoon.address}
                            </Text>
                            
                            {showTags(afternoon.tags)}
                            
                        </Stack>
                    </Box>
                </View>}

                {showNightPlanner && <View style={{ alignItems: "center" }}>
                    <Box
                        maxW="80"
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"

                        _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700",
                        }}
                        _web={{
                            shadow: 2,
                            borderWidth: 0,
                        }}
                        _light={{
                            backgroundColor: "gray.50",
                        }}
                    >
                        <Box >
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image
                                    source={{
                                        uri: night.picture,
                                    }}
                                    alt="image"
                                />
                            </AspectRatio>
                            <Center
                                bg="orange.500"
                                _dark={{
                                    bg: "violet.400",
                                }}
                                _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs",
                                }}
                                position="absolute"
                                bottom="0"
                                px="3"
                                py="1.5"
                            >
                                NIGHT
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {night.name}
                                </Heading>
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
                                >
                                    {night.distance} ft from you
                                </Text>
                            </Stack>
                            <Text fontWeight="400">
                                {night.address}
                            </Text>
                            {showTags(night.tags)}
                        </Stack>
                    </Box>
                </View>}
            </ScrollView>
        </NativeBaseProvider>
    );


};

const styles = StyleSheet.create({

});
