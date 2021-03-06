import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
 console.log("Message handled in the background!", remoteMessage);
});
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["No task registered for key"]);
YellowBox.ignoreWarnings(['Setting a timer']);

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
