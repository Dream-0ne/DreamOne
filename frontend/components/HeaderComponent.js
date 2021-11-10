import {Header} from 'react-native-elements';
import React from 'react';
import image from "../assets/banner.png";
import { View} from 'react-native';
const HeaderComponent = (props) => {
    const name = props.text;
    return(
        <View>
            
        
        <Header centerComponent = {{text: name,style:{justifyContent : "center", color: "#96756C", fontSize : 20}}} 
            containerStyle= {{backgroundColor : "#FCE9DB" ,top: -25, height : 65,zIndex : 1}}/>
        </View>
        );
}
export default HeaderComponent;