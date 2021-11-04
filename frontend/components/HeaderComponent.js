import {Header} from 'react-native-elements';
import React from 'react';
import image from "../assets/banner.png";
import { View} from 'react-native';
const HeaderComponent = (props) => {
    const name = props.text;
    return(
        <View>
            
        <Header placement="left" backgroundImage = {image} backgroundImageStyle= {{width: null,
            height: null,resizeMode: 'contain' }} containerStyle ={{height : 60,backgroundColor : "#C99789",zIndex : 1}}/>
        <Header centerComponent = {{text: name,style:{justifyContent : "center", color: "#96756C", fontSize : 20}}} 
            containerStyle= {{backgroundColor : "#FCE9DB" ,top: -25, height : 60,zIndex : 0}}/>
        </View>
        );
}
export default HeaderComponent;