import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton, InputLabel } from "@/components/ui";
import { Dropdown } from "react-native-element-dropdown";
import { Checkbox, List, Slider } from "@ant-design/react-native";
import "react-native-gesture-handler";
const FilterPage = () => {
  const [state, setState] = useState({
    location: "",
    salary: [],
    workingModel: "",
    experience: "",
    jobType: [],
  });

  const locations = [
    { label: "Hồ Chí Minh", value: "hochiminh" },
    { label: "Hà Nội", value: "hanoi" },
    { label: "Đà Nẵng", value: "danang" },
    { label: "Others", value: "others" },
  ];
  const working = [
    { label: "Full-time", value: "fulltime" },
    { label: "Part-time", value: "parttime" },
    { label: "Remote", value: "remote" },
    { label: "Internship", value: "internship" },
  ];

  const experiences = [
    { label: "Fresher", value: "fresher" },
    { label: "Junior", value: "junior" },
    { label: "Senior", value: "senior" },
    { label: "Others", value: "others" },
  ];

  const jobTitle = [
    { label: "Frontend Developer", value: "frontend" },
    { label: "Backend Developer", value: "backend" },
    { label: "Full-stack Developer", value: "fullstack" },
    { label: "Mobile Developer", value: "mobile" },
    { label: "UI/UX Designer", value: "uiux" },
    { label: "Data Scientist", value: "data" },
    { label: "Others", value: "others" },
  ];
  const RenderHeader = useCallback(() => {
    return (
      <View>
        <SafeAreaView />
        <View className="flex items-center justify-between flex-row">
          <IconButton type="back" size="small" />
          <Text className="font-bold text-lg">Filter</Text>
          <Text className="opacity-0">gewjjjjjjjjjj</Text>
        </View>
      </View>
    );
  }, []);
  const marks = {
    0: 1,
    20: 10,
    40: 20,
    60: 30,
    80: 40,
    100: 50,
  };
  const CheckboxItem = Checkbox.CheckboxItem;

  const RenderBody = useCallback(() => {
    return (
      <View className="flex gap-y-4 flex-col">
        <View>
          <InputLabel title="Location" />
          <Dropdown
            className="bg-gray-100 p-3 rounded-md"
            labelField={"label"}
            valueField={"value"}
            data={locations}
            value={state.location[0]}
            onChange={(value) => setState({ ...state, location: value })}
          />
        </View>
        <View>
          <InputLabel title="Salary" />
          <View className="flex flex-row ">
            <List style={{ width: "100%" }}>
              <List.Item>
                <Slider marks={marks} ticks range defaultValue={[1, 10]} />
              </List.Item>
            </List>
          </View>
        </View>
        <View>
          <InputLabel title="Working Model" />
          <View className="flex items-center flex-row my-2">
            <FlashList
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={1}
              horizontal
              data={working}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-2 rounded-full bg-gray-100 mr-4"
                  onPress={() =>
                    setState({ ...state, workingModel: item.value })
                  }
                >
                  <Text className="font-semibold text-[15px]">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View>
          <InputLabel title="Experience" />
          <View className="flex items-center flex-row my-2">
            <FlashList
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={1}
              horizontal
              data={experiences}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-2 rounded-full bg-gray-100 mr-4"
                  onPress={() =>
                    setState({ ...state, workingModel: item.value })
                  }
                >
                  <Text className="font-semibold text-[15px]">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View>
          <InputLabel title="Job Title" />
          <List>
            {jobTitle?.map((item) => (
              <CheckboxItem key={item.value}>{item?.label}</CheckboxItem>
            ))}
          </List>
        </View>
      </View>
    );
  }, []);
  return (
    <View className="bg-white p-5 flex-1">
      <FlashList
        estimatedItemSize={1}
        ListHeaderComponent={() => (
          <>
            <RenderHeader />

            <RenderBody />
          </>
        )}
      />

      <View className="flex items-center h-[100px] justify-center">
        <View className="flex items-center gap-x-2 justify-between flex-row">
          <TouchableOpacity
            className="bg-gray-200  w-[48%] py-4 rounded-xl"
            onPress={() => {}}
          >
            <Text className="text-primary text-[16px] text-center font-semibold">
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary w-[48%] py-4 rounded-xl"
            onPress={() => {}}
          >
            <Text className="text-white text-[16px] text-center font-semibold">
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FilterPage;

const styles = StyleSheet.create({});
