import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 Animated,
 PanResponder,
 Alert,
} from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import constants from "../../../constants";

const DEFAULT_DOT_RADIUS = 10;
const SNAP_DOT_RADIUS = 15;
const SNAP_DURATION = 100;

export default ({
 containerDimension,
 containerWidth,
 containerHeight,
 correctPattern,
 onPatternMatch,
 hint,
 onMatchedPattern,
}) => {
 const [message, setMessage] = useState("패스워드를 입력해주세요.");
 const [activeLine, setActiveLine] = useState(null);
 const [snap, setSnap] = useState(null);
 const [initialGestureCoordinate, setInitialGestureCoordinate] = useState(null);
 const [activeDotCoordinate, setActiveDotCoordinate] = useState(null);
 const [pattern, setPattern] = useState([]);
 const [firstPattern, setFirstPattern] = useState([]);
 const [showError, setShowError] = useState(false);
 const [showHint, setShowHint] = useState(false);

 let { screenCoordinates, mappedIndex } = constants.populateDotsCoordinate(
  containerDimension,
  containerWidth,
  containerHeight
 );

 let _dots = screenCoordinates;
 let _mappedDotsIndex = mappedIndex;
 let _dotNodes = [];

 const lineOpacity = new Animated.Value(0.2);
 let _activeLine;

 const _snapAnimatedValues = _dots.map((dot, index) => {
  let animatedValue = new Animated.Value(DEFAULT_DOT_RADIUS);
  animatedValue.addListener(({ value }) => {
   let dotNode = _dotNodes[index];
   dotNode && dotNode.setNativeProps({ r: value.toString() });
  });
  return animatedValue;
 });

 const _snapDot = (animatedValue) => {
  Animated.sequence([
   Animated.timing(animatedValue, {
    toValue: SNAP_DOT_RADIUS,
    duration: SNAP_DURATION,
    //duration: 1000,
    useNativeDriver: true,
   }),
   Animated.timing(animatedValue, {
    toValue: DEFAULT_DOT_RADIUS,
    duration: SNAP_DURATION,
    //duration: 1000,
    useNativeDriver: true,
   }),
  ]).start();
 };

 const _isAlreadyInPattern = ({ x, y }) => {
  return pattern.find((dot) => {
   return dot?.x === x && dot?.y === y;
  }) == null
   ? false
   : true;
 };

 const _isPatternMatched = (currentPattern) => {
  if (currentPattern.length !== firstPattern.length) {
   return false;
  }
  let matched = true;
  for (let index = 0; index < currentPattern.length; index++) {
   let correctDot = firstPattern[index];
   let currentDot = currentPattern[index];
   if (correctDot.x !== currentDot.x || correctDot.y !== currentDot.y) {
    matched = false;
    break;
   }
  }
  return matched;
 };

 let endGestureX;
 let endGestureY;

 const _panResponder = PanResponder.create({
  onMoveShouldSetResponderCapture: () => !showError,
  onMoveShouldSetPanResponderCapture: () => !showError,

  onPanResponderGrant: (e) => {
   let { locationX, locationY } = e.nativeEvent;

   let activeDotIndex = constants.getDotIndex(
    { x: locationX, y: locationY },
    _dots
   );

   if (activeDotIndex != null) {
    let activeDotCoordinate = _dots[activeDotIndex.i];
    let firstDot = _mappedDotsIndex[activeDotIndex.i];
    //let dotWillSnap = _snapAnimatedValues[activeDotIndex.i];

    endGestureX += activeDotIndex.x;
    endGestureY += activeDotIndex.y;
    setActiveDotCoordinate(activeDotCoordinate);
    setInitialGestureCoordinate(activeDotCoordinate);
    setPattern([firstDot]);
    //_snapDot(dotWillSnap);

    setSnap([activeDotIndex.i]);
    //setSnap(dotWillSnap);
   }
  },
  onPanResponderMove: (e, gestureState) => {
   let { dx, dy } = gestureState;

   if (activeDotCoordinate == null || initialGestureCoordinate == null) {
    return;
   }

   endGestureX = activeDotCoordinate.x + dx;
   endGestureY = activeDotCoordinate.y + dy;

   let matchedDotIndex = constants.getDotIndex(
    { x: endGestureX, y: endGestureY },
    _dots
   );

   let matchedDot =
    matchedDotIndex.i != null && _mappedDotsIndex[matchedDotIndex.i];

   if (
    matchedDotIndex.i != null &&
    matchedDot &&
    !_isAlreadyInPattern(matchedDot)
   ) {
    let newPattern = {
     x: matchedDot.x,
     y: matchedDot.y,
    };

    let intermediateDotIndexes = [];

    if (pattern.length > 0) {
     intermediateDotIndexes = constants.getIntermediateDotIndexes(
      pattern[pattern.length - 1],
      newPattern,
      containerDimension
     );
    }

    let filteredIntermediateDotIndexes = intermediateDotIndexes.filter(
     (index) => !_isAlreadyInPattern(_mappedDotsIndex[index])
    );

    filteredIntermediateDotIndexes.forEach((index) => {
     let mappedDot = _mappedDotsIndex[index];
     pattern.push({ x: mappedDot.x, y: mappedDot.y });
    });

    pattern.push(newPattern);

    let animateIndexes = [...filteredIntermediateDotIndexes, matchedDotIndex.i];

    setPattern(pattern);

    setActiveDotCoordinate(_dots[matchedDotIndex.i]);

    if (animateIndexes.length) {
     setSnap(animateIndexes);
     /*
     animateIndexes.forEach((index) => {
      setSnap(_snapAnimatedValues[index]);
      //_snapDot(_snapAnimatedValues[index]);
     });
     */
    }

    endGestureX += matchedDotIndex.x;
    endGestureY += matchedDotIndex.y;
   } else {
    _activeLine &&
     _activeLine.setNativeProps({
      x2: endGestureX.toString(),
      y2: endGestureY.toString(),
     });
    _activeLine && setActiveLine(_activeLine);
   }
  },
  onPanResponderRelease: () => {
   if (pattern.length && pattern.length > 2) {
    if (firstPattern?.length == 0) {
     setFirstPattern(pattern);
     setMessage("패스워드 확인을 위해 다시한번 입력해주세요.");
     setInitialGestureCoordinate(null);
     setActiveDotCoordinate(null);
     setPattern([]);
    } else if (firstPattern?.length > 0) {
     if (_isPatternMatched(pattern)) {
      setInitialGestureCoordinate(null);
      setActiveDotCoordinate(null);
      onMatchedPattern(pattern);
      setPattern([]);
      setMessage("패스워드 설정이 완료 되었습니다.");
     } else {
      setFirstPattern([]);
      setInitialGestureCoordinate(null);
      setActiveDotCoordinate(null);
      setPattern([]);
      setMessage("패스워드 설정이 실패했습니다. 처음부터 입력해주세요.");
     }
    } else {
     setInitialGestureCoordinate(null);
     setActiveDotCoordinate(null);
     setShowError(true);
    }
   } else {
    setInitialGestureCoordinate(null);
    setActiveDotCoordinate(null);
    setPattern([]);
    if (firstPattern?.length > 0) {
     setMessage(
      "패스워드 확인을 위해 다시한번 입력해주세요.\r\n3개 이상 설정해주세요."
     );
    } else {
     setMessage("3개 이상 설정해주세요.");
    }
   }
  },
 });

 useEffect(() => {
  if (snap?.length) {
   snap.map((obj) => {
    if (obj) {
     _snapDot(_snapAnimatedValues[obj]);
    }
    //drawAni(obj);
   });
   _snapAnimatedValues.map((obj, idx) => {
    if (!snap.includes(idx)) {
     Animated.timing(_snapAnimatedValues[idx], {
      toValue: DEFAULT_DOT_RADIUS,
      duration: 0,
      useNativeDriver: true,
      //duration: 1000,
     }).start();
    }
   });
  }
  if (activeLine) {
   lineOpacity.addListener(({ value }) => {
    activeLine.setNativeProps({ strokeOpacity: value });
   });
   Animated.timing(lineOpacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
   }).start();
  }
  /*
  if (snap) {
   _snapDot(snap);
   
  }
  */
 }, [snap, activeLine]);
 return (
  <View style={styles.container}>
   <View style={styles.hintContainer}>
    <Text style={styles.hintText}>{message}</Text>
   </View>
   {pattern ? (
    <Animated.View {..._panResponder.panHandlers}>
     <Svg height={containerHeight} width={containerWidth}>
      {_dots.map((dot, i) => {
       let mappedDot = _mappedDotsIndex[i];
       let isIncludedInPattern = pattern.find(
        (dot) => dot?.x === mappedDot.x && dot?.y === mappedDot.y
       );
       return (
        <Circle
         ref={(circle) => (_dotNodes[i] = circle)}
         key={i}
         cx={dot?.x}
         cy={dot?.y}
         r={DEFAULT_DOT_RADIUS}
         fill={(showError && isIncludedInPattern && "red") || "black"}
        />
       );
      })}
      {pattern.map((startCoordinate, index) => {
       if (index === pattern.length - 1) {
        return;
       }
       let startIndex = _mappedDotsIndex.findIndex((dot) => {
        return dot.x === startCoordinate.x && dot.y === startCoordinate.y;
       });
       let endCoordinate = pattern[index + 1];
       let endIndex = _mappedDotsIndex.findIndex((dot) => {
        return dot.x === endCoordinate.x && dot.y === endCoordinate.y;
       });

       if (startIndex < 0 || endIndex < 0) {
        return;
       }

       let actualStartDot = _dots[startIndex];
       let actualEndDot = _dots[endIndex];

       return (
        <Line
         key={`fixedLine${index}`}
         x1={actualStartDot.x}
         y1={actualStartDot.y}
         x2={actualEndDot.x}
         y2={actualEndDot.y}
         stroke={showError ? "red" : "black"}
         strokeWidth="4"
        />
       );
      })}
      {activeDotCoordinate ? (
       <Line
        ref={(component) => (_activeLine = component)}
        x1={activeDotCoordinate.x}
        y1={activeDotCoordinate.y}
        x2={activeDotCoordinate.x}
        y2={activeDotCoordinate.y}
        stroke="black"
        strokeWidth="4"
        strokeOpacity="0"
       />
      ) : null}
     </Svg>
    </Animated.View>
   ) : null}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "transparent",
  alignItems: "center",
  justifyContent: "center",
 },
 hintContainer: {
  alignItems: "center",
  paddingBottom: 10,
  height: 20,
  flexWrap: "wrap",
 },
 hintText: {
  color: "black",
  textAlign: "center",
 },
});
