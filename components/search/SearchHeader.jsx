import { SafeAreaView, TextInput, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { IconButton } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleFilter, MODULE_SEARCH, setSearchText } from "../../store/search";
import { router } from "expo-router";
import { Badge } from "react-native-paper";
import { debounce } from "lodash";
import { useAuth } from "./../providers/AuthProvider";

function SearchHeader() {
  const {
    searchText,
    applySalaryRange,
    applyWorkingModel,
    applyExperience,
    applyJobTitles,
    applyJobType,
  } = useSelector((state) => state[MODULE_SEARCH]);
  const filterCount = useMemo(() => {
    let count = 0;
    if (applySalaryRange.length > 0) {
      count++;
    }
    if (applyWorkingModel?.Id) {
      count++;
    }
    if (applyExperience?.Id) {
      count++;
    }
    if (applyJobTitles.length > 0) {
      count++;
    }
    if (applyJobType?.Id) {
      count++;
    }
    return count;
  }, [
    applySalaryRange,
    applyWorkingModel,
    applyExperience,
    applyJobTitles,
    applyJobType,
  ]);
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const dispatch = useDispatch();

  const handleOnChangeSearchText = debounce((text) => {
    dispatch(setSearchText(text));
  }, 500);

  useEffect(() => {
    dispatch(handleFilter({ userId: currentUser?.id }));
  }, [searchText, dispatch, currentUser]);

  return (
    <View>
      <SafeAreaView />
      <View className="flex flex-row items-center  justify-between gap-2">
        <View>
          <IconButton type="back" size="small" />
        </View>

        <View className="bg-white h-[60px] flex items-start justify-center  rounded-xl flex-1">
          <View className="flex flex-1 items-center flex-row p-3">
            <View>
              <Ionicons name="search" size={24} color="gray" />
            </View>
            <View className="flex-1 relative">
              <TextInput
                //   onPress={() => router.push("/search")}
                defaultValue={searchText}
                onChangeText={handleOnChangeSearchText}
                placeholder="Search ...."
              />
            </View>
          </View>
        </View>
        {/* Filter BTN */}
        <View className="flex items-center justify-center relative">
          {filterCount > 0 && (
            <Badge className="absolute z-10 -top-2">{filterCount}</Badge>
          )}
          <IconButton
            onPress={() => router.push("filter")}
            shape={"roundedSquare"}
            size={"medium"}
            classNames={"rounded-xl"}
            color="#eab308"
            icon={<Ionicons name="options" size={24} color="white" />}
          />
        </View>
      </View>
    </View>
  );
}

export default SearchHeader;
