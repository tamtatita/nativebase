import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import JobItem from "../home/JobItem";

const OpenJobs = ({ data }) => {
  return (
    <View className="p-5 flex-1">
      <Text className="font-bold text-[16px] text-slate-700 my-3">
        Các Job hiện tại
      </Text>

      <View className="mt-5">
        <FlashList
          data={data}
          renderItem={({ item }) => <JobItem data={item} type="large" />}
          estimatedItemSize={5}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>

      {/* <View style={{ flex: 1 }}> */}
      {/* {data?.map((item) => (
        <JobItem data={item} key={item.id} type="large" />
      ))} */}
      {/* </View> */}
      {/* </View> */}
    </View>
  );
};

export default OpenJobs;

const styles = StyleSheet.create({});
