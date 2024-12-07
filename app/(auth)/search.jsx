import { Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { JobItem } from "@/components";
import SearchHeader from "../../components/search/SearchHeader";
import { useSelector } from "react-redux";
import { MODULE_SEARCH } from "../../store/search";
import { convertDataToJobItem } from "./../../components/home/RecentJobs";
const Search = () => {
  const { filterJobs } = useSelector((state) => state[MODULE_SEARCH]);

  return (
    <View className="p-5  flex-1 flex flex-col">
      <SearchHeader />

      <View className="mt-4  flex-1">
        <Text className="font-bold text-lg text-slate-700">Results</Text>

        <View className="mt-4 flex-1">
          <FlashList
            data={filterJobs}
            renderItem={({ item }) => {
              const jobItem = convertDataToJobItem(item);
              return <JobItem data={jobItem} type="large" />;
            }}
            estimatedItemSize={3}
            keyExtractor={(item) => item.Id.toString()}
            scrollEnabled={true}
            // showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;
