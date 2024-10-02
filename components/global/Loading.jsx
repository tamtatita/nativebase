import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

const Loading = () => {
  return (
    <View className="flex-1 items-center flex justify-center">
      <LottieView
        style={{ height: 300, width: 300 }}
        source={require("@/assets/animation/Loading.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
