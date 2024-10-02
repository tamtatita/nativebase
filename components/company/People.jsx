import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";

const People = ({ data }) => {
  console.log(data, "data");
  return (
    <View className="p-5">
      <Text className="font-semibold text-lg ">People ({data?.length})</Text>

      <View className="">
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <View className="flex flex-row items-center gap-3 my-3">
              <Image
                source={{ uri: item.avatar }}
                width={40}
                height={40}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <View>
                <Text className="font-semibold text-[16px] text-slate-700">
                  {item.name}
                </Text>
                <Text className="text-gray-600">{item.position}</Text>
              </View>
            </View>
          )}
          estimatedItemSize={5}
          // keyExtractor={(item) => item?.name?.toString()}
          key={(item, index) => index}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({});
