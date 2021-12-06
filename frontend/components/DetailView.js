
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderComponent from "./HeaderComponent";
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import {
    Box,
    Center,
    NativeBaseProvider,
    AspectRatio,
    Image,
    Stack,
    Heading,
    ScrollView,
    Text,

} from "native-base"


export default function DetailView({ navigation, route }) {
    const { morning, afternoon, night } = route.params;

    const [showMorningPlanner, setShowMorningPlanner] = useState(morning.name !== undefined && morning.name !== null);
    const [showAfternoonPlanner, setShowAfternoonPlanner] = useState(afternoon.name !== undefined && afternoon.name !== null);
    const [showNightPlanner, setShowNightPlanner] = useState(night.name !== undefined && night.name !== null);
    //console.log(showMorningPlanner + " " + showAfternoonPlanner + " " + showNightPlanner);
    function showTags(tags) {
        let temp = [];
        let index = 0;
        for (const [key, value] of Object.entries(tags)) {
            value.forEach(element => {
                console.log(element);
                let leftOffset = 250;
                temp.push(
                    <View key = {index} style={{ padding: 4 }}>
                        <Box
                            shadow="2"
                            rounded="lg"
                            w={{ base: "20", md: "100", lg: "md" }}
                            bg="warning.400"
                            style={{ padding: 4 }}
                        >
                            <Text fontWeight="medium" color="white" fontSize="sm" textAlign="center">
                                {element}
                            </Text>

                        </Box>
                    </View>
                );
                leftOffset -= 20;
            });
            index += 1;
        }
       
        return temp;
    }

    if (showAfternoonPlanner === false && showMorningPlanner === false && showNightPlanner === false) {
        return (
            <NativeBaseProvider>
            <View>
                <Text style = {{textAlign : 'center'}}>
                    Please drag at least one business to the planners.
                </Text>
            </View>
            </NativeBaseProvider>
        )
    } else {
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
                                        {morning.distance} from you
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">
                                    {morning.address}
                                </Text>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    {showTags(morning.tags)}


                                </View >

                            </Stack>

                        </Box>

                    </View>}

                    {showAfternoonPlanner && <View style={{ alignItems: "center", paddingTop: 20 }}>
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
                                        {afternoon.distance} from you
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">
                                    {afternoon.address}
                                </Text>

                                {showTags(afternoon.tags)}

                            </Stack>
                        </Box>
                    </View>}

                    {showNightPlanner && <View style={{ alignItems: "center", paddingTop: 20 }}>
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
                                        {night.distance} from you
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

    }
};

const styles = StyleSheet.create({

});
