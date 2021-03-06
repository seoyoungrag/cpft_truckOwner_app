import React, {useState, useEffect} from "react";
import {Dimensions, TouchableOpacity, Alert, View} from "react-native";
import styled from "styled-components/native";
import {AntDesign} from "@expo/vector-icons";
import {useGetUserRegistInfo, useSetUserRegistInfo} from "../../UserRegistContext";
import PatternLockContianer from "./PatternLock/PatternLockContianer";

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
	color: #303030;
	font-size: 16px;
`;

const ModalFooter = styled.View`
	position: absolute;
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

const DataValueRed = styled.Text`
	width: 80%;
	margin-left: 40px;
	margin-right: 40px;
	color: #3e50b4;
	opacity: 0.8;
	font-weight: bold;
	font-size: 18px;
	border-radius: 10px;
	text-align: center;
`;
export default ({navigation}) => {
	const [userPattern, setUserPattern] = useState(null);
	const onMatchedPattern = (pattern) => {
		setUserPattern(pattern);
	};

	const goStep2 = () => {
		navigation.navigate("UserStep2");
	};
	const [userRegistInfo, setUserRegistInfoProp] = useState(null);
	const getUserRegistInfo = useGetUserRegistInfo();
	const setUserRegistInfo = useSetUserRegistInfo();

	const fetchData = async () => {
		//console.log("fetch!");
		const data = await getUserRegistInfo();
		setUserRegistInfoProp(data);
	};
	const confrimBtnClicked = async () => {
		if (!userPattern) {
			Alert.alert("", "패스워드 설정이 필요합니다.", [{text: "OK"}], {
				cancelable: false,
			});
		} else {
			const data = await getUserRegistInfo();
			const newValue = Object.assign({}, data, {userPattern: userPattern});
			await setUserRegistInfo(newValue);
			navigation.navigate("UserStep5");
		}
	};
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			await fetchData();
		});
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
						onPress={goStep2}
					>
						<AntDesign name={"arrowleft"} color={"#303030"} size={24} />
					</TouchableOpacity>
					<ModalHeaderTitle>2/4</ModalHeaderTitle>
				</ModalHeader>
				<View
					style={{
						paddingBottom: 80,
						backgroundColor: "transparent",
						marginTop: 0,
						paddingTop: 0,
					}}
				>
					<Data style={{width: screenWidth, height: screenHeight - 100}}>
						<DataName>잠금패턴 설정</DataName>
						<DataValue>앱 잠금패턴을 설정해주세요.</DataValue>
						{!userPattern ? (
							userRegistInfo ? (
								<View style={{flex: 1}}>
									<PatternLockContianer onMatchedPattern={onMatchedPattern} />
								</View>
							) : null
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<DataValueRed>앱 잠금패턴 설정이 완료되었습니다.</DataValueRed>
							</View>
						)}
					</Data>
				</View>

				<ModalFooter>
					<ConfirmBtn onPress={confrimBtnClicked}>
						<ConfirmBtnText>다음</ConfirmBtnText>
					</ConfirmBtn>
				</ModalFooter>
			</Modal>
		</OuterContainer>
	);
};
