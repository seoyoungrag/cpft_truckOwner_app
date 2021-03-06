import React, {useState, useEffect} from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import {useForm} from "react-hook-form";
import {AntDesign} from "@expo/vector-icons";
import {useGetUserRegistInfo, useSetUserRegistInfo} from "../../UserRegistContext";
import ScrollContainer from "../../components/ScrollContainer";
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
	color: black;
	font-size: 16px;
`;

const ModalFooter = styled.View`
	bottom: 0px;
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
	margin-top: 30px;
	color: black;
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
	border-radius: 10px;
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
	border-radius: 10px;
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
export default ({navigation, route}) => {
	const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
	const [company, setCompany] = useState("팀프플러스");
	const [tierCode, setTierCode] = useState(undefined);
	const {trigger, register, getValues, setValue, handleSubmit, errors} = useForm();
	const [userRegistInfo, setUserRegistInfoProp] = useState(null);
	const getUserRegistInfo = useGetUserRegistInfo();
	const setUserRegistInfo = useSetUserRegistInfo();
	const [response, setResponse] = useState({
		success: null,
		imp_uid: null,
		merchant_uid: null,
		error_msg: null,
	});

	const requestPHAuthNumber = async () => {
		const data = await getUserRegistInfo();
		const params = {
			merchant_uid: merchantUid,
		};
		if (company) {
			params.company = company;
		}
		if (data?.userNm) {
			params.name = data?.userNm;
		}
		if (data?.userPHNumber) {
			params.phone = data.userPHNumber;
		}
		const result = await trigger("userPHNumber");
		if (result) {
			navigation.navigate("PhoneCertificate", {params, tierCode});
		}
	};

	const goStep1 = () => {
		navigation.navigate("UserStep1");
	};
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
	const setValueWithState = async (fildNm, value) => {
		await setValue(fildNm, value);
		await setUserRegistInfoProp({...userRegistInfo, [fildNm]: value});
		await setUserRegistInfo({...userRegistInfo, [fildNm]: value});
	};
	const requestPHAuthNumberOld = () => {
		setValue("userPHAuthNumber", "123456");
		setUserRegistInfoProp({...userRegistInfo, userPHAuthNumber: "123456"});
		//setUserRegistInfoProp({...userRegistInfo, userPHAuthNumber: '123456'})
	};
	const confrimBtnClicked = async (userRegistInfoForm) => {
		userRegistInfoForm.userPHAuthNumber = undefined;
		console.log(userRegistInfo);
		const newValue = Object.assign({}, userRegistInfo, userRegistInfoForm);
		await setUserRegistInfo(newValue);
		console.log(newValue);
		if (response.success === true) {
			navigation.navigate("UserStep3");
		}
	};

	const fetchData = async () => {
		const data = await getUserRegistInfo();
		setUserRegistInfoProp(data);
		setValue("userPHAuthNumber", null);
		setValue("userPHNumber", data?.userPHNumber);
		setValue("userPHAuthNumber", data?.userPHAuthNumber);
		setValue("userServiceAuthAgree", data?.userServiceAuthAgree);
	};
	useEffect(() => {
		register(
			{name: "userPHNumber"},
			{
				minLength: 13,
				maxLength: 13,
				required: true,
			}
		);
		register(
			{name: "userPHAuthNumber"},
			{
				minLength: 6,
				maxLength: 6,
				required: false,
			}
		);
		register(
			{name: "userServiceAuthAgree"},
			{
				required: true,
			}
		);
	}, [register]);
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			await fetchData();
		});
		fetchData();
		const crtResponse = route?.params?.response;
		if (crtResponse) {
			setResponse(crtResponse);
		}
		return unsubscribe;
	}, [navigation]);
	return (
		<OuterContainer>
			<Modal>
				<ModalHeader>
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							justifyContent: "center",
						}}
						onPress={goStep1}
					>
						<AntDesign name={"arrowleft"} color={"#606060"} size={24} />
					</TouchableOpacity>
					<ModalHeaderTitle>2/5</ModalHeaderTitle>
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
					<Data style={{width: screenWidth, height: screenHeight - 100}}>
						<Container style={{flex: 1, justifyContent: "flex-start", marginTop: 0}}>
							<DataName style={{marginTop: 0}}>휴대폰 인증</DataName>
							<View style={{flexDirection: "column"}}>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "flex-end",
									}}
								>
									{/*}
         <Picker
          selectedValue={userRegistInfo?.userPHType}
          style={{
           height: 40,
           width: 100,
           marginLeft: 40,
           paddingLeft: 0,
           paddingTop: 0,
          }}
          onValueChange={(itemValue, itemIndex) =>
           setUserRegistInfoProp({ ...userRegistInfo, userPHType: itemValue })
          }
          itemStyle={{
           backgroundColor: "grey",
           color: "blue",
           fontFamily: "Ebrima",
           fontSize: 17,
          }}
         >
          <Picker.Item label="SKT" value="SKT" />
          <Picker.Item label="KT" value="KT" />
          <Picker.Item label="LGT" value="LGT" />
         </Picker>
        */}
									<FloatingLabelInput
										maxLength={13}
										keyboardType={"phone-pad"}
										label="휴대폰 번호 입력"
										placeholder="휴대폰 번호 입력"
										onChangeText={setValueWithState}
										fieldNm="userPHNumber"
										containerStyle={{
											marginLeft: 40,
											height: 50,
											margin: 0,
										}}
										style={{
											color: "black",
											opacity: 0.8,
											fontWeight: 500,
											fontSize: 32,
											borderBottomWidth: 1,
										}}
										defaultValue={userRegistInfo?.userPHNumber}
									/>
									<TouchableOpacity
										style={{
											marginTop: 5,
											marginRight: 10,
											height: 30,
											width: 90,
											marginLeft: 40,
											paddingLeft: 0,
											paddingTop: 0,
											borderWidth: 1,
											borderRadius: 5,
											borderColor: "#3e50b4",
											color: "black",
											opacity: 0.8,
											fontWeight: 500,
											fontSize: 14,
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
											justifyContent: "center",
										}}
										onPress={requestPHAuthNumber}
									>
										<Text style={{color: "#3e50b4"}}>본인인증 받기</Text>
									</TouchableOpacity>
								</View>
							</View>
							{errors.userPHNumber?.type === "required" && <DataValueRed>필수 값 입니다.</DataValueRed>}
							{(errors.userPHNumber?.type === "maxLength" || errors.userPHNumber?.type === "minLength") && <DataValueRed>올바르지 않은 휴대폰 번호입니다.</DataValueRed>}
							{/*
        <View style={{ flexDirection: "column" }}>
         <View
          style={{
           marginLeft: 40,
           flexDirection: "row",
           justifyContent: "flex-end",
           alignItems: "flex-end",
          }}
         >
          <FloatingLabelInput
           maxLength={6}
           keyboardType={"numeric"}
           label="인증번호 입력"
           placeholder="인증번호 입력"
           onChangeText={setValueWithState}
           fieldNm="userPHAuthNumber"
           containerStyle={{
            height: 50,
            margin: 0,
           }}
           style={{
            color: "black",
            opacity: 0.8,
            fontWeight: 500,
            fontSize: 32,
            borderBottomWidth: 1,
           }}
          /><TextInput
          maxLength={6}
          keyboardType={"numeric"}
          placeholder="인증번호 입력"
          editable={false}
          style={{
           color: "black",
           opacity: 0.8,
           fontSize: 20,
           borderBottomWidth: 1,
           height: 30,
           color: "#000",
           borderBottomColor: "#555",
          }}
          value={userRegistInfo?.userPHAuthNumber}
         />
          <TouchableOpacity
           style={{
            height: 35,
            width: 100,
            marginLeft: 20,
            paddingLeft: 0,
            paddingTop: 0,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "silver",
            color: verificationId ? "black" : "white",
            opacity: 0.8,
            fontWeight: 500,
            fontSize: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            justifyContent: "center",
           }}
           disabled={verificationId ? false : true}
           onPress={confirmCode}
          >
           <Text>인증번호 체크</Text>
          </TouchableOpacity>
         </View>
        </View>
       */}
							{errors.userPHAuthNumber?.type === "required" && <DataValueRed>필수 값 입니다.</DataValueRed>}
							{(errors.userPHAuthNumber?.type === "maxLength" || errors.userPHAuthNumber?.type === "minLength") && (
								<DataValueRed>올바르지 않은 인증 번호입니다.</DataValueRed>
							)}
							{response.success === null && <DataValueRed>본인인증을 해주세요.</DataValueRed>}
							{response.success === true && <DataValueRed style={{color: "#3e50b4"}}>본인인증을 성공했습니다.</DataValueRed>}
							{response.success === false && <DataValueRed>본인인증을 실패했습니다.</DataValueRed>}
							<View style={{flexDirection: "column"}}>
								<DataName>이용약관 동의</DataName>
								<DataValue>앱 서비스 이용을 위한 약관에 동의</DataValue>
								<DataValueBtn
									onPress={() => {
										const userServiceAuthAgreeTmp = getValues("userServiceAuthAgree");
										if (!userServiceAuthAgreeTmp) {
											setUserRegistInfoProp({
												...userRegistInfo,
												userServiceAuthAgree: "Y",
											});

											setValue("userServiceAuthAgree", "Y");
										} else {
											setUserRegistInfoProp({
												...userRegistInfo,
												userServiceAuthAgree: null,
											});

											setValue("userServiceAuthAgree", null);
										}
									}}
									style={{
										borderColor: userRegistInfo?.userServiceAuthAgree == "Y" ? "#3e50b4" : "grey",
									}}
								>
									<Text
										style={{
											color: userRegistInfo?.userServiceAuthAgree == "Y" ? "#3e50b4" : "grey",
										}}
									>
										앱 서비스 이용 동의(필수)
									</Text>
									<AntDesign name={"checkcircleo"} color={userRegistInfo?.userServiceAuthAgree == "Y" ? "#3e50b4" : "grey"} size={22} />
								</DataValueBtn>
								{errors.userServiceAuthAgree && <DataValueRed>동의해야 진행할 수 있습니다.</DataValueRed>}
								{/**
        <DataValueBtnSec onPress={goToHPA1}>
         <Text>앱 서비스 이용 동의(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
        <DataValueBtnSec onPress={goToHPA2}>
         <Text>앱 서비스 이용 동의(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
        <DataValueBtnSec onPress={goToHPA3}>
         <Text>앱 서비스 이용 동의(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
        <DataValueBtnSec onPress={goToHPA4}>
         <Text>앱 서비스 이용 동의(필수)</Text>
         <AntDesign name={"right"} color={"grey"} size={22} />
        </DataValueBtnSec>
         */}
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
