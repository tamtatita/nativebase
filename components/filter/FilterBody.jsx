import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { InputLabel } from "@/components/ui";
import { Checkbox, List } from "@ant-design/react-native";
import "react-native-gesture-handler";
import {
  addJobTitle,
  MODULE_SEARCH,
  removeJobTitle,
  setMaxRange,
  setMinRange,
  setSelectedExperience,
  setSelectedJobType,
  setSelectedWorkingModel,
  sortSalaryRange,
  setApplyToSelected,
} from "../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "expo-router";

function FilterBody() {
  const {
    workingModels,
    experiences,
    jobTitles,
    jobTypes,
    salaryRange,
    selectedExperience,
    selectedJobTitles,
    selectedJobType,
    selectedWorkingModel,
  } = useSelector((state) => state[MODULE_SEARCH]);

  const dispatch = useDispatch();

  const handleCheckJobTitle = (checked, item) => {
    if (checked) {
      dispatch(addJobTitle(item));
    } else {
      dispatch(removeJobTitle({ Id: item.Id }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setApplyToSelected());
    }, [dispatch])
  );

  return (
    <View className="flex gap-y-4 flex-col">
      <View className="flex flex-row gap-2">
        <View className="flex-1">
          <InputLabel title="Minimum Salary" />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            defaultValue={salaryRange[0] ? salaryRange[0].toString() : null}
            onChangeText={(text) => dispatch(setMinRange(Number(text)))}
            onBlur={() => dispatch(sortSalaryRange())}
            placeholder="Enter min salary"
          />
        </View>
        <View className="flex-1">
          <InputLabel title="Maximum Salary" />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            defaultValue={salaryRange[1] ? salaryRange[1].toString() : ""}
            onChangeText={(text) => dispatch(setMaxRange(Number(text)))}
            onBlur={() => dispatch(sortSalaryRange())}
            placeholder="Enter max salary"
          />
        </View>
      </View>
      <View>
        <InputLabel title="Working Model" />
        <View className="flex items-center flex-row my-2  h-10 ">
          <FlashList
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={1}
            horizontal
            data={workingModels}
            extraData={selectedWorkingModel}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`px-4 py-2 rounded-full bg-gray-100 mr-4 ${
                  selectedWorkingModel?.Id === item.Id
                    ? "bg-primary"
                    : "bg-gray-100"
                }`}
                onPress={() => dispatch(setSelectedWorkingModel(item))}
              >
                <Text
                  className={`font-semibold text-[15px] ${
                    selectedWorkingModel?.Id === item.Id ? "text-white" : null
                  }`}
                >
                  {item.Title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View>
        <InputLabel title="Experience" />
        <View className="flex items-center flex-row my-2 h-10 ">
          <FlashList
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={1}
            horizontal
            data={experiences}
            extraData={selectedExperience}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`px-4 py-2 rounded-full bg-gray-100 mr-4 ${
                  selectedExperience?.Id === item.Id
                    ? "bg-primary"
                    : "bg-gray-100"
                }`}
                onPress={() => dispatch(setSelectedExperience(item))}
              >
                <Text
                  className={`font-semibold text-[15px] ${
                    selectedExperience?.Id === item.Id ? "text-white" : null
                  }`}
                >
                  {item.Title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View>
        <InputLabel title="Job Type" />
        <View className="flex items-center flex-row my-2 h-10 ">
          <FlashList
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={1}
            horizontal
            data={jobTypes}
            extraData={selectedJobType}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`px-4 py-2 rounded-full bg-gray-100 mr-4 ${
                  selectedJobType?.Id === item.Id ? "bg-primary" : "bg-gray-100"
                }`}
                onPress={() => dispatch(setSelectedJobType(item))}
              >
                <Text
                  className={`font-semibold text-[15px] ${
                    selectedJobType?.Id === item.Id ? "text-white" : null
                  }`}
                >
                  {item.Title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View>
        <InputLabel title="Job Title" />
        <List>
          {jobTitles?.map((item) => (
            <Checkbox.CheckboxItem
              checked={selectedJobTitles.some((i) => i.Id === item.Id)}
              key={item.Id}
              onChange={(e) => handleCheckJobTitle(e.target.checked, item)}
            >
              {item?.Title}
            </Checkbox.CheckboxItem>
          ))}
        </List>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  salaryInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputWrapper: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  rangeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5ac2dc",
    textAlign: "center",
  },
});
export default FilterBody;
