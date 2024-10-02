import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { width } from "@/lib/InfoDevice";
const Gallery = ({ data }) => {
  console.log(data, "data");
  return (
    <View className="p-5 flex-1">
      <Text className="my-3 text-lg font-bold">Gallery ({data?.length})</Text>

      <View className="h-[500px]">
        <FlashList
          numColumns={2}
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: width / 2 - 30,
                display: "flex",
                marginHorizontal: 4,
              }}
              className="flex flex-row items-center my-2 gap-y-4 "
            >
              <Image
                source={{ uri: item }}
                width={40}
                height={40}
                className="w-full h-[200px] object-cover rounded-md"
              />
            </View>
          )}
          estimatedItemSize={5}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({});
