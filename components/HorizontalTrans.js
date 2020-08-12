import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { trimText, formatDate, code } from "../utils";
import { useIsModal, useSetIsModalProp } from "../ModalContext";

const Container = styled.View`
 flex: 1;
 /*padding: 0px 30px;*/
 margin-bottom: 15px;
 align-items: flex-start;
`;

const Data = styled.View`
 flex: 1;
 align-items: flex-start;
 border-width: 1px;
 padding: 10px;
 margin: 5px;
`;

const CarrierNm = styled.Text`
 flex: 1;
 text-align: left;
 font-size: 20px;
`;
const OpratSctn = styled.Text`
 flex: 1;
 text-align: left;
 font-size: 20px;
`;

const RcritType = styled.Text`
 flex: 1;
 text-align: right;
 align-self: flex-end;
 padding-right: 10px;
`;

const TransProgress = styled.View`
 flex: 1;
 width: 100%;
 padding-horizontal: 15px;
 justify-content: space-between;
 flex-direction: row;
 font-size: 18px;
`;

const WorkingArea = styled.Text`
 flex: 1;
 text-align: left;
`;

const TonType = styled.Text`
 text-align: left;
`;
const CarType = styled.Text`
 text-align: left;
 padding-left: 5px;
`;
const DlvyPrdlst = styled.Text`
 flex: 1;
 text-align: left;
`;
const PayAmt = styled.Text`
 flex: 1;
 text-align: right;
 font-size: 20px;
`;
const PayFullType = styled.Text`
 padding-left: 5px;
 font-size: 20px;
`;

const DataHeader = styled.View`
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-start;
 margin-bottom: 5px;
`;

const DataBody = styled.View`
 flex: 1;
 flex-direction: column;
`;

const DataBottom = styled.View`
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-end;
 margin-top: 5px;
`;

const CarInfo = styled.View`
 flex: 1;
 flex-direction: row;
`;
const PayInfo = styled.View`
 flex: 1;
 flex-direction: row;
`;

const DataBottomBtn = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: #3a99fc;
 border-color: white;
 height: 50px;
`;

const Horizontal = ({
 id,
 opratSctn,
 rcritType,
 workingArea,
 carTypes,
 tonType,
 dlvyPrdlst,
 payAmt,
 payFullType,
 goToTransDetail,
}) => {
 const navigation = useNavigation();
 const goToDetail = () => {
  navigation.navigate("Detail", {
   isTv,
   id,
   title,
   poster,
   overview,
   releaseDate,
  });
 };
 return (
  <TouchableOpacity
   disabled={useIsModal()}
   style={{ width: "100%" }}
   onPress={goToTransDetail}
  >
   <Container>
    <RcritType>{rcritType}</RcritType>
    <Data>
     <DataHeader>
      <CarrierNm>팀프레시</CarrierNm>
      <PayInfo>
       <PayAmt>{payAmt}</PayAmt>
       <PayFullType>{payFullType}</PayFullType>
      </PayInfo>
     </DataHeader>
     <DataBody>
      <OpratSctn>{opratSctn}</OpratSctn>
      <WorkingArea>
       {workingArea.split(" ").slice(0, 2).join(" ")} 배송
      </WorkingArea>
     </DataBody>
     <DataBottom>
      <DataBottomBtn onPress={() => {}}>
       <Text style={{ fontSize: 24, color: "white" }}>명세서</Text>
      </DataBottomBtn>
      <DataBottomBtn
       onPress={() => {
        Alert.alert(
         "문의완료!",
         "문의가 완료되었습니다.",
         [{ text: "네", onPress: () => {} }],
         { cancelable: false }
        );
       }}
      >
       <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
      </DataBottomBtn>
     </DataBottom>
    </Data>
    <TransProgress>
     <Text style={{ textAlignVertical: "center" }}>
      명세서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="#3a99fc" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="#3a99fc" />{" "}
      <Entypo name="dot-single" size={18} color="#3a99fc" />{" "}
      <Entypo name="dot-single" size={18} color="#3a99fc" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      세금계산서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="#3a99fc" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      입금대기{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
    </TransProgress>
   </Container>
  </TouchableOpacity>
 );
};

Horizontal.propTypes = {
 id: PropTypes.string.isRequired,
 opratSctn: PropTypes.string.isRequired,
 workingArea: PropTypes.string.isRequired,
 rcritType: PropTypes.string.isRequired,
 carTypes: PropTypes.array.isRequired,
 tonType: PropTypes.string.isRequired,
 dlvyPrdlst: PropTypes.string.isRequired,
 payAmt: PropTypes.string.isRequired,
 payFullType: PropTypes.string.isRequired,
};
export default Horizontal;
