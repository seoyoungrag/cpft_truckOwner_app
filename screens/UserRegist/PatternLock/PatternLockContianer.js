import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 Animated,
 PanResponder,
 Platform,
 Dimensions,
 BackHandler,
} from "react-native";
import styled from "styled-components";
import * as Animatable from "react-native-animatable";
import constants from "../../../constants";
import PatternLockPresenter from "./PatternLockPresenter";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const PATTERN_CONTAINER_HEIGHT = height / 2;
const PATTERN_CONTAINER_WIDTH = (width * 3) / 4;
const PATTERN_DIMENSION = 3;
const CORRECT_UNLOCK_PATTERN = [
 { x: 0, y: 0 },
 { x: 1, y: 0 },
 { x: 2, y: 0 },
 { x: 1, y: 1 },
 { x: 0, y: 2 },
 { x: 1, y: 2 },
 { x: 2, y: 2 },
];
const HINT_DELAY = 3000;

export default ({ onMatchedPattern }) => {
 //const [patternContainerOpacity, setPatternContainerOpacity] = useState(1);
 //const _patternContainerOpacity = new Animated.Value(0);

 const resetAnimation = () => {
  /*
  Animated.timing(_patternContainerOpacity, {
   toValue: 0,
   duration: 0,
   useNativeDriver: true,
  }).start();
  */
  //setPatternContainerOpacity(0);
 };

 const onBackPress = () => {
  if (showPatternLock) {
   //setShowPatternLock(false);
   //setPatternContainerOpacity(0);
   //resetAnimation();
   return true;
  } else {
   BackHandler.exitApp();
   return false;
  }
 };

 useEffect(() => {
  BackHandler.addEventListener("hardwareBackPress", onBackPress);
  /*
  Animated.parallel([
   Animated.timing(_patternContainerOpacity, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
   }),
  ]).start();
  */
  //setPatternContainerOpacity(1);
  return () => {
   //resetAnimation();
   BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  };
 });

 //console.log(showPatternLock, _panYCoordinate, patternLockScale, _patternContainerOpacity);
 return (
  <View style={styles.root}>
   <View style={[styles.patternContainer]}>
    <PatternLockPresenter
     containerDimension={PATTERN_DIMENSION}
     containerWidth={PATTERN_CONTAINER_WIDTH}
     containerHeight={PATTERN_CONTAINER_HEIGHT}
     correctPattern={CORRECT_UNLOCK_PATTERN}
     hint="패스워드가 일치하지 않습니다. 다시 입력해주세요."
     onPatternMatch={onBackPress}
     onMatchedPattern={onMatchedPattern}
    />
    {Platform.OS === "ios" && (
     <View style={styles.backButtonContainer}>
      <Ionicons
       component={TouchableOpacity}
       onPress={onBackPress}
       name="chevron-left"
       color="white"
       size={45}
      />
     </View>
    )}
   </View>
  </View>
 );
};
const styles = StyleSheet.create({
 root: {
  flex: 1,
  backgroundColor: "transparent",
 },
 backgroundContainer: {
  flex: 1,
  alignItems: "center",
  height,
  width,
 },
 dateContainer: {
  flex: 1,
  backgroundColor: "transparent",
  alignItems: "center",
 },
 time: {
  fontSize: 80,
  fontWeight: "300",
  color: "#f2f2f2",
 },
 date: {
  fontSize: 20,
  color: "#f2f2f2",
 },
 patternContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "transparent",
 },
 backButtonContainer: {
  alignItems: "flex-start",
  paddingLeft: 40,
  paddingBottom: 10,
 },
 hint: {
  backgroundColor: "transparent",
  color: "black",
  fontSize: 16,
 },
});
