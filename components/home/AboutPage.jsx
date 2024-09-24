import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AboutPage = ({ data }) => {
  return (
    <View className="bg-white p-5">
      <Text className="font-semibold text-[16px] my-2">About this Job</Text>

      <Text className="text-gray-500 tracking-wider">
        {data?.about?.aboutJob}
      </Text>

      <Text className="font-semibold text-[16px] my-2">Job Requirements</Text>

      <View className="list-disc ml-3">
        {data?.about?.job_desc?.map((list, index) => (
          <Text key={index} className="list-disc">
            {list}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({});
