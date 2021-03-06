import React, { useState, useEffect } from "react";
import {
 Text,
 TouchableOpacity,
 Modal,
 View,
 StyleSheet,
 Alert,
 KeyboardAvoidingView,
} from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCodes } from "../../CodeContext";

import { useGetUserRegistInfo } from "../../UserRegistContext";

const OuterContainer = styled.SafeAreaView`
 flex: 1;
`;

const Detail = styled.View`
 flex: 1;
 flex-direction: column;
 background-color: white;
`;

const DetailHeader = styled.View`
 padding-left: 20px;
 padding-right: 20px;
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`;
const DetailFooter = styled.View`
 flex-direction: row;
 justify-content: space-around;
`;

const CancelBtn = styled.TouchableOpacity`
 flex: 0.5;
 align-items: center;
 justify-content: center;
 background-color: white;
 border: 1px solid #3e50b4;
 height: 50px;
 border-radius: 5px;
`;
const ConfirmBtn = styled.TouchableOpacity`
 flex: 0.5;
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 height: 50px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 16px;
`;

const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: 22,
  backgroundColor: "rgba(0,0,0,0.5)",
 },
 modalView: {
  flex: 0,
  width: "100%",
  backgroundColor: "white",
  padding: 5,
  alignItems: "center",
 },
 modalInnerView: {
  alignItems: "center",
  borderWidth: 1,
  width: "100%",
 },
 openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 10,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  elevation: 2,
 },
 textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,
  marginBottom: 5,
 },
 modalTItle: {
  fontSize: 24,
  marginBottom: 15,
  textAlign: "center",
 },
 modalBody: {
  textAlign: "center",
 },
});

const EtcInput = styled.TextInput`
 border-width: 1px;
 border-color: grey;
 text-align: left;
 text-align-vertical: top;
 height: 150px;
 width: 100%;
`;

const titleFontSize = "16";
const titleBorderWidth = "1";
const DataHeaderBottomTitleContainer = styled.View`
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 border-color: #3e50b4;
 width: ${titleFontSize * 3}px;
 height: ${titleFontSize * 3}px;
 border-radius: ${titleFontSize * 3}px;
 border-width: ${titleBorderWidth}px;
`;
const DataHeaderBottomTitle = styled.Text`
 text-align: center;
 color: white;
 font-size: ${titleFontSize - 2 * titleBorderWidth}px;
 line-height: ${titleFontSize -
 (Platform.OS === "ios" ? 2 * titleBorderWidth : titleBorderWidth)}px;
`;

const DataHeader = styled.View`
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding-top: 10px;
 width: 100%;
`;
const DataBody = styled.View`
 padding-left: 10px;
 padding-right: 10px;
 padding-bottom: 10px;
 flex-direction: column;
 justify-content: flex-start;
 align-items: flex-start;
 width: 100%;
`;

const DataBodyColumn = styled.View`
 flex-direction: column;
 justify-content: flex-start;
 align-items: flex-start;
`;

const DataBodyTitle = styled.View`
 padding-bottom: 10px;
`;

const DataBodyTitleText = styled.Text`
 font-size: 18px;
 color: grey;
`;

const DataBodyContent = styled.View`
 padding-bottom: 10px;
`;

const DataBodyContentText = styled.Text`
 font-size: 16px;
 padding-bottom: 10px;
`;

const BG = styled.Image`
 flex: 1;
 opacity: 0.4;
`;

export default ({ refreshFn, loading, images }) => {
 //console.log(props);
 //console.log('orderDetail', order);
 const navigation = useNavigation();
 const codes = useCodes();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const [queryModalVisible, setQueryModalVisible] = useState(false);
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };

 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   if (!userRegistInfo) {
    await fetchData();
   } else {
   }
  });
  return unsubscribe;
 }, [navigation]);
 return (
  <OuterContainer>
   <Modal
    animationType="fade"
    hardwareAccelerated={true}
    transparent={true}
    statusBarTranslucent={true}
    visible={queryModalVisible}
   >
    <KeyboardAvoidingView
     behavior="padding"
     enabled
     style={styles.centeredView}
    >
     <View style={styles.modalView}>
      <View style={styles.modalInnerView}>
       <DataHeader>
        <Text style={{ fontSize: 20 }}>재요청</Text>
       </DataHeader>
       <DataBody style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
         <View style={{ flex: 1 }}></View>
         <View style={{ flex: 1, alignItems: "flex-end" }}></View>
        </View>
        <EtcInput
         underlineColorAndroid="transparent"
         placeholder="재요청 이유를 작성해주세요."
         placeholderTextColor="grey"
         numberOfLines={10}
         multiline={true}
        />
       </DataBody>
      </View>
     </View>

     <View style={{ flexDirection: "row", bottom: 0 }}>
      <CancelBtn
       onPress={() => {
        setQueryModalVisible(!queryModalVisible);
       }}
      >
       <Text style={{ fontSize: 16, color: "#3e50b4", fontWeight: "bold" }}>
        취소
       </Text>
      </CancelBtn>
      <ConfirmBtn
       onPress={() => {
        Alert.alert(
         "제출완료!",
         "명세서 확인이 완료되었습니다.",
         [{ text: "네", onPress: () => {} }],
         { cancelable: false }
        );
        setQueryModalVisible(!queryModalVisible);
       }}
      >
       <ConfirmBtnText>제출</ConfirmBtnText>
      </ConfirmBtn>
     </View>
    </KeyboardAvoidingView>
   </Modal>
   <Detail>
    <DetailHeader>
     <TouchableOpacity
      style={{
       width: 40,
       height: 40,
       justifyContent: "center",
      }}
      onPress={() => {
       navigation.pop();
      }}
     >
      <AntDesign name={"arrowleft"} color={"#303030"} size={24} />
     </TouchableOpacity>
     {/*<DetailHeaderTitle>1/5</DetailHeaderTitle>*/}
    </DetailHeader>
    <BG source={{ uri: images[0] }} />
    <DetailFooter>
     <CancelBtn
      onPress={() => {
       setQueryModalVisible(true);
      }}
     >
      <Text style={{ fontSize: 16, color: "#3e50b4", fontWeight: "bold" }}>
       재요청
      </Text>
     </CancelBtn>
     <ConfirmBtn
      onPress={() => {
       navigation.pop();
      }}
     >
      <ConfirmBtnText>확인</ConfirmBtnText>
     </ConfirmBtn>
    </DetailFooter>
   </Detail>
  </OuterContainer>
 );
};
