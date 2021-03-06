import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieContainer from "./MoviesContainer";
import MessagesLink from "../../components/MessageLink";

const Stack = createStackNavigator();
export default () => (
 <Stack.Navigator
  mode="modal"
  screenOptions={{
   gestureEnabled: true,
   headerStyle: {
    backgroundColor: "black",
    shadowColor: "black",
    borderBottomColor: "black",
   },
   headerTintColor: "white",
   headerBackTitleVisible: false,
  }}
 >
  <Stack.Screen
   name="Movies"
   component={MovieContainer}
   options={{
    headerRight: () => <MessagesLink />,
   }}
  />
 </Stack.Navigator>
);
