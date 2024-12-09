import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { MODULE_JOBDETAIL, setSelectedTab } from "../../store/jobdetail";

function JobDetailTab() {
  const { selectedTab } = useSelector((state) => state[MODULE_JOBDETAIL]);
  const tabs = ["About", "Company", "Applicants"];

  const dispatch = useDispatch();

  return (
    <View className="flex flex-row items-center justify-between mt-5  gap-x-3 border-b-[1px] border-gray-300">
      {tabs.map((item) => (
        <TouchableOpacity
          onPress={() => dispatch(setSelectedTab(item))}
          style={{
            borderBottomWidth: 4,
            borderBottomColor:
              item === selectedTab ? Colors.primary : "transparent",
          }}
          className="w-[calc(93%/3)]  text-center flex items-center justify-center p-3"
          key={item}
        >
          <View>
            <Text
              className={`${
                item === selectedTab ? "text-primary" : "text-slate-700"
              } font-semibold`}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default JobDetailTab;
