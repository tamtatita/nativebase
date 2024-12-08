import { SafeAreaView, Text, View } from "react-native";
import React, { memo } from "react";

import { IconButton } from "../ui";

function JobAppliedHeader() {
  return (
    <View>
      <SafeAreaView />
      <View className="flex-row flex items-center justify-between  p-5 ">
        <IconButton type="back" />
        <Text className="text-lg font-bold text-slate-700 ">Applied Jobs</Text>
        <Text className="text-lg font-bold text-slate-700 opacity-0 ">ABC</Text>
      </View>
    </View>
  );
}

export default memo(JobAppliedHeader);
