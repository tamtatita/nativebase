import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LottieView
        style={{ height: 300, width: 300 }}
        source={require("@/assets/animation/Loading.json")}
        autoPlay
        loop
      />
      <Text className="font-extrabold text-3xl text-white">NextStep Jobs </Text>
    </View>
  );
};

export default StartPage;
