import React from "react";
import ScrollContainer from "../../components/ScrollContainer";
import * as rq from "react-query";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {Text, View, TouchableOpacity} from "react-native";
import TaxBillRow from "./TaxBillRow";
import {Entypo} from "@expo/vector-icons";

export default () => {
	const navigation = useNavigation();

	const [targetYear, setTargetYear] = React.useState(new Date().getFullYear());
	const targetYearRef = React.useRef();

	React.useEffect(() => {
		targetYearRef.current = targetYear;
		rq.queryCache.invalidateQueries("getMyDtstmnList");
	}, [targetYear]);

	const dataInfo = rq.useQuery(
		"getMyDtstmnList",
		async () => {
			const {data} = await axios.post("http://172.126.11.154:82/v2/trans/getTransList", {
				targetYear: targetYearRef.current,
			});
			return data;
		},
		{
			retry: 0,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {},
		}
	);
	return (
		<>
			<View style={{height: 56, backgroundColor: "#3e50b4", flexDirection: "row"}}>
				<TouchableOpacity
					onPress={() => {
						navigation.pop();
					}}
					style={{flex: 1, paddingLeft: 15, justifyContent: "center", borderRadius: 40}}
				>
					<Entypo name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<View style={{flex: 9, alignItems: "center", justifyContent: "center", paddingRight: 40, flexDirection: "row"}}>
					<TouchableOpacity
						onPress={() => {
							setTargetYear(targetYear - 1);
						}}
						style={{marginRight: 20}}
					>
						<Entypo name="triangle-left" size={24} color="white" />
					</TouchableOpacity>
					<View>
						<Text style={{color: "white", fontSize: 24}}>{targetYear}년</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							setTargetYear(targetYear + 1);
						}}
						style={{marginLeft: 20}}
					>
						<Entypo name="triangle-right" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollContainer loading={false} contentContainerStyle={{paddingTop: 20, backgroundColor: "white"}}>
				<View style={{paddingHorizontal: 20, flex: 1}}>
					<View style={{flexDirection: "row", borderBottomWidth: 3, borderBottomColor: "#efefef", paddingBottom: 20, justifyContent: "space-around"}}>
						<View>
							<Text style={{color: "black", fontWeight: "bold", fontSize: 15}}>발행날짜</Text>
						</View>
						<View>
							<Text style={{color: "black", fontWeight: "bold", fontSize: 15}}>공급받는자</Text>
						</View>
						<View>
							<Text style={{color: "black", fontWeight: "bold", fontSize: 15}}>세금계산서</Text>
						</View>
					</View>
					{dataInfo?.status === "success" && dataInfo?.data?.list.map((data, index) => <TaxBillRow key={index} data={data} />)}
				</View>
			</ScrollContainer>
		</>
	);
};
