import React, { useState, useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, StatusBar } from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import {
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import ScrollContainer from "../../components/ScrollContainer";
import { View } from "react-native-animatable";
import FloatingLabelInput from "../../components/FloatingLabelInput";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const OuterContainer = styled.SafeAreaView`
 flex: 1;
`;

const Modal = styled.View`
 flex: 1;
 flex-direction: column;
 background-color: white;
`;

const ModalHeader = styled.View`
 padding-left: 20px;
 padding-right: 20px;
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`;
const ModalHeaderTitle = styled.Text`
 color: #0d0d0d;
 font-size: 16px;
`;

const ModalFooter = styled.View`
 bottom: 0;
 left: 0px;
 right: 0px;
 height: 50px;
 align-items: center;
`;

const ConfirmBtn = styled.TouchableOpacity`
 width: 80%;
 height: 80%;
 justify-content: center;
 background-color: #3e50b4;
 border-radius: 5px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 16px;
`;

const Data = styled.View`
 margin-top: 0px;
 padding: 0px 0px;
`;
const Container = styled.View`
 flex: 1;
 flex-direction: column;
 align-items: flex-start;
`;

const DataName = styled.Text`
 color: #0d0d0d;
 opacity: 0.8;
 font-weight: bold;
 font-size: 20px;
 margin-left: 40px;
`;

const DataValue = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: #303030;
 opacity: 0.8;
 font-weight: 500;
 font-size: 14px;
`;

const DataValueBtn = styled.TouchableOpacity`
 width: ${(screenWidth * 3.2) / 4}px;
 border-width: 1px;
 border-radius: 5px;
 border-color: silver;
 padding: 10px;
 margin-top: 10px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DataValueBtnSec = styled.TouchableOpacity`
 width: ${(screenWidth * 3.2) / 4}px;
 border-width: 1px;
 border-radius: 5px;
 border-color: silver;
 padding: 10px;
 margin-top: 10px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DataValueRed = styled.Text`
 width: 200px;
 margin-left: 40px;
 margin-right: 40px;
 color: red;
 opacity: 0.8;
 font-weight: 500;
 border-radius: 10px;
`;
export default ({ navigation }) => {
 const goToHPA1 = () => {
  navigation.push("UserStep1HPA1");
 };
 const goToHPA2 = () => {
  navigation.push("UserStep1HPA2");
 };
 const goToHPA3 = () => {
  navigation.push("UserStep1HPA3");
 };
 const goToHPA4 = () => {
  navigation.push("UserStep1HPA4");
 };
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const getUserRegistInfo = useGetUserRegistInfo();
 const setUserRegistInfo = useSetUserRegistInfo();
 const confrimBtnClicked = async (userRegistInfoForm) => {
  const newValue = Object.assign({}, userRegistInfo, userRegistInfoForm);
  await setUserRegistInfo(newValue);
  navigation.navigate("UserStep2");
 };

 const { register, getValues, setValue, handleSubmit, errors } = useForm();

 const setValueWithState = async (fildNm, value) => {
  await setValue(fildNm, value);
  await setUserRegistInfoProp({ ...userRegistInfo, [fildNm]: value });
  await setUserRegistInfo({ ...userRegistInfo, [fildNm]: value });
 };
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  //console.log(data);
  setUserRegistInfoProp(data);
  setValue("userNm", data?.userNm);
  setValue("userBirthDate", data?.userBirthDate);
  setValue("userSex", data?.userSex);
  setValue("userHPAuthAgree", data?.userHPAuthAgree);
 };
 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   await fetchData();
  });
  fetchData();
  return unsubscribe;
 }, [navigation]);
 useEffect(() => {
  register(
   { name: "userNm" },
   {
    required: true,
   }
  );
  register(
   { name: "userBirthDate" },
   {
    minLength: 6,
    maxLength: 6,
    required: true,
   }
  );
  register(
   { name: "userSex" },
   {
    required: true,
    minLength: 1,
    maxLength: 1,
    validate: (value) => {
     if (value == 1 || value == 2) {
      return true;
     } else {
      return false;
     }
    },
   }
  );
  register({ name: "userHPAuthAgree" }, { required: true });
 }, [register]);
 useEffect(() => {}, []);
 return (
  <OuterContainer>
   <StatusBar barStyle="dark-content" backgroundColor="white" />
   <Modal>
    <ModalHeader>
     <TouchableOpacity
      style={{
       width: 40,
       height: 40,
       justifyContent: "center",
      }}
     ></TouchableOpacity>
     <ModalHeaderTitle>1/5</ModalHeaderTitle>
    </ModalHeader>
    <ScrollContainer
     loading={false}
     contentContainerStyle={{
      paddingBottom: 80,
      backgroundColor: "transparent",
      marginTop: 0,
      paddingTop: 0,
     }}
     refreshOn={false}
    >
     <Data style={{ width: screenWidth, height: screenHeight - 100 }}>
      <Container
       style={{ flex: 1, justifyContent: "flex-start", marginTop: 0 }}
      >
       <DataName>기본정보 입력</DataName>
       <FloatingLabelInput
        maxLength={6}
        label="이름 입력"
        placeholder="이름 입력"
        onChangeText={setValueWithState}
        fieldNm="userNm"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        defaultValue={userRegistInfo?.userNm}
       />
       {errors.userNm && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
         <FloatingLabelInput
          maxLength={6}
          keyboardType={"numeric"}
          label="주민등록번호"
          placeholder="주민등록번호"
          onChangeText={setValueWithState}
          fieldNm="userBirthDate"
          containerStyle={{
           marginLeft: 40,
           marginRight: 10,
          }}
          style={{
           color: "black",
           opacity: 0.8,
           fontWeight: 500,
           fontSize: 32,
           borderBottomWidth: 1,
          }}
          defaultValue={userRegistInfo?.userBirthDate}
         />
         {errors.userBirthDate?.type === "required" && (
          <DataValueRed>필수 값 입니다.</DataValueRed>
         )}
         {(errors.userBirthDate?.type === "maxLength" ||
          errors.userBirthDate?.type === "minLength") && (
          <DataValueRed>6자리를 입력해야합니다.</DataValueRed>
         )}
        </View>
        <View
         style={{
          paddingTop: 18,
          justifyContent: "flex-end",
         }}
        >
         <Text
          style={{
           paddingTop: 5,
           height: 35,
           fontSize: 32,
          }}
         >
          -
         </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
         <View style={{ flexDirection: "row" }}>
          <FloatingLabelInput
           maxLength={1}
           keyboardType={"numeric"}
           onChangeText={setValueWithState}
           fieldNm="userSex"
           containerStyle={{
            marginLeft: 10,
            marginRight: 0,
           }}
           style={{
            color: "black",
            opacity: 0.8,
            fontWeight: 500,
            fontSize: 32,
            borderBottomWidth: 1,
           }}
           defaultValue={userRegistInfo?.userSex}
          />
          <View style={{ justifyContent: "flex-end" }}>
           <Text
            style={{
             paddingTop: 3,
             height: 35,
             fontSize: 32,
             color: "silver",
            }}
           >
            ******
           </Text>
          </View>
         </View>
         {errors.userSex?.type === "required" && (
          <DataValueRed style={{ marginLeft: 0 }}>필수 값 입니다.</DataValueRed>
         )}
         {errors.userSex?.type === "maxLength" && (
          <DataValueRed style={{ marginLeft: 0 }}>
           1자리 수를 입력해야 합니다.
          </DataValueRed>
         )}
         {errors.userSex?.type === "validate" && (
          <DataValueRed style={{ marginLeft: 0 }}>
           1또는 2의 값이어야 합니다.
          </DataValueRed>
         )}
        </View>
       </View>
       <View style={{ flexDirection: "column" }}>
        <DataName style={{ marginTop: 30 }}>본인인증 동의</DataName>
        <DataValue>본인인증을 위한 약관에 동의</DataValue>
        <DataValueBtn
         onPress={() => {
          const userHPAuthAgreeTmp = getValues("userHPAuthAgree");
          if (!userHPAuthAgreeTmp) {
           setUserRegistInfoProp({ ...userRegistInfo, userHPAuthAgree: "Y" });
           setValue("userHPAuthAgree", "Y");
          } else {
           setUserRegistInfoProp({ ...userRegistInfo, userHPAuthAgree: null });
           setValue("userHPAuthAgree", null);
          }
         }}
         style={{
          borderColor:
           userRegistInfo?.userHPAuthAgree == "Y" ? "#3e50b4" : "grey",
         }}
        >
         <Text
          style={{
           color: userRegistInfo?.userHPAuthAgree == "Y" ? "#3e50b4" : "grey",
          }}
         >
          휴대폰 본인인증 동의(필수)
         </Text>
         <AntDesign
          name={"checkcircleo"}
          color={userRegistInfo?.userHPAuthAgree == "Y" ? "#3e50b4" : "grey"}
          size={22}
         />
        </DataValueBtn>
        {errors.userHPAuthAgree && (
         <DataValueRed>동의해야 진행할 수 있습니다.</DataValueRed>
        )}
        <DataValueBtnSec onPress={goToHPA1}>
         <Text>본인확인 서비스 이용약관(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
        <DataValueBtnSec onPress={goToHPA2}>
         <Text>개인정보 수집 이용(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
        <DataValueBtnSec onPress={goToHPA3}>
         <Text>고유식별정보 처리동의(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
        <DataValueBtnSec onPress={goToHPA4}>
         <Text>본인확인 통신사 이용약관(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
       </View>
      </Container>
     </Data>
    </ScrollContainer>

    <ModalFooter>
     <ConfirmBtn onPress={handleSubmit(confrimBtnClicked)}>
      <ConfirmBtnText>다음</ConfirmBtnText>
     </ConfirmBtn>
    </ModalFooter>
   </Modal>
  </OuterContainer>
 );
};
