import React, {
 useState,
 useEffect,
 useLayoutEffect,
 useCallback,
} from "react";
import styled from "styled-components/native";
import { CheckBox, Dimensions, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import List from "../../components/List";
import { code, trimText } from "../../utils";
import { useIsModal, useSetIsModalProp } from "../../ModalContext";
import { useNavigation } from "@react-navigation/native";
import { useCodes } from "../../CodeContext";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const SliderContainer = styled.View`
 width: 100%;
 height: ${HEIGHT / 4}px;
 margin-bottom: 40px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View``;

const FilterContainer = styled.View`
 flex: 1;
 background-color: red;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 background-color: transparent;
 margin-bottom: 15px;
`;
const FilterHeader = styled.View`
 flex: ${(WIDTH * 1) / 6}px;
 padding-left: 15px;
 padding-top: 15px;
 justify-content: flex-start;
 align-items: flex-start;
 background-color: white;
`;

const FilterBody = styled.View`
 flex: 1;
 flex-direction: row;
`;

const ModalBody = styled.View`
 background-color: white;
 align-items: center;
 flex: 1;
`;

const FilterParentBtn = styled.TouchableOpacity`
 flex: 1;
 border-width: 1px;
 margin-left: 10px;
 margin-right: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 border-radius: 10px;
`;

const FilterBtnList = styled.View`
 flex: 1;
 flex-flow: row;
 flex-wrap: wrap;
 justify-content: flex-start;
 align-content: space-between;
 align-items: stretch;
 flex: ${(WIDTH * 5) / 6}px;
 border-top-width: 0.9px;
 padding-bottom: 15px;
 border-bottom-width: 0.5px;
 border-color: grey;
`;

const FilterBtn = styled.TouchableOpacity`
 width: ${((WIDTH * 5) / 6 - 15 * 6) / 3}px;
 margin-top: 15px;
 margin-left: 15px;
 margin-right: 15px;
 border-width: 1px;
 border-radius: 10px;
 text-align: center;
 font-size: 16px;
 align-items: center;
 justify-content: center;
`;

const FilterBottomButtons = styled.View`
 flex-direction: row;
 justify-content: space-around;
`;

const FilterBottomButton = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 height: 50px;
`;
const FilterBottomButtonText = styled.Text`
 color: white;
 font-size: 24px;
`;

const FilterBottomButtonCancel = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: whitesmoke;
 height: 50px;
`;
const filter = (codes, navigation) => {
 const [dayPicking, setDayPicking] = useState(false);
 const [filterBtnSelected1, setFilterBtnSelected1] = useState([]);
 const [filterBtnSelectedAll1, setFilterBtnSelectedAll1] = useState(false);
 const [filterBtnSelected2, setFilterBtnSelected2] = useState([]);
 const [filterBtnSelectedAll2, setFilterBtnSelectedAll2] = useState(false);
 const [filterBtnSelected3, setFilterBtnSelected3] = useState([]);
 const [filterBtnSelectedAll3, setFilterBtnSelectedAll3] = useState(false);
 const [filterBtnSelected4, setFilterBtnSelected4] = useState([]);
 const [filterBtnSelectedAll4, setFilterBtnSelectedAll4] = useState(false);
 const [filterBtnSelected5, setFilterBtnSelected5] = useState([]);
 const [filterBtnSelectedAll5, setFilterBtnSelectedAll5] = useState(false);
 const [filterBtnSelected6, setFilterBtnSelected6] = useState([]);
 const [filterBtnSelectedAll6, setFilterBtnSelectedAll6] = useState(false);
 const [filterBtnSelected7, setFilterBtnSelected7] = useState([]);
 const [filterBtnSelectedAll7, setFilterBtnSelectedAll7] = useState(false);
 const [filterBtnSelected8, setFilterBtnSelected8] = useState([]);
 const [filterBtnSelectedAll8, setFilterBtnSelectedAll8] = useState(false);
 const dayChecking = () => {};
 return (
  <FilterContainer>
   <FilterBody>
    <FilterHeader>
     <Text>모집유형</Text>
    </FilterHeader>
    <FilterBtnList>
     <FilterBtn
      activeOpacity={1}
      style={{
       borderColor: filterBtnSelectedAll2 ? "#3e50b4" : "grey",
      }}
      onPress={() => {
       setFilterBtnSelectedAll2(true);
       setFilterBtnSelected2([]);
      }}
     >
      <Text>전체</Text>
     </FilterBtn>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "모집유형" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected2.includes(code.code)
           ? "#3e50b4"
           : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelectedAll2(false);
          if (
           filterBtnSelected2.length > 1 &&
           filterBtnSelected2.includes(cd)
          ) {
           var arr = filterBtnSelected2.filter((item) => item !== cd);
           setFilterBtnSelected2(arr);
          } else if (!filterBtnSelected2.includes(cd)) {
           setFilterBtnSelected2([...filterBtnSelected2, cd]);
          }
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader>
     <Text>지역</Text>
    </FilterHeader>
    <FilterBtnList>
     <FilterBtn
      activeOpacity={1}
      style={{
       borderColor: filterBtnSelectedAll1 ? "#3e50b4" : "grey",
      }}
      onPress={() => {
       setFilterBtnSelectedAll1(true);
       setFilterBtnSelected1([]);
      }}
     >
      <Text>전체</Text>
     </FilterBtn>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "지역" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected1.includes(code.code)
           ? "#3e50b4"
           : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelectedAll1(false);
          if (
           filterBtnSelected1.length > 1 &&
           filterBtnSelected1.includes(cd)
          ) {
           var arr = filterBtnSelected1.filter((item) => item !== cd);
           setFilterBtnSelected1(arr);
          } else if (!filterBtnSelected1.includes(cd)) {
           setFilterBtnSelected1([...filterBtnSelected1, cd]);
          }
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader>
     <Text>차종</Text>
    </FilterHeader>
    <FilterBtnList>
     <FilterBtn
      activeOpacity={1}
      style={{
       borderColor: filterBtnSelectedAll3 ? "#3e50b4" : "grey",
      }}
      onPress={() => {
       setFilterBtnSelectedAll3(true);
       setFilterBtnSelected3([]);
      }}
     >
      <Text>전체</Text>
     </FilterBtn>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "차종" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected4.includes(code.code)
           ? "#3e50b4"
           : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelectedAll4(false);
          if (
           filterBtnSelected4.length > 1 &&
           filterBtnSelected4.includes(cd)
          ) {
           var arr = filterBtnSelected4.filter((item) => item !== cd);
           setFilterBtnSelected4(arr);
          } else if (!filterBtnSelected4.includes(cd)) {
           setFilterBtnSelected4([...filterBtnSelected4, cd]);
          }
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader>
     <Text>톤수</Text>
    </FilterHeader>
    <FilterBtnList>
     <FilterBtn
      activeOpacity={1}
      style={{
       borderColor: filterBtnSelectedAll3 ? "#3e50b4" : "grey",
      }}
      onPress={() => {
       setFilterBtnSelectedAll3(true);
       setFilterBtnSelected3([]);
      }}
     >
      <Text>전체</Text>
     </FilterBtn>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "톤수" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected3.includes(code.code)
           ? "#3e50b4"
           : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelectedAll3(false);
          if (
           filterBtnSelected3.length > 1 &&
           filterBtnSelected3.includes(cd)
          ) {
           var arr = filterBtnSelected3.filter((item) => item !== cd);
           setFilterBtnSelected3(arr);
          } else if (!filterBtnSelected3.includes(cd)) {
           setFilterBtnSelected3([...filterBtnSelected3, cd]);
          }
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader>
     <Text>급여</Text>
    </FilterHeader>
    <FilterBtnList>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "급여" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected4 == code.code ? "#3e50b4" : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelected4(cd);
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader>
     <Text>완/무제</Text>
    </FilterHeader>
    <FilterBtnList>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "완제/무제" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected8 == code.code ? "#3e50b4" : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelected8(cd);
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader>
     <Text>근무요일</Text>
    </FilterHeader>
    <FilterBtnList style={{ borderBottomWidth: 0 }}>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "근무요일" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected5 == code.code ? "#3e50b4" : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelected5(cd);
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
   <FilterBody>
    <FilterHeader></FilterHeader>
    <FilterBtnList
     style={{ borderTopWidth: 0, borderBottomWidth: 0, paddingBottom: 0 }}
    >
     <View
      style={{
       flex: 1,
       flexDirection: "row",
       alignItems: "center",
       alignSelf: "flex-start",
       paddingLeft: 15,
      }}
     >
      <CheckBox
       value={dayPicking}
       onValueChange={() => {
        setDayPicking(!dayPicking);
       }}
      />
      <Text>직접 선택</Text>
     </View>
    </FilterBtnList>
   </FilterBody>
   {dayPicking ? (
    <FilterBody>
     <FilterHeader>
      <Text></Text>
     </FilterHeader>
     <FilterBtnList style={{ borderTopWidth: 0 }}>
      {codes.map((code) => {
       return (
        code.codeCtgryNm === "요일" && (
         <FilterBtn
          activeOpacity={1}
          style={{
           borderColor: filterBtnSelected6.includes(code.code)
            ? "#3e50b4"
            : "grey",
          }}
          key={code.code}
          onPress={() => {
           var cd = `${code.code}`;
           setFilterBtnSelectedAll6(false);
           if (
            filterBtnSelected6.length > 1 &&
            filterBtnSelected6.includes(cd)
           ) {
            var arr = filterBtnSelected6.filter((item) => item !== cd);
            setFilterBtnSelected6(arr);
           } else if (!filterBtnSelected6.includes(cd)) {
            setFilterBtnSelected6([...filterBtnSelected6, cd]);
           }
          }}
         >
          <Text>{code.codeValue}</Text>
         </FilterBtn>
        )
       );
      })}
     </FilterBtnList>
    </FilterBody>
   ) : null}
   <FilterBody>
    <FilterHeader>
     <Text>근무시간</Text>
    </FilterHeader>
    <FilterBtnList>
     {codes.map((code) => {
      return (
       code.codeCtgryNm === "근무시간" && (
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelected7 == code.code ? "#3e50b4" : "grey",
         }}
         key={code.code}
         onPress={() => {
          var cd = `${code.code}`;
          setFilterBtnSelected7(cd);
         }}
        >
         <Text>{code.codeValue}</Text>
        </FilterBtn>
       )
      );
     })}
    </FilterBtnList>
   </FilterBody>
  </FilterContainer>
 );
};

export default ({ refreshFn, loading }) => {
 const codes = useCodes();
 const navigation = useNavigation();
 const Filter = filter(codes, navigation);
 return (
  <>
   <ScrollContainer
    refreshOn={false}
    loading={false}
    contentContainerStyle={{
     backgroundColor: "white",
    }}
   >
    {Filter}
   </ScrollContainer>
   <FilterBottomButtons>
    <FilterBottomButtonCancel onPress={() => {}}>
     <Text style={{ fontSize: 24 }}>취소</Text>
    </FilterBottomButtonCancel>
    <FilterBottomButton onPress={() => {}}>
     <FilterBottomButtonText>확인</FilterBottomButtonText>
    </FilterBottomButton>
   </FilterBottomButtons>
  </>
 );
};
