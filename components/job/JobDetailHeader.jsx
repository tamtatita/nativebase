import { SafeAreaView, View } from "react-native";
import { IconButton } from "@/components/ui";
import { memo } from "react";

function JobDetailHeader() {
  return (
    <View className="p-5">
      <SafeAreaView />
      <View className="flex flex-row items-center justify-between">
        <IconButton type="back" />

        {/* <View
          style={{ display: "flex" }}
          className="flex flex-row items-center gap-2"
        >
          <IconButton
            shape="circle"
            color="white"
            size="small"
            classNames="rounded-full"
            icon={<Ionicons name="bookmark-outline" size={24} color="black" />}
          />
          
          <IconButton
            shape="circle"
            color="white"
            size="small"
            classNames="rounded-full"
            icon={<AntDesign name="sharealt" size={24} color="black" />}
          />
        </View> */}
      </View>
    </View>
  );
}

export default memo(JobDetailHeader);
