import { Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import "react-native-gesture-handler";
import { handleFilter, MODULE_SEARCH, resetFilter } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
function FilterFooter() {
  const dispatch = useDispatch();
  const {
    salaryRange,
    selectedExperience,
    selectedJobTitles,
    selectedJobType,
    selectedWorkingModel,
  } = useSelector((state) => state[MODULE_SEARCH]);

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const disableButton = useMemo(() => {
    return (
      !salaryRange.length &&
      !selectedExperience.Id &&
      !selectedJobTitles.length &&
      !selectedJobType.Id &&
      !selectedWorkingModel.Id
    );
  }, [
    salaryRange,
    selectedExperience,
    selectedJobTitles,
    selectedJobType,
    selectedWorkingModel,
  ]);

  return (
    <View className="flex items-center h-[75px] justify-center ">
      <View className="flex items-center gap-x-2 justify-between flex-row">
        <TouchableOpacity
          className="bg-gray-200  w-[48%] py-4 rounded-xl"
          onPress={() => dispatch(resetFilter())}
        >
          <Text className="text-primary text-[16px] text-center font-semibold">
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disableButton}
          className={`${
            disableButton ? "opacity-50" : ""
          } w-[48%] py-4 rounded-xl bg-primary`}
          onPress={() => {
            dispatch(handleFilter({ userId: currentUser?.id }));
            router.push("(auth)/search");
          }}
        >
          <Text className="text-white text-[16px] text-center font-semibold">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FilterFooter;
