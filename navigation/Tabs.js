import React, { useState, useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import Orders from "../screens/Orders";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, TouchableHighlight } from "react-native";
import PhotoNavigation from "./PhotoNavigation";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native-animatable";
import {useIsModal, useSetIsModalProp} from "../ModalContext"
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
 route?.state?.routeNames[route.state.index] || "";
//<FontAwesome5 name="truck-moving" size={24} color="black" />

export default ({ navigation, route }) => {
    const setIsModalProp = useSetIsModalProp();
 useLayoutEffect(() => {
    setIsModalProp(false);
  navigation.setOptions({
   title: getHeaderName(route),
  });
 }, [route]);

 return (
     <>
  <Tabs.Navigator
   screenOptions={({ route }) => ({
    tabBarIcon: ({ focused }) => {
     //let iconName = Platform.OS === "ios" ? "ios-" : "md-";
     let iconName = "";
     if (route.name === "Orders") {
      iconName += "truck";
     } else if (route.name === "Movies") {
      iconName += "film";
     } else if (route.name === "TV") {
      iconName += "tv";
     } else if (route.name === "Search") {
      iconName += "search";
     } else if (route.name === "Discovery") {
      iconName += "heart";
     } else if (route.name === "Photo") {
      iconName += "file-image";
     }
     return (
      <FontAwesome5
       name={iconName}
       color={focused ? "#3a99fc" : "grey"}
       size={20}
      />
     );
    },
    tabBarLabel: ({ focused }) => {
     let label;
     if (route.name === "Orders") {
      label = "오더";
     } else if (route.name === "Movies") {
      label = "film";
     } else if (route.name === "TV") {
      label = "tv";
     } else if (route.name === "Search") {
      label = "search";
     } else if (route.name === "Discovery") {
      label = "heart";
     } else if (route.name === "Photo") {
      label = "albums";
     }
     return <Text style={{ fontSize: 12, color:focused ? "#3a99fc" : "grey" }}>{label}</Text>;
    },
   })}
   tabBarOptions={{
    showLabel: true,
    style: {
     /*backgroundColor: "#007bff",*/
     /*backgroundColor: "white",*/
     borderTopColor: useIsModal()? 'rgba(0,0,0,1)':"silver",
     position: 'absolute',
     /*opacity: useIsModal()? 0.5 : 1,*/
     backgroundColor: useIsModal()? 'rgba(0,0,0,1)':"white"
     
    },
    tabBarOnpress: ()=>{console.log('asdf');}
   }}
   tabBarOnpress={({navigation, defaultHandler}) => {
       console.log('press', useIsModal());
       if(useIsModal()){
           console.log('123');
        return null;
       }else{
        defaultHandler();
       }
   }}
  >
   <Tabs.Screen name="Orders" component={Orders} options={{tabBarButton : (props) => useIsModal()? <TouchableOpacity {...props} disabled={true} /> :<TouchableOpacity activeOpacity={1} {...props} />}} />
   <Tabs.Screen name="Movies" component={Movies} options={{tabBarButton : (props) => useIsModal()? <TouchableOpacity {...props} disabled={true} /> :<TouchableOpacity activeOpacity={1} {...props} />}} />
   <Tabs.Screen name="TV" component={Tv} options={{tabBarButton : (props) => useIsModal()? <TouchableOpacity {...props} disabled={true} /> :<TouchableOpacity activeOpacity={1} {...props} />}} />
   <Tabs.Screen name="Search" component={Search} options={{tabBarButton : (props) => useIsModal()? <TouchableOpacity {...props} disabled={true} /> :<TouchableOpacity activeOpacity={1} {...props} />}} />
   <Tabs.Screen name="Discovery" component={Favs} options={{tabBarButton : (props) => useIsModal()? <TouchableOpacity {...props} disabled={true} /> :<TouchableOpacity activeOpacity={1} {...props} />}} />
   <Tabs.Screen name="Photo" component={PhotoNavigation} options={{tabBarButton : (props) => useIsModal()? <TouchableOpacity {...props} disabled={true} /> :<TouchableOpacity activeOpacity={1} {...props} />}} />
  </Tabs.Navigator>
  </>
 );
};
