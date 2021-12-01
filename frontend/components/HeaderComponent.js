import {Header} from 'react-native-elements';
import React from 'react';
import image from "../assets/banner.png";
import { View} from 'react-native';
const HeaderComponent = (props) => {
    const name = props.text;
    //console.log(name);
    return(
        <View style = {{top : 15}}>
            
        
        <Header centerComponent = {{text: name,style:{justifyContent : "center", color: "#96756C", fontSize : 20}}} 
            containerStyle= {{display : "sticky" , backgroundColor : "#FCE9DB" ,top: -25, height : 65,zIndex : 100}}/>
        </View>
        );
}
export default HeaderComponent;