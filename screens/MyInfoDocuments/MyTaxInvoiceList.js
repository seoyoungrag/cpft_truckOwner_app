import React from "react";
import styled from "styled-components";
import ScrollContainer from "../../components/ScrollContainer";
import MyDocumentListRow from "../../components/MyDocumentListRow";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
 justify-content: center;
 align-items: center;
 flex: 1;
`;

const Text = styled.Text``;

const DataBottomBtn = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: #3a99fc;
 border-color: white;
`;

export default () => {
 const navigation = useNavigation();
 return (
  <ScrollContainer
   contentContainerStyle={{ paddingTop: 20, backgroundColor: "white" }}
  >
   <MyDocumentListRow
    title="2020년 7월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("TaxInvoice", {
        mgtKey: "7a7a2bg97o2w8oei93j5d18n",
       });
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 6월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("TaxInvoice", {
        mgtKey: "7a7a2bg97o2w8oei93j5d18n",
       });
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 5월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("TaxInvoice", {
        mgtKey: "7a7a2bg97o2w8oei93j5d18n",
       });
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 4월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("TaxInvoice", {
        mgtKey: "7a7a2bg97o2w8oei93j5d18n",
       });
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 3월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("TaxInvoice", {
        mgtKey: "7a7a2bg97o2w8oei93j5d18n",
       });
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 2월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("TaxInvoice", {
        mgtKey: "7a7a2bg97o2w8oei93j5d18n",
       });
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
     </DataBottomBtn>
    }
   />
  </ScrollContainer>
 );
};